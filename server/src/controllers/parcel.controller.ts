import { Request, Response, NextFunction } from 'express';
import { prisma } from '../db';
import { NotFoundError } from '../utils/errors';

export async function searchParcels(req: Request, res: Response, next: NextFunction) {
  try {
    const q = ((req.query.q as string) || '').trim();
    const survey = ((req.query.survey as string) || '').trim();
    const village = ((req.query.village as string) || '').trim();
    const district = ((req.query.district as string) || '').trim();

    const whereClause: any = {};

    if (survey) {
      whereClause.surveyNumber = { contains: survey };
    }
    if (village) {
      whereClause.village = { contains: village };
    }
    if (district) {
      whereClause.district = { contains: district };
    }

    if (q) {
      whereClause.OR = [
        { surveyNumber: { contains: q } },
        { khasraNumber: { contains: q } },
        { village: { contains: q } },
        { district: { contains: q } },
        {
          cases: {
            some: {
              OR: [
                { caseReference: { contains: q } },
                { project: { name: { contains: q } } },
              ],
            },
          },
        },
      ];
    }

    const parcels = await prisma.parcel.findMany({
      where: Object.keys(whereClause).length > 0 ? whereClause : undefined,
      include: {
        cases: {
          include: {
            project: true,
            citizen: { select: { id: true, name: true } },
          },
        },
      },
      take: 20,
    });

    return res.json({
      success: true,
      count: parcels.length,
      data: parcels,
    });
  } catch (err) {
    next(err);
  }
}

export async function getParcelById(req: Request, res: Response, next: NextFunction) {
  try {
    const id = req.params.id as string;

    const parcel = await prisma.parcel.findFirst({
      where: {
        OR: [
          { id },
          { surveyNumber: id },
        ],
      },
      include: {
        cases: {
          include: {
            project: true,
            compensationRecord: true,
            rrRecord: true,
            citizen: { select: { id: true, name: true } },
          },
        },
        documents: true,
        grievances: true,
      },
    });

    if (!parcel) {
      throw new NotFoundError(`Parcel '${id}' not found`, 'PARCEL_NOT_FOUND');
    }

    return res.json({
      success: true,
      data: parcel,
    });
  } catch (err) {
    next(err);
  }
}

export async function getParcelCases(req: Request, res: Response, next: NextFunction) {
  try {
    const id = req.params.id as string;

    const cases = await prisma.acquisitionCase.findMany({
      where: {
        OR: [
          { parcelId: id },
          { parcel: { surveyNumber: id } },
        ],
      },
      include: {
        parcel: true,
        project: true,
        events: true,
      },
    });

    return res.json({
      success: true,
      data: cases,
    });
  } catch (err) {
    next(err);
  }
}
