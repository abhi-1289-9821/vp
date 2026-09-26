import { Request, Response, NextFunction } from 'express';
import { prisma } from '../db';
import { getAIService } from '../ai';
import { getStorageService } from '../storage';
import { BadRequestError, NotFoundError, UnauthorizedError } from '../utils/errors';
import { logger } from '../utils/logger';

export async function uploadAndAnalyzeDocument(req: Request, res: Response, next: NextFunction) {
  try {
    const file = req.file;
    if (!file) {
      throw new BadRequestError('No document file was uploaded', 'NO_FILE');
    }

    const userId = req.user?.userId;
    if (!userId) {
      throw new UnauthorizedError('User authentication required');
    }

    const storage = getStorageService();
    const stored = await storage.saveFile(file);

    const ai = getAIService();
    const extractedData = await ai.extractDocument(stored.filePath, stored.mimeType, file.originalname);

    // Try finding matching parcel in database using extracted surveyNumber or village
    let matchedParcel: any = null;
    let matchedCase: any = null;

    if (extractedData.surveyNumber) {
      matchedParcel = await prisma.parcel.findFirst({
        where: {
          surveyNumber: extractedData.surveyNumber,
          ...(extractedData.village ? { village: { contains: extractedData.village } } : {}),
        },
        include: {
          cases: {
            include: {
              project: true,
              citizen: { select: { id: true, name: true } },
            },
          },
        },
      });

      if (matchedParcel && matchedParcel.cases.length > 0) {
        matchedCase = matchedParcel.cases[0];
      }
    }

    // If case reference is extracted, look up case directly
    if (!matchedCase && extractedData.caseReference) {
      matchedCase = await prisma.acquisitionCase.findFirst({
        where: { caseReference: extractedData.caseReference },
        include: { parcel: true, project: true },
      });
      if (matchedCase && !matchedParcel) {
        matchedParcel = matchedCase.parcel;
      }
    }

    // Detect discrepancies if parcel record exists
    let discrepancyResult = {
      hasDiscrepancy: false,
      discrepancies: [] as any[],
      summary: 'Document fields match land records.',
      recommendedAction: 'No action needed.',
    };

    if (matchedParcel) {
      discrepancyResult = await ai.detectDiscrepancies(extractedData, {
        surveyNumber: matchedParcel.surveyNumber,
        village: matchedParcel.village,
        district: matchedParcel.district,
        recordedAreaHa: matchedParcel.recordedAreaHa,
        projectCode: matchedCase?.project?.code,
        projectName: matchedCase?.project?.name,
      });
    }

    // Save document to database
    const savedDoc = await prisma.document.create({
      data: {
        uploaderId: userId,
        caseId: matchedCase?.id || null,
        parcelId: matchedParcel?.id || null,
        title: req.body.title || file.originalname,
        documentType: extractedData.documentType || 'ACQUISITION_NOTICE',
        fileUrl: stored.fileUrl,
        fileSize: stored.fileSize,
        mimeType: stored.mimeType,
        verificationStatus: discrepancyResult.hasDiscrepancy ? 'DISCREPANCY_FOUND' : 'VERIFIED',
        extractedDataJson: JSON.stringify(extractedData),
        rawText: extractedData.rawText,
        plainLanguageExplanation: extractedData.plainLanguageExplanation,
        hasDiscrepancy: discrepancyResult.hasDiscrepancy,
        discrepancySummary: discrepancyResult.hasDiscrepancy ? discrepancyResult.summary : null,
      },
    });

    // Create Notification if discrepancy found
    if (discrepancyResult.hasDiscrepancy) {
      await prisma.notification.create({
        data: {
          userId,
          caseId: matchedCase?.id || null,
          title: 'Potential Discrepancy Detected',
          message: `Your notice for Survey #${matchedParcel?.surveyNumber || extractedData.surveyNumber} has an area discrepancy (${extractedData.areaHa} ha vs ${matchedParcel?.recordedAreaHa} ha). Click to report.`,
          type: 'ACTION_REQUIRED',
        },
      });
    }

    logger.info(`Analyzed document ${savedDoc.id}: discrepancy=${discrepancyResult.hasDiscrepancy}`);

    return res.status(201).json({
      success: true,
      message: 'Document uploaded and analyzed successfully',
      data: {
        document: savedDoc,
        extractedData,
        matchedParcel,
        matchedCase,
        discrepancyResult,
      },
    });
  } catch (err) {
    next(err);
  }
}

export async function getDocumentById(req: Request, res: Response, next: NextFunction) {
  try {
    const id = req.params.id as string;

    const doc = await prisma.document.findUnique({
      where: { id },
      include: {
        case: { include: { project: true } },
        parcel: true,
        uploader: { select: { id: true, name: true, role: true } },
      },
    });

    if (!doc) {
      throw new NotFoundError('Document not found');
    }

    return res.json({
      success: true,
      data: doc,
    });
  } catch (err) {
    next(err);
  }
}

export async function getUserDocuments(req: Request, res: Response, next: NextFunction) {
  try {
    const userId = req.user?.userId;
    if (!userId) throw new UnauthorizedError();

    const docs = await prisma.document.findMany({
      where: {
        OR: [
          { uploaderId: userId },
          { case: { citizenId: userId } },
        ],
      },
      include: {
        parcel: true,
        case: { include: { project: true } },
      },
      orderBy: { createdAt: 'desc' },
    });

    return res.json({
      success: true,
      data: docs,
    });
  } catch (err) {
    next(err);
  }
}
