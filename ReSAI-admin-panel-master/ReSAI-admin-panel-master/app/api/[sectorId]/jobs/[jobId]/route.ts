import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";

import prismadb from "@/lib/prismadb";

export async function GET(
  req: Request,
  { params }: { params: { jobId: string } }
) {
  try {
    if (!params.jobId) {
      return new NextResponse("Job id is required", { status: 400 });
    }

    const job = await prismadb.job.findUnique({
      where: {
        id: params.jobId
      },
      include: {
        type: true,
      }
    });
  
    return NextResponse.json(job);
  } catch (error) {
    console.log('[JOB_GET]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};

export async function DELETE(
  req: Request,
  { params }: { params: { jobId: string, sectorId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!params.jobId) {
      return new NextResponse("Job id is required", { status: 400 });
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

    const job = await prismadb.job.delete({
      where: {
        id: params.jobId
      },
    });
  
    return NextResponse.json(job);
  } catch (error) {
    console.log('[JOB_DELETE]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};


export async function PATCH(
  req: Request,
  { params }: { params: { jobId: string, sectorId: string } }
) {
  try {
    const { userId } = auth();

    const body = await req.json();

    const { name, about, location, applicationsCount, typeId, isFeatured, isArchived } = body;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!params.jobId) {
      return new NextResponse("Job id is required", { status: 400 });
    }

    if (!name) {
      return new NextResponse("Title is required", { status: 400 });
    }

   

    if (!about) {
      return new NextResponse("Description is required", { status: 400 });
    }

    if (!typeId) {
      return new NextResponse("Type id is required", { status: 400 });
    }

    if(!location) {
      return new NextResponse("Location is required", { status: 400 });
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

    await prismadb.job.update({
      where: {
        id: params.jobId
      },
      data: {
        name,
        about,
        typeId,
        location,
        applicationsCount,
        isFeatured,
        isArchived,
      },
    });

    const job = await prismadb.job.update({
      where: {
        id: params.jobId
      },
      data: {
        name,
        about,
        typeId,
        location,
        applicationsCount,
        isFeatured,
        isArchived,
      },
      
    })
  
    return NextResponse.json(job);
  } catch (error) {
    console.log('[JOB_PATCH]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};
