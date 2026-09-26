import { Request, Response, NextFunction } from 'express';
import { prisma } from '../db';
import { NotFoundError } from '../utils/errors';

export async function getCaseById(req: Request, res: Response, next: NextFunction) {
  try {
    const id = req.params.id as string;

    const acquisitionCase = await prisma.acquisitionCase.findFirst({
      where: {
        OR: [
          { id },
          { caseReference: id },
        ],
      },
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

    if (!acquisitionCase) {
      throw new NotFoundError(`Acquisition case '${id}' not found`, 'CASE_NOT_FOUND');
    }

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

    const acquisitionCase = await prisma.acquisitionCase.findFirst({
      where: { OR: [{ id }, { caseReference: id }] },
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

    const currentStageIndex = stages.findIndex(s => s.key === acquisitionCase.stage);

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

    const compensation = await prisma.compensationRecord.findFirst({
      where: {
        case: { OR: [{ id }, { caseReference: id }] },
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

    const rr = await prisma.rRRecord.findFirst({
      where: {
        case: { OR: [{ id }, { caseReference: id }] },
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

    const documents = await prisma.document.findMany({
      where: {
        case: { OR: [{ id }, { caseReference: id }] },
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

    const actions = await prisma.actionItem.findMany({
      where: {
        case: { OR: [{ id }, { caseReference: id }] },
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
    const { status } = req.body;

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
