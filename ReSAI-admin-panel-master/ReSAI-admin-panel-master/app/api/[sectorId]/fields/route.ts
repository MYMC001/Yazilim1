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

    const { label, imageUrl } = body;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!label) {
      return new NextResponse("Label is  ", { status: 400 });
    }

    if (!imageUrl) {
      return new NextResponse("Image URL is required", { status: 400 });
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

    const field = await prismadb.field.create({
      data: {
        label,
        imageUrl,
        sectorId: params.sectorId,
      }
    });
  
    return NextResponse.json(field);
  } catch (error) {
    console.log('[FIELDS_POST]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};

export async function GET(
  req: Request,
  { params }: { params: { sectorId: string } }
) {
  try {
    if (!params.sectorId) {
      return new NextResponse("Sector id is required", { status: 400 });
    }

    const FIELDS = await prismadb.field.findMany({
      where: {
        sectorId: params.sectorId
      }
    });
  
    return NextResponse.json(FIELDS);
  } catch (error) {
    console.log('[FIELDS_GET]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};
