declare module 'redis' {
  export interface RedisClientOptions {
    url?: string;
    socket?: {
      host?: string;
      port?: number;
      tls?: boolean;
    };
    password?: string;
    username?: string;
    database?: number;
    [key: string]: any;
  }

  export interface RedisClientType {
    connect(): Promise<void>;
    disconnect(): Promise<void>;
    quit(): Promise<void>;
    on(event: string, listener: (...args: any[]) => void): void;
    incr(key: string): Promise<number>;
    expire(key: string, seconds: number): Promise<number>;
    ttl(key: string): Promise<number>;
    get(key: string): Promise<string | null>;
    set(key: string, value: string, options?: any): Promise<string | null>;
    del(key: string): Promise<number>;
    exists(key: string): Promise<number>;
    [key: string]: any;
  }

  export function createClient(options?: RedisClientOptions): RedisClientType;
} 