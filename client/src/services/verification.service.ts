import { api } from './api.js';
import { PanValidationResult, FaceVerificationResult } from '../types/index.js';

export interface LocalPanValidation {
  valid: boolean;
  formatted: string;
  entityType?: string;
  error?: string;
}

export const verificationService = {
  /**
   * Client-side fast format validation & entity extraction for PAN numbers.
   */
  validatePanFormat(panNumber: string): LocalPanValidation {
    const clean = (panNumber || '').trim().toUpperCase();
    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;

    if (!clean) {
      return { valid: false, formatted: '', error: 'PAN number is required' };
    }

    if (!panRegex.test(clean)) {
      return {
        valid: false,
        formatted: clean,
        error: 'Invalid PAN format. Must be 10 characters (e.g. ABCDE1234F)',
      };
    }

    const entityCode = clean[3];
    const entityTypes: Record<string, string> = {
      P: 'Individual / Citizen',
      C: 'Company',
      H: 'Hindu Undivided Family (HUF)',
      A: 'Association of Persons (AOP)',
      B: 'Body of Individuals (BOI)',
      G: 'Government Agency',
      J: 'Artificial Juridical Person',
      L: 'Local Authority',
      F: 'Firm / LLP',
      T: 'Trust',
    };

    return {
      valid: true,
      formatted: clean,
      entityType: entityTypes[entityCode] || 'Individual',
    };
  },

  /**
   * Remote PAN verification API call.
   */
  async verifyPanRemote(panNumber: string): Promise<PanValidationResult> {
    const res = await api.verifyPan(panNumber.toUpperCase());
    if (res.success && res.data) {
      return res.data;
    }
    throw new Error(res.message || 'PAN verification failed');
  },

  /**
   * Uploads PAN document and Selfie image and triggers biometric face matching.
   */
  async verifyBiometricFace(
    panFile: File,
    selfieFile: File | Blob,
    panNumber?: string
  ): Promise<FaceVerificationResult> {
    const formData = new FormData();
    formData.append('panDocument', panFile);

    // If selfie is a Blob from live camera capture, wrap in File
    if (selfieFile instanceof File) {
      formData.append('selfie', selfieFile);
    } else {
      const selfieAsFile = new File([selfieFile], 'selfie_capture.jpg', { type: 'image/jpeg' });
      formData.append('selfie', selfieAsFile);
    }

    if (panNumber) {
      formData.append('panNumber', panNumber);
    }

    const res = await api.verifyFace(formData);
    if (res.success && res.data) {
      return res.data;
    }
    throw new Error(res.message || 'Biometric face verification failed');
  },

  /**
   * Helper to format masked PAN for security (e.g., ABCPS****K).
   */
  maskPan(pan: string): string {
    if (!pan || pan.length < 10) return pan || '';
    return `${pan.slice(0, 5)}****${pan.slice(9)}`;
  },
};
