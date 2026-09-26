import { Request, Response, NextFunction } from 'express';
import { prisma } from '../db';
import { UnauthorizedError } from '../utils/errors';

export async function getCitizenDashboard(req: Request, res: Response, next: NextFunction) {
  try {
    const userId = req.user?.userId;
    if (!userId) throw new UnauthorizedError();

    // Fetch user with profile
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { profile: true },
    });

    // Fetch active cases
    const cases = await prisma.acquisitionCase.findMany({
      where: { citizenId: userId },
      include: {
        parcel: true,
        project: true,
        compensationRecord: true,
        rrRecord: true,
        events: {
          orderBy: { eventDate: 'desc' },
          take: 3,
        },
        actionItems: {
          where: { status: { in: ['ACTION_REQUIRED', 'IN_PROGRESS'] } },
          orderBy: { deadline: 'asc' },
        },
      },
      orderBy: { updatedAt: 'desc' },
    });

    // Primary case (e.g. first active case or primary demo case)
    const primaryCase = cases[0] || null;

    // Unread notifications count
    const unreadNotificationsCount = await prisma.notification.count({
      where: { userId, isRead: false },
    });

    // Urgent action items
    const pendingActions = await prisma.actionItem.findMany({
      where: {
        citizenId: userId,
        status: { in: ['ACTION_REQUIRED', 'IN_PROGRESS'] },
      },
      include: { case: { include: { parcel: true } } },
      orderBy: { deadline: 'asc' },
      take: 5,
    });

    // Recent documents
    const recentDocuments = await prisma.document.findMany({
      where: {
        OR: [
          { uploaderId: userId },
          { case: { citizenId: userId } },
        ],
      },
      orderBy: { createdAt: 'desc' },
      take: 5,
    });

    // Active grievances
    const activeGrievances = await prisma.grievance.findMany({
      where: { citizenId: userId },
      include: { parcel: true, case: true },
      orderBy: { createdAt: 'desc' },
      take: 3,
    });

    return res.json({
      success: true,
      data: {
        citizen: {
          name: user?.name,
          email: user?.email,
          village: user?.profile?.village,
          district: user?.profile?.district,
        },
        primaryCase,
        totalCases: cases.length,
        cases,
        unreadNotificationsCount,
        pendingActions,
        recentDocuments,
        activeGrievances,
      },
    });
  } catch (err) {
    next(err);
  }
}

export async function getCitizenCases(req: Request, res: Response, next: NextFunction) {
  try {
    const userId = req.user?.userId;
    if (!userId) throw new UnauthorizedError();

    const cases = await prisma.acquisitionCase.findMany({
      where: { citizenId: userId },
      include: {
        parcel: true,
        project: true,
        compensationRecord: true,
        rrRecord: true,
        events: {
          orderBy: { eventDate: 'asc' },
        },
        actionItems: true,
        documents: true,
      },
      orderBy: { updatedAt: 'desc' },
    });

    return res.json({
      success: true,
      data: cases,
    });
  } catch (err) {
    next(err);
  }
}
