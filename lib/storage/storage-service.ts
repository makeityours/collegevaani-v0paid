import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { S3Client, PutObjectCommand, DeleteObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { logger } from '@/lib/monitoring/logger';
import { config } from '@/lib/config/environment';

/**
 * Storage provider types
 */
export enum StorageProvider {
  LOCAL = 'local',
  S3 = 's3',
}

/**
 * Upload file options
 */
export interface UploadFileOptions {
  fileName?: string;
  contentType?: string;
  folder?: string;
  maxSizeBytes?: number;
  publicAccess?: boolean;
}

/**
 * File upload result
 */
export interface FileUploadResult {
  fileName: string;
  filePath: string;
  mimeType: string;
  sizeBytes: number;
  url: string;
  provider: StorageProvider;
}

/**
 * Storage service for handling file uploads
 */
export class StorageService {
  private static instance: StorageService;
  private storageProvider: StorageProvider;
  private s3Client: S3Client | null = null;
  private s3Bucket: string = '';
  private localUploadsDir: string = path.join(process.cwd(), 'uploads');

  private constructor() {
    this.storageProvider = (process.env.STORAGE_TYPE as StorageProvider) || StorageProvider.LOCAL;
    
    // Initialize storage provider
    if (this.storageProvider === StorageProvider.S3) {
      this.initializeS3Client();
    } else {
      this.initializeLocalStorage();
    }
  }

  /**
   * Get singleton instance
   */
  public static getInstance(): StorageService {
    if (!StorageService.instance) {
      StorageService.instance = new StorageService();
    }
    return StorageService.instance;
  }

  /**
   * Initialize S3 client
   */
  private initializeS3Client(): void {
    const { AWS_REGION, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, S3_BUCKET } = process.env;
    
    if (!AWS_REGION || !AWS_ACCESS_KEY_ID || !AWS_SECRET_ACCESS_KEY || !S3_BUCKET) {
      logger.warn('S3 credentials not configured, falling back to local storage');
      this.storageProvider = StorageProvider.LOCAL;
      this.initializeLocalStorage();
      return;
    }
    
    try {
      this.s3Client = new S3Client({
        region: AWS_REGION,
        credentials: {
          accessKeyId: AWS_ACCESS_KEY_ID,
          secretAccessKey: AWS_SECRET_ACCESS_KEY,
        },
      });
      
      this.s3Bucket = S3_BUCKET;
      logger.info('S3 storage initialized successfully');
    } catch (error) {
      logger.error('Failed to initialize S3 client', error as Error);
      this.storageProvider = StorageProvider.LOCAL;
      this.initializeLocalStorage();
    }
  }

  /**
   * Initialize local storage
   */
  private initializeLocalStorage(): void {
    try {
      // Create uploads directory if it doesn't exist
      if (!fs.existsSync(this.localUploadsDir)) {
        fs.mkdirSync(this.localUploadsDir, { recursive: true });
      }
      
      logger.info('Local storage initialized successfully');
    } catch (error) {
      logger.error('Failed to initialize local storage', error as Error);
    }
  }

  /**
   * Generate safe filename
   */
  private generateSafeFilename(originalName: string): string {
    const uuid = uuidv4();
    const ext = path.extname(originalName);
    const safeName = originalName
      .replace(ext, '') // Remove extension
      .replace(/[^a-zA-Z0-9]/g, '-') // Replace special chars with hyphens
      .toLowerCase();
    
    return `${safeName}-${uuid}${ext}`;
  }

  /**
   * Upload file to storage
   */
  public async uploadFile(
    fileBuffer: Buffer,
    originalFilename: string,
    options: UploadFileOptions = {}
  ): Promise<FileUploadResult> {
    const {
      fileName = this.generateSafeFilename(originalFilename),
      contentType = this.getContentType(originalFilename),
      folder = '',
      maxSizeBytes = 10 * 1024 * 1024, // 10MB default limit
      publicAccess = false,
    } = options;

    // Check file size
    if (fileBuffer.length > maxSizeBytes) {
      throw new Error(`File size exceeds the maximum allowed size of ${maxSizeBytes / (1024 * 1024)}MB`);
    }

    // Add folder prefix if provided
    const fullFilePath = folder ? `${folder}/${fileName}` : fileName;
    
    try {
      // Upload based on provider
      if (this.storageProvider === StorageProvider.S3) {
        return this.uploadToS3(fileBuffer, fullFilePath, contentType, publicAccess);
      } else {
        return this.uploadToLocalStorage(fileBuffer, fullFilePath, contentType);
      }
    } catch (error) {
      logger.error(`Failed to upload file: ${fullFilePath}`, error as Error);
      throw new Error('File upload failed');
    }
  }

  /**
   * Upload file to S3
   */
  private async uploadToS3(
    fileBuffer: Buffer,
    filePath: string,
    contentType: string,
    publicAccess: boolean
  ): Promise<FileUploadResult> {
    if (!this.s3Client) {
      throw new Error('S3 client is not initialized');
    }

    const params = {
      Bucket: this.s3Bucket,
      Key: filePath,
      Body: fileBuffer,
      ContentType: contentType,
      ACL: publicAccess ? 'public-read' : 'private',
    };

    try {
      await this.s3Client.send(new PutObjectCommand(params));
      
      let url = '';
      if (publicAccess) {
        // Public URL format
        url = `https://${this.s3Bucket}.s3.amazonaws.com/${filePath}`;
      } else {
        // Generate a pre-signed URL that expires in 1 hour
        const command = new GetObjectCommand({
          Bucket: this.s3Bucket,
          Key: filePath,
        });
        
        url = await getSignedUrl(this.s3Client, command, { expiresIn: 3600 });
      }

      return {
        fileName: path.basename(filePath),
        filePath,
        mimeType: contentType,
        sizeBytes: fileBuffer.length,
        url,
        provider: StorageProvider.S3,
      };
    } catch (error) {
      logger.error('S3 upload failed', error as Error);
      throw new Error('Failed to upload file to S3');
    }
  }

  /**
   * Upload file to local storage
   */
  private async uploadToLocalStorage(
    fileBuffer: Buffer,
    filePath: string,
    contentType: string
  ): Promise<FileUploadResult> {
    // Create directory if it doesn't exist
    const dirPath = path.dirname(path.join(this.localUploadsDir, filePath));
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }

    const fullPath = path.join(this.localUploadsDir, filePath);
    
    try {
      await fs.promises.writeFile(fullPath, fileBuffer);
      
      // URL for local storage is a relative path
      const baseUrl = config.app.url || '';
      const url = `${baseUrl}/uploads/${filePath}`;

      return {
        fileName: path.basename(filePath),
        filePath,
        mimeType: contentType,
        sizeBytes: fileBuffer.length,
        url,
        provider: StorageProvider.LOCAL,
      };
    } catch (error) {
      logger.error('Local file write failed', error as Error);
      throw new Error('Failed to write file to local storage');
    }
  }

  /**
   * Delete file from storage
   */
  public async deleteFile(filePath: string): Promise<boolean> {
    try {
      // Delete based on provider
      if (this.storageProvider === StorageProvider.S3) {
        return this.deleteFromS3(filePath);
      } else {
        return this.deleteFromLocalStorage(filePath);
      }
    } catch (error) {
      logger.error(`Failed to delete file: ${filePath}`, error as Error);
      return false;
    }
  }

  /**
   * Delete file from S3
   */
  private async deleteFromS3(filePath: string): Promise<boolean> {
    if (!this.s3Client) {
      throw new Error('S3 client is not initialized');
    }

    try {
      await this.s3Client.send(
        new DeleteObjectCommand({
          Bucket: this.s3Bucket,
          Key: filePath,
        })
      );
      
      return true;
    } catch (error) {
      logger.error('S3 delete failed', error as Error);
      return false;
    }
  }

  /**
   * Delete file from local storage
   */
  private async deleteFromLocalStorage(filePath: string): Promise<boolean> {
    const fullPath = path.join(this.localUploadsDir, filePath);
    
    try {
      // Check if file exists
      if (fs.existsSync(fullPath)) {
        await fs.promises.unlink(fullPath);
      }
      
      return true;
    } catch (error) {
      logger.error('Local file delete failed', error as Error);
      return false;
    }
  }

  /**
   * Get file content type based on extension
   */
  private getContentType(filename: string): string {
    const ext = path.extname(filename).toLowerCase();
    
    // Map common extensions to MIME types
    const mimeTypes: Record<string, string> = {
      '.jpg': 'image/jpeg',
      '.jpeg': 'image/jpeg',
      '.png': 'image/png',
      '.gif': 'image/gif',
      '.webp': 'image/webp',
      '.svg': 'image/svg+xml',
      '.pdf': 'application/pdf',
      '.doc': 'application/msword',
      '.docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      '.xls': 'application/vnd.ms-excel',
      '.xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      '.csv': 'text/csv',
      '.txt': 'text/plain',
      '.zip': 'application/zip',
      '.mp4': 'video/mp4',
      '.mp3': 'audio/mpeg',
    };
    
    return mimeTypes[ext] || 'application/octet-stream';
  }

  /**
   * Get file from storage
   */
  public async getFileUrl(filePath: string, expirationSeconds = 3600): Promise<string> {
    try {
      // Get URL based on provider
      if (this.storageProvider === StorageProvider.S3) {
        return this.getS3FileUrl(filePath, expirationSeconds);
      } else {
        return this.getLocalFileUrl(filePath);
      }
    } catch (error) {
      logger.error(`Failed to get file URL: ${filePath}`, error as Error);
      throw new Error('Failed to get file URL');
    }
  }

  /**
   * Get S3 file URL
   */
  private async getS3FileUrl(filePath: string, expirationSeconds: number): Promise<string> {
    if (!this.s3Client) {
      throw new Error('S3 client is not initialized');
    }

    try {
      // Generate a pre-signed URL
      const command = new GetObjectCommand({
        Bucket: this.s3Bucket,
        Key: filePath,
      });
      
      return getSignedUrl(this.s3Client, command, { expiresIn: expirationSeconds });
    } catch (error) {
      logger.error('Failed to generate S3 URL', error as Error);
      throw new Error('Failed to generate file URL');
    }
  }

  /**
   * Get local file URL
   */
  private getLocalFileUrl(filePath: string): string {
    const baseUrl = config.app.url || '';
    return `${baseUrl}/uploads/${filePath}`;
  }
}

// Export singleton instance
export const storageService = StorageService.getInstance(); 