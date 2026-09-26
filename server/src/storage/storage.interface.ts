import { Readable } from 'stream';

export interface StoredFile {
  fileUrl: string;
  filePath: string;
  fileSize: number;
  mimeType: string;
}

export interface IStorageService {
  saveFile(file: Express.Multer.File): Promise<StoredFile>;
  getFileStream(filePath: string): Readable;
  deleteFile(filePath: string): Promise<boolean>;
  getUrl(filename: string): string;
}
