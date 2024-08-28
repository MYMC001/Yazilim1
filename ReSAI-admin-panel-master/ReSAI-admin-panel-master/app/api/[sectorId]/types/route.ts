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

    const { name, fieldId } = body;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }
    
    if (!fieldId) {
      return new NextResponse("Field Id is required", { status: 400 });
    }

    if (!params.sectorId) {
      return new NextResponse("Sector id is required", { status: 400 });
    }

    const sectorByUserId = await prismadb.sector.findFirst({
      where: {
        id: params.sectorId,
        userId,
      }
    });

    if (!sectorByUserId) {
      return new NextResponse("Unauthorized", { status: 405 });
    }

    const type = await prismadb.type.create({
      data: {
        name,
        fieldId,
        sectorId: params.sectorId,
      }
    });
  
    return NextResponse.json(type);
  } catch (error) {
    console.log('[TYPES_POST]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};

export async function GET(
  req: Request,
  { params }: { params: { sectorId: string } }
) {
  try {
    if (!params.sectorId) {
      return new NextResponse("sector id is required", { status: 400 });
    }

    const types = await prismadb.type.findMany({
      where: {
        sectorId: params.sectorId
      }
    });
  
    return NextResponse.json(types);
  } catch (error) {
    console.log('[TYPES_GET]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};
