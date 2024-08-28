import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs';

import prismadb from '@/lib/prismadb';

export async function POST(
  req: Request,
  { params }: { params: { sectorId: string } }
) {
  try {
    const { userId } = auth();

    const body = await req.json();

    const { name, about, location, applicationsCount, typeId, isFeatured, isArchived } = body;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    if(!location) {
      return new NextResponse("Location is required", { status: 400 });
    }

   

    if (!about) {
      return new NextResponse("Description is required", { status: 400 });
    }

    if (!typeId) {
      return new NextResponse("Type id is required", { status: 400 });
    }

   

    if (!params.sectorId) {
      return new NextResponse("Sector id is required", { status: 400 });
    }

    const sectorByUserId = await prismadb.sector.findFirst({
      where: {
        id: params.sectorId,
        userId
      }
    });

    if (!sectorByUserId) {
      return new NextResponse("Unauthorized", { status: 405 });
    }

    const job = await prismadb.job.create({
      data: {
        name,
        about,
        typeId,
        location,
        applicationsCount,
        isFeatured,
        isArchived,
        sectorId: params.sectorId,
      },
    });
  
    return NextResponse.json(job);
  } catch (error) {
    console.log('[JOBS_POST]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};

export async function GET(
  req: Request,
  { params }: { params: { sectorId: string } },
) {
  try {
    const { searchParams } = new URL(req.url)
    const typeId = searchParams.get('typeId') || undefined;

    const isFeatured = searchParams.get('isFeatured');

    if (!params.sectorId) {
      return new NextResponse("Sector id is required", { status: 400 });
    }

    const jobs = await prismadb.job.findMany({
      where: {
        sectorId: params.sectorId,
        typeId,
        isFeatured: isFeatured ? true : undefined,
        isArchived: false,
      },
      include: {
        type: true,
      },
      orderBy: {
        createdAt: 'desc',
      }
    });
  
    return NextResponse.json(jobs);
  } catch (error) {
    console.log('[JOBS_GET]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};