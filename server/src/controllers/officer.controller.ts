import { Request, Response, NextFunction } from 'express';
import { prisma } from '../db';
import { NotFoundError } from '../utils/errors';
import { logger } from '../utils/logger';

export async function getOfficerDashboard(req: Request, res: Response, next: NextFunction) {
  try {
    const totalCases = await prisma.acquisitionCase.count();
    const activeCases = await prisma.acquisitionCase.count({ where: { status: 'ACTIVE' } });
    const pendingVerifications = await prisma.acquisitionCase.count({ where: { stage: 'VERIFICATION' } });
    const openGrievances = await prisma.grievance.count({
      where: { status: { in: ['SUBMITTED', 'UNDER_REVIEW'] } },
    });
    const detectedDiscrepancies = await prisma.document.count({
      where: { verificationStatus: 'DISCREPANCY_FOUND' },
    });

    const recentCases = await prisma.acquisitionCase.findMany({
      include: {
        parcel: true,
        project: true,
        citizen: { select: { id: true, name: true, phone: true } },
      },
      orderBy: { updatedAt: 'desc' },
      take: 6,
    });

    const pendingGrievanceList = await prisma.grievance.findMany({
      where: { status: { in: ['SUBMITTED', 'UNDER_REVIEW'] } },
      include: {
        parcel: true,
        case: { include: { project: true } },
        citizen: { select: { id: true, name: true, phone: true } },
      },
      orderBy: { createdAt: 'desc' },
      take: 6,
    });

    return res.json({
      success: true,
      data: {
        stats: {
          totalCases,
          activeCases,
          pendingVerifications,
          openGrievances,
          detectedDiscrepancies,
        },
        recentCases,
        pendingGrievances: pendingGrievanceList,
      },
    });
  } catch (err) {
    next(err);
  }
}

export async function getOfficerCases(req: Request, res: Response, next: NextFunction) {
  try {
    const stage = req.query.stage as string | undefined;
    const status = req.query.status as string | undefined;
    const search = ((req.query.search as string) || '').trim();

    const whereClause: any = {};
    if (stage) whereClause.stage = stage;
    if (status) whereClause.status = status;

    if (search) {
      whereClause.OR = [
        { caseReference: { contains: search } },
        { parcel: { surveyNumber: { contains: search } } },
        { parcel: { village: { contains: search } } },
        { citizen: { name: { contains: search } } },
        { project: { name: { contains: search } } },
      ];
    }

    const cases = await prisma.acquisitionCase.findMany({
      where: whereClause,
      include: {
        parcel: true,
        project: true,
        citizen: { select: { id: true, name: true, email: true, phone: true } },
        compensationRecord: true,
        grievances: true,
        documents: true,
      },
      orderBy: { updatedAt: 'desc' },
    });

    return res.json({
      success: true,
      count: cases.length,
      data: cases,
    });
  } catch (err) {
    next(err);
  }
}

export async function getOfficerGrievances(req: Request, res: Response, next: NextFunction) {
  try {
    const status = req.query.status as string | undefined;
    const whereClause: any = {};
    if (status) whereClause.status = status;

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
      count: grievances.length,
      data: grievances,
    });
  } catch (err) {
    next(err);
  }
}

export async function updateCaseStage(req: Request, res: Response, next: NextFunction) {
  try {
    const id = req.params.id as string;
    const { stage, status, remarks } = req.body;

    const existing = await prisma.acquisitionCase.findUnique({
      where: { id },
      include: { citizen: true, parcel: true },
    });

    if (!existing) {
      throw new NotFoundError('Case not found');
    }

    const updated = await prisma.acquisitionCase.update({
      where: { id },
      data: {
        stage: stage || existing.stage,
        status: status || existing.status,
        remarks: remarks !== undefined ? remarks : existing.remarks,
      },
      include: { parcel: true, project: true },
    });

    // Create timeline event
    if (stage && stage !== existing.stage) {
      await prisma.acquisitionEvent.create({
        data: {
          caseId: id,
          stage,
          title: `Stage Advanced to ${stage}`,
          description: remarks || `Competent Land Acquisition Officer updated stage to ${stage}`,
          eventDate: new Date(),
          status: 'COMPLETED',
        },
      });

      // Send notification to citizen
      await prisma.notification.create({
        data: {
          userId: existing.citizenId,
          caseId: id,
          title: `Acquisition Stage Updated: ${stage}`,
          message: `Your land case #${existing.caseReference} (Survey ${existing.parcel.surveyNumber}) has progressed to ${stage}.`,
          type: 'STATUS_UPDATE',
        },
      });
    }

    logger.info(`Officer updated case ${id} stage to ${stage}`);

    return res.json({
      success: true,
      message: 'Case updated successfully',
      data: updated,
    });
  } catch (err) {
    next(err);
  }
}

export async function updateGrievanceStatus(req: Request, res: Response, next: NextFunction) {
  try {
    const id = req.params.id as string;
    const { status, officerResponse } = req.body;
    const officerName = req.user?.name || 'Land Acquisition Officer';

    const existing = await prisma.grievance.findUnique({
      where: { id },
      include: { citizen: true, parcel: true, case: true },
    });

    if (!existing) {
      throw new NotFoundError('Grievance not found');
    }

    const updated = await prisma.grievance.update({
      where: { id },
      data: {
        status: status || existing.status,
        officerResponse: officerResponse || existing.officerResponse,
        reviewedBy: officerName,
        resolvedAt: status === 'RESOLVED' ? new Date() : existing.resolvedAt,
      },
      include: { parcel: true, case: true },
    });

    // Send notification to citizen
    const message =
      status === 'RESOLVED'
        ? `Your grievance #${existing.referenceNumber} has been RESOLVED by ${officerName}. Officer response: "${
            officerResponse || 'Issue examined and corrected in record.'
          }"`
        : `Your grievance #${existing.referenceNumber} status has been updated to ${status}.`;

    await prisma.notification.create({
      data: {
        userId: existing.citizenId,
        caseId: existing.caseId,
        title: `Grievance ${existing.referenceNumber} Updated`,
        message,
        type: 'GRIEVANCE_UPDATE',
      },
    });

    logger.info(`Officer updated grievance ${id} to ${status}`);

    return res.json({
      success: true,
      message: 'Grievance updated and citizen notified',
      data: updated,
    });
  } catch (err) {
    next(err);
  }
}
