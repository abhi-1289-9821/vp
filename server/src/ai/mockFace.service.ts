import fs from 'fs';
import {
  IFaceVerificationService,
  PanValidationResult,
  FaceVerificationResult,
} from './face.interface';
import { logger } from '../utils/logger';

export class MockFaceVerificationService implements IFaceVerificationService {
  /**
   * Validates PAN format (ABCDE1234F) and analyzes entity type from 4th character.
   */
  async validatePan(panNumber: string): Promise<PanValidationResult> {
    const cleanPan = (panNumber || '').trim().toUpperCase();
    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;

    if (!panRegex.test(cleanPan)) {
      return {
        valid: false,
        panNumber: cleanPan,
        message: 'Invalid PAN card format. Expected 5 letters, 4 digits, 1 letter (e.g. ABCDE1234F).',
      };
    }

    const entityCode = cleanPan[3];
    const entityMap: Record<string, string> = {
      P: 'Individual (Person)',
      C: 'Company',
      H: 'Hindu Undivided Family (HUF)',
      A: 'Association of Persons (AOP)',
      B: 'Body of Individuals (BOI)',
      G: 'Government Agency',
      J: 'Artificial Juridical Person',
      L: 'Local Authority',
      F: 'Firm / Limited Liability Partnership',
      T: 'Trust',
    };

    const entityType = entityMap[entityCode] || 'Individual';

    return {
      valid: true,
      panNumber: cleanPan,
      entityType,
      message: `PAN format is valid (${entityType}).`,
    };
  }

  /**
   * Biometric Face Matching between PAN card face crop and selfie image.
   * Simulates facial landmark extraction, liveness detection, and confidence scoring.
   */
  async verifyFaceMatch(
    panImagePath: string,
    selfieImagePath: string,
    options?: { panNumber?: string }
  ): Promise<FaceVerificationResult> {
    logger.info(`[FaceMatch] Processing verification: PAN=${panImagePath}, Selfie=${selfieImagePath}`);

    // Check if files exist on disk if physical paths were provided
    let panExists = true;
    let selfieExists = true;

    if (panImagePath && !panImagePath.startsWith('http') && !panImagePath.startsWith('/storage')) {
      panExists = fs.existsSync(panImagePath);
    }
    if (selfieImagePath && !selfieImagePath.startsWith('http') && !selfieImagePath.startsWith('/storage')) {
      selfieExists = fs.existsSync(selfieImagePath);
    }

    if (!panImagePath || !selfieImagePath) {
      return {
        matchScore: 0,
        status: 'FAILED',
        isMatch: false,
        panFaceDetected: false,
        selfieFaceDetected: false,
        livenessScore: 0,
        confidence: 0,
        message: 'Both PAN Card document and Selfie photo are required for face matching.',
        details: {
          reviewReason: 'Missing document or selfie image.',
        },
      };
    }

    // Heuristic biometric simulation (Score between 91.5% and 97.8% for realistic live photos)
    // Deterministic yet realistic variance based on filename length or timestamp
    const pseudoEntropy = (panImagePath.length + selfieImagePath.length) % 10;
    const baseScore = 93.0 + (pseudoEntropy * 0.45);
    const matchScore = parseFloat(Math.min(98.5, Math.max(88.0, baseScore)).toFixed(1));
    const livenessScore = parseFloat((95.0 + (pseudoEntropy * 0.3)).toFixed(1));
    const landmarkAlignment = parseFloat((94.0 + (pseudoEntropy * 0.4)).toFixed(1));

    let status: 'VERIFIED' | 'MANUAL_REVIEW' | 'FAILED' = 'VERIFIED';
    let message = `Biometric face match verified successfully with ${matchScore}% confidence.`;

    if (matchScore >= 80) {
      status = 'VERIFIED';
    } else if (matchScore >= 60) {
      status = 'MANUAL_REVIEW';
      message = 'Biometric match is moderate. Sent for manual officer review.';
    } else {
      status = 'FAILED';
      message = 'Face match confidence is below security threshold.';
    }

    return {
      matchScore,
      status,
      isMatch: status === 'VERIFIED',
      panFaceDetected: true,
      selfieFaceDetected: true,
      livenessScore,
      confidence: matchScore,
      message,
      details: {
        faceQualityScore: 96.2,
        landmarkAlignmentScore: landmarkAlignment,
        lightingScore: 92.0,
        matchThreshold: 80.0,
      },
    };
  }
}
