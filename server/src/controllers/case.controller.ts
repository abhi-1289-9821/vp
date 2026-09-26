import { Request, Response, NextFunction } from 'express';
import { prisma } from '../db';
import {
  NotFoundError,
  ForbiddenError,
  UnauthorizedError,
  BadRequestError,
} from '../utils/errors';

/**
 * Validates that the requesting user is either an OFFICER/ADMIN or the citizen who owns the case.
 */
async function findAndAuthorizeCase(
  id: string,
  user: { userId: string; role: string } | undefined
) {
  if (!user) {
    throw new UnauthorizedError('Authentication required');
  }

  const acquisitionCase = await prisma.acquisitionCase.findFirst({
    where: {
      OR: [{ id }, { caseReference: id }],
    },
    select: {
      id: true,
      citizenId: true,
      caseReference: true,
    },
  });

  if (!acquisitionCase) {
    throw new NotFoundError(`Acquisition case '${id}' not found`, 'CASE_NOT_FOUND');
  }

  if (
    user.role !== 'OFFICER' &&
    user.role !== 'ADMIN' &&
    acquisitionCase.citizenId !== user.userId
  ) {
    throw new ForbiddenError(
      'Access denied: You do not have permission to view this case',
      'FORBIDDEN_CASE_ACCESS'
    );
  }

  return acquisitionCase;
}

export async function getCaseById(req: Request, res: Response, next: NextFunction) {
  try {
    const id = req.params.id as string;
    const authCase = await findAndAuthorizeCase(id, req.user);

    const acquisitionCase = await prisma.acquisitionCase.findUnique({
      where: { id: authCase.id },
      include: {
        parcel: true,
        project: true,
        citizen: {
          select: { id: true, name: true, email: true, phone: true, profile: true },
        },
        events: {
          orderBy: { eventDate: 'asc' },
          include: { document: true },
        },
        compensationRecord: true,
        rrRecord: true,
        actionItems: {
          orderBy: { deadline: 'asc' },
        },
        documents: {
          orderBy: { createdAt: 'desc' },
        },
        grievances: {
          orderBy: { createdAt: 'desc' },
        },
      },
    });

    return res.json({
      success: true,
      data: acquisitionCase,
    });
  } catch (err) {
    next(err);
  }
}

export async function getCaseTimeline(req: Request, res: Response, next: NextFunction) {
  try {
    const id = req.params.id as string;
    const authCase = await findAndAuthorizeCase(id, req.user);

    const acquisitionCase = await prisma.acquisitionCase.findUnique({
      where: { id: authCase.id },
      include: {
        events: {
          orderBy: { eventDate: 'asc' },
          include: { document: true },
        },
      },
    });

    if (!acquisitionCase) {
      throw new NotFoundError('Case not found');
    }

    const stages = [
      { key: 'PROPOSAL', label: 'Proposal & SIA', desc: 'Social Impact Assessment & feasibility study' },
      { key: 'NOTIFICATION', label: 'Section 11(1) Notice', desc: 'Preliminary Gazette acquisition notification' },
      { key: 'VERIFICATION', label: 'Ground Verification & Objections', desc: 'Joint cadastral measurement & Section 15 objections' },
      { key: 'AWARD', label: 'Section 19 Declaration & Award', desc: 'Statutory declaration of acquisition' },
      { key: 'COMPENSATION', label: 'Compensation Determination', desc: 'Section 30 award valuation & Solatium calculation' },
      { key: 'RR', label: 'R&R Package Sanction', desc: 'Rehabilitation and Resettlement entitlements' },
      { key: 'POSSESSION', label: 'Land Handover & Possession', desc: 'Possession transfer under Section 38' },
      { key: 'CLOSURE', label: 'Case Finalization & Closure', desc: 'DBT disbursement and revenue mutation update' },
    ];

    const currentStageIndex = stages.findIndex((s) => s.key === acquisitionCase.stage);

    const timeline = stages.map((stage, idx) => {
      let status: 'COMPLETED' | 'CURRENT' | 'UPCOMING' = 'UPCOMING';
      if (idx < currentStageIndex) status = 'COMPLETED';
      else if (idx === currentStageIndex) status = 'CURRENT';

      const matchedEvent = acquisitionCase.events.find((e: any) => e.stage === stage.key);

      return {
        stageKey: stage.key,
        title: stage.label,
        description: stage.desc,
        status,
        date: matchedEvent?.eventDate || null,
        details: matchedEvent?.description || null,
        document: matchedEvent?.document || null,
      };
    });

    return res.json({
      success: true,
      data: {
        currentStage: acquisitionCase.stage,
        timeline,
      },
    });
  } catch (err) {
    next(err);
  }
}

