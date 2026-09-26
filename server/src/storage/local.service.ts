import path from 'path';
import fs from 'fs';
import { IStorageService, StoredFile } from './storage.interface';
import { logger } from '../utils/logger';
import { Readable } from 'stream';

export class LocalStorageService implements IStorageService {
  private baseDir: string;
  private uploadDir: string;

  constructor() {
    this.baseDir = process.env.STORAGE_PATH || path.resolve(process.cwd(), '../storage');
    this.uploadDir = path.resolve(this.baseDir, 'documents');
    if (!fs.existsSync(this.uploadDir)) {
      fs.mkdirSync(this.uploadDir, { recursive: true });
    }
  }

  async saveFile(file: Express.Multer.File): Promise<StoredFile> {
    const filename = path.basename(file.path);
    const fileUrl = `/storage/documents/${filename}`;
    logger.info(`Saved local file: ${file.path} -> ${fileUrl}`);

    return {
      fileUrl,
      filePath: file.path,
      fileSize: file.size,
      mimeType: file.mimetype,
    };
  }

  getFileStream(filePath: string): Readable {
    return fs.createReadStream(filePath);
  }

  async deleteFile(filePath: string): Promise<boolean> {
    try {
      if (fs.existsSync(filePath)) {
        await fs.promises.unlink(filePath);
        return true;
      }
      return false;
    } catch (err) {
      logger.error(`Failed to delete file: ${filePath}`, err);
      return false;
    }
  }

  getUrl(filename: string): string {
    return `/storage/documents/${path.basename(filename)}`;
  }
}
