import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs';

import prismadb from '@/lib/prismadb';

export async function POST(
  req: Request,
) {
  try {
    const { userId } = auth();
    const body = await req.json();

    const { name } = body;

    if (!userId) {  
      return new NextResponse("Unauthorized", { status: 403 });
    }

    if (!name) {
      return new NextResponse("Sector name is required", { status: 400 });
    }

    const sector = await prismadb.sector.create({
      data: {
        name,
        userId,
      }
    });
  
    return NextResponse.json(sector);
  } catch (error) {
    console.log('[SECTOR_POST]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};