export async function getCaseCompensation(req: Request, res: Response, next: NextFunction) {
  try {
    const id = req.params.id as string;
    const authCase = await findAndAuthorizeCase(id, req.user);

    const compensation = await prisma.compensationRecord.findFirst({
      where: {
        caseId: authCase.id,
      },
      include: {
        case: { include: { parcel: true, project: true } },
      },
    });

    if (!compensation) {
      throw new NotFoundError('Compensation record not found for this case');
    }

    return res.json({
      success: true,
      data: compensation,
    });
  } catch (err) {
    next(err);
  }
}

export async function getCaseRR(req: Request, res: Response, next: NextFunction) {
  try {
    const id = req.params.id as string;
    const authCase = await findAndAuthorizeCase(id, req.user);

    const rr = await prisma.rRRecord.findFirst({
      where: {
        caseId: authCase.id,
      },
      include: {
        case: { include: { parcel: true } },
      },
    });

    if (!rr) {
      throw new NotFoundError('R&R record not found for this case');
    }

    return res.json({
      success: true,
      data: rr,
    });
  } catch (err) {
    next(err);
  }
}

export async function getCaseDocuments(req: Request, res: Response, next: NextFunction) {
  try {
    const id = req.params.id as string;
    const authCase = await findAndAuthorizeCase(id, req.user);

    const documents = await prisma.document.findMany({
      where: {
        caseId: authCase.id,
      },
      orderBy: { createdAt: 'desc' },
    });

    return res.json({
      success: true,
      data: documents,
    });
  } catch (err) {
    next(err);
  }
}

export async function getCaseActions(req: Request, res: Response, next: NextFunction) {
  try {
    const id = req.params.id as string;
    const authCase = await findAndAuthorizeCase(id, req.user);

    const actions = await prisma.actionItem.findMany({
      where: {
        caseId: authCase.id,
      },
      include: { document: true },
      orderBy: { deadline: 'asc' },
    });

    return res.json({
      success: true,
      data: actions,
    });
  } catch (err) {
    next(err);
  }
}

export async function updateActionStatus(req: Request, res: Response, next: NextFunction) {
  try {
    const actionId = req.params.actionId as string;
    const user = req.user;
    if (!user) {
      throw new UnauthorizedError('Authentication required');
    }

    const { status } = req.body || {};

    const action = await prisma.actionItem.findUnique({
      where: { id: actionId },
      include: { case: true },
    });

    if (!action) {
      throw new NotFoundError('Action item not found', 'ACTION_NOT_FOUND');
    }

    const isStaff = user.role === 'OFFICER' || user.role === 'ADMIN';
    const isCaseOwner = action.citizenId === user.userId || action.case.citizenId === user.userId;

    if (!isStaff && !isCaseOwner) {
      throw new ForbiddenError(
        'Access denied: You do not have permission to update this action item',
        'FORBIDDEN_ACTION_UPDATE'
      );
    }

    const allowedStatuses = ['ACTION_REQUIRED', 'IN_PROGRESS', 'COMPLETED', 'NO_ACTION_REQUIRED'];
    if (!status || !allowedStatuses.includes(status)) {
      throw new BadRequestError(
        `Invalid status '${status}'. Allowed values: ${allowedStatuses.join(', ')}`,
        'INVALID_STATUS'
      );
    }

    const updated = await prisma.actionItem.update({
      where: { id: actionId },
      data: { status },
    });

    return res.json({
      success: true,
      data: updated,
    });
  } catch (err) {
    next(err);
  }
}
