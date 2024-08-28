import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";

import prismadb from "@/lib/prismadb";


export async function PATCH(
  req: Request,
  { params }: { params: { sectorId: string } }
) {
  try {
    const { userId } = auth();
    const body = await req.json();

    const { name } = body;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!name) {
      return new NextResponse("Sector name is required", { status: 400 });
    }

    if (!params.sectorId) {
      return new NextResponse("Sector id is required", { status: 400 });
    }

    const sector = await prismadb.sector.updateMany({
      where: {
        id: params.sectorId,
        userId,
      },
      data: {
        name
      }
    });
  
    return NextResponse.json(sector);
  } catch (error) {
    console.log('[SECTOR_PATCH]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};


export async function DELETE(
  req: Request,
  { params }: { params: { sectorId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!params.sectorId) {
      return new NextResponse("Sector id is required", { status: 400 });
    }

    const sector = await prismadb.sector.deleteMany({
      where: {
        id: params.sectorId,
        userId
      }
    });
  
    return NextResponse.json(sector);
  } catch (error) {
    console.log('[SECTOR_DELETE]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};
