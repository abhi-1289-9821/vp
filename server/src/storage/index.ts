import { IStorageService } from './storage.interface';
import { LocalStorageService } from './local.service';

let storageInstance: IStorageService | null = null;

export function getStorageService(): IStorageService {
  if (!storageInstance) {
    storageInstance = new LocalStorageService();
  }
  return storageInstance;
}

export * from './storage.interface';
