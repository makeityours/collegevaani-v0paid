import { logger } from "@/lib/monitoring/logger"
import { config } from "@/lib/config/environment"

/**
 * Cache provider types
 */
export enum CacheProvider {
  MEMORY = "memory",
  REDIS = "redis",
}

/**
 * Cache options
 */
export interface CacheOptions {
  ttl?: number; // Time to live in seconds
  namespace?: string; // Cache namespace for grouping keys
}

/**
 * Cache service for data caching
 */
export class CacheService {
  private static instance: CacheService;
  private cacheProvider: CacheProvider;
  private redisClient: any = null;
  private memoryCache: Map<string, { value: any; expiry: number }> = new Map();
  
  private defaultOptions: CacheOptions = {
    ttl: 3600, // 1 hour
    namespace: "collegevaani",
  };

  private constructor() {
    this.cacheProvider = process.env.REDIS_URL ? CacheProvider.REDIS : CacheProvider.MEMORY;
    
    // Initialize cache provider
    if (this.cacheProvider === CacheProvider.REDIS) {
      this.initializeRedisClient();
    } else {
      logger.info("Using in-memory cache");
      
      // Set up periodic cleanup for memory cache
      setInterval(() => this.cleanupExpiredCache(), 60000); // Clean every minute
    }
  }

  /**
   * Get singleton instance
   */
  public static getInstance(): CacheService {
    if (!CacheService.instance) {
      CacheService.instance = new CacheService();
    }
    return CacheService.instance;
  }

  /**
   * Initialize Redis client
   */
  private async initializeRedisClient(): Promise<void> {
    if (!process.env.REDIS_URL) {
      logger.warn("Redis URL not configured, falling back to memory cache");
      this.cacheProvider = CacheProvider.MEMORY;
      return;
    }
    
    try {
      // Dynamic import to avoid including Redis in development bundle
      const redis = await import("redis").catch(() => null);
      
      if (!redis) {
        logger.warn("Redis module not available, falling back to memory cache");
        this.cacheProvider = CacheProvider.MEMORY;
        return;
      }
      
      this.redisClient = redis.createClient({
        url: process.env.REDIS_URL,
      });
      
      // Set up event handlers
      this.redisClient.on("error", (err: Error) => {
        logger.error("Redis client error", err);
        
        if (!this.memoryCache.size) {
          logger.info("Falling back to memory cache due to Redis error");
          this.cacheProvider = CacheProvider.MEMORY;
        }
      });
      
      this.redisClient.on("connect", () => {
        logger.info("Redis client connected");
      });
      
      await this.redisClient.connect();
    } catch (error) {
      logger.error("Failed to initialize Redis client", error as Error);
      this.cacheProvider = CacheProvider.MEMORY;
    }
  }

  /**
   * Format cache key with namespace
   */
  private formatKey(key: string, namespace?: string): string {
    const ns = namespace || this.defaultOptions.namespace;
    return ns ? `${ns}:${key}` : key;
  }

  /**
   * Set cache value
   */
  public async set<T>(key: string, value: T, options?: CacheOptions): Promise<boolean> {
    const { ttl = this.defaultOptions.ttl, namespace } = options || {};
    const formattedKey = this.formatKey(key, namespace);
    
    try {
      if (this.cacheProvider === CacheProvider.REDIS && this.redisClient?.isReady) {
        // Use Redis cache
        await this.redisClient.set(formattedKey, JSON.stringify(value), {
          EX: ttl,
        });
      } else {
        // Use memory cache
        const expiry = ttl ? Date.now() + ttl * 1000 : 0;
        this.memoryCache.set(formattedKey, { value, expiry });
      }
      
      return true;
    } catch (error) {
      logger.error(`Failed to set cache: ${formattedKey}`, error as Error);
      return false;
    }
  }

