import { Request, Response, NextFunction } from 'express';
import { prisma } from '../db';
import { BadRequestError, NotFoundError, UnauthorizedError } from '../utils/errors';
import { logger } from '../utils/logger';

export async function createGrievance(req: Request, res: Response, next: NextFunction) {
  try {
    const userId = req.user?.userId;
    if (!userId) throw new UnauthorizedError();

    const {
      caseId,
      parcelId,
      category = 'WRONG_AREA',
      title,
      description,
      detectedDiscrepancy,
      attachmentUrl,
    } = req.body;

    if (!title || !description) {
      throw new BadRequestError('Title and description are required', 'MISSING_FIELDS');
    }

    // Generate reference code: GR-2026-XXXX
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const referenceNumber = `GR-2026-${randomSuffix}`;

    const grievance = await prisma.grievance.create({
      data: {
        referenceNumber,
        citizenId: userId,
        caseId: caseId || null,
        parcelId: parcelId || null,
        category,
        title,
        description,
        detectedDiscrepancy: detectedDiscrepancy
          ? typeof detectedDiscrepancy === 'string'
            ? detectedDiscrepancy
            : JSON.stringify(detectedDiscrepancy)
          : null,
        attachmentUrl: attachmentUrl || null,
        status: 'SUBMITTED',
      },
      include: {
        parcel: true,
        case: { include: { project: true } },
      },
    });

    // Create notification for citizen
    await prisma.notification.create({
      data: {
        userId,
        caseId: caseId || null,
        title: 'Grievance Submitted',
        message: `Your grievance ${referenceNumber} has been logged and assigned to the Land Acquisition Officer.`,
        type: 'GRIEVANCE_UPDATE',
      },
    });

    // Find officer users and create notification for them
    const officers = await prisma.user.findMany({ where: { role: 'OFFICER' } });
    for (const officer of officers) {
      await prisma.notification.create({
        data: {
          userId: officer.id,
          caseId: caseId || null,
          title: 'New Citizen Grievance Received',
          message: `Grievance ${referenceNumber} filed by citizen for ${category.replace(/_/g, ' ')}. Action required.`,
          type: 'GRIEVANCE_UPDATE',
        },
      });
    }

    logger.info(`Created grievance ${referenceNumber} for user ${userId}`);

    return res.status(201).json({
      success: true,
      message: 'Grievance reported successfully',
      data: grievance,
    });
  } catch (err) {
    next(err);
  }
}

export async function getGrievances(req: Request, res: Response, next: NextFunction) {
  try {
    const userId = req.user?.userId;
    const role = req.user?.role;
    if (!userId) throw new UnauthorizedError();

    const whereClause: any = {};
    if (role === 'CITIZEN') {
      whereClause.citizenId = userId;
    }

    const grievances = await prisma.grievance.findMany({
      where: whereClause,
      include: {
        parcel: true,
        case: { include: { project: true } },
        citizen: { select: { id: true, name: true, email: true, phone: true } },
      },
      orderBy: { createdAt: 'desc' },
    });

    return res.json({
      success: true,
      data: grievances,
    });
  } catch (err) {
    next(err);
  }
}

export async function getGrievanceById(req: Request, res: Response, next: NextFunction) {
  try {
    const id = req.params.id as string;

    const grievance = await prisma.grievance.findFirst({
      where: {
        OR: [{ id }, { referenceNumber: id }],
      },
      include: {
        parcel: true,
        case: { include: { project: true } },
        citizen: { select: { id: true, name: true, email: true, phone: true } },
      },
    });

    if (!grievance) {
      throw new NotFoundError('Grievance not found');
    }

    return res.json({
      success: true,
      data: grievance,
    });
  } catch (err) {
    next(err);
  }
}