  /**
   * Get cache value
   */
  public async get<T>(key: string, options?: CacheOptions): Promise<T | null> {
    const { namespace } = options || {};
    const formattedKey = this.formatKey(key, namespace);
    
    try {
      if (this.cacheProvider === CacheProvider.REDIS && this.redisClient?.isReady) {
        // Use Redis cache
        const data = await this.redisClient.get(formattedKey);
        
        if (!data) {
          return null;
        }
        
        return JSON.parse(data) as T;
      } else {
        // Use memory cache
        const cached = this.memoryCache.get(formattedKey);
        
        if (!cached) {
          return null;
        }
        
        // Check if expired
        if (cached.expiry && cached.expiry < Date.now()) {
          this.memoryCache.delete(formattedKey);
          return null;
        }
        
        return cached.value as T;
      }
    } catch (error) {
      logger.error(`Failed to get cache: ${formattedKey}`, error as Error);
      return null;
    }
  }

  /**
   * Delete cache value
   */
  public async delete(key: string, options?: CacheOptions): Promise<boolean> {
    const { namespace } = options || {};
    const formattedKey = this.formatKey(key, namespace);
    
    try {
      if (this.cacheProvider === CacheProvider.REDIS && this.redisClient?.isReady) {
        // Use Redis cache
        await this.redisClient.del(formattedKey);
      } else {
        // Use memory cache
        this.memoryCache.delete(formattedKey);
      }
      
      return true;
    } catch (error) {
      logger.error(`Failed to delete cache: ${formattedKey}`, error as Error);
      return false;
    }
  }

  /**
   * Clear all cache in a namespace
   */
  public async clearNamespace(namespace: string): Promise<boolean> {
    try {
      if (this.cacheProvider === CacheProvider.REDIS && this.redisClient?.isReady) {
        // Use Redis cache
        const pattern = `${namespace}:*`;
        const keys = await this.redisClient.keys(pattern);
        
        if (keys.length > 0) {
          await this.redisClient.del(keys);
        }
      } else {
        // Use memory cache
        const prefix = `${namespace}:`;
        
        for (const key of this.memoryCache.keys()) {
          if (key.startsWith(prefix)) {
            this.memoryCache.delete(key);
          }
        }
      }
      
      return true;
    } catch (error) {
      logger.error(`Failed to clear namespace: ${namespace}`, error as Error);
      return false;
    }
  }

  /**
   * Clean up expired cache entries (memory cache only)
   */
  private cleanupExpiredCache(): void {
    if (this.cacheProvider !== CacheProvider.MEMORY) {
      return;
    }
    
    const now = Date.now();
    let expired = 0;
    
    for (const [key, value] of this.memoryCache.entries()) {
      if (value.expiry && value.expiry < now) {
        this.memoryCache.delete(key);
        expired++;
      }
    }
    
    if (expired > 0) {
      logger.debug(`Cleaned up ${expired} expired cache entries`);
    }
  }

  /**
   * Get or set cache value
   * If the key doesn't exist in cache, the factory function will be called to generate the value
   */
  public async getOrSet<T>(
    key: string,
    factory: () => Promise<T>,
    options?: CacheOptions
  ): Promise<T> {
    const cached = await this.get<T>(key, options);
    
    if (cached !== null) {
      return cached;
    }
    
    // Generate value using factory function
    const value = await factory();
    
    // Cache the value
    await this.set(key, value, options);
    
    return value;
  }

  /**
   * Clear all cache
   */
  public async clearAll(): Promise<boolean> {
    try {
      if (this.cacheProvider === CacheProvider.REDIS && this.redisClient?.isReady) {
        // Use Redis cache
        await this.redisClient.flushDb();
      } else {
        // Use memory cache
        this.memoryCache.clear();
      }
      
      return true;
    } catch (error) {
      logger.error("Failed to clear all cache", error as Error);
      return false;
    }
  }
}

// Export singleton instance
export const cacheService = CacheService.getInstance(); 