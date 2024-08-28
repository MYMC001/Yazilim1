import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";

import prismadb from "@/lib/prismadb";

export async function GET(
  req: Request,
  { params }: { params: { fieldId: string } }
) {
  try {
    if (!params.fieldId) {
      return new NextResponse("Field id is required", { status: 400 });
    }

    const field = await prismadb.field.findUnique({
      where: {
        id: params.fieldId
      }
    });
  
    return NextResponse.json(field);
  } catch (error) {
    console.log('[FIELD_GET]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};

export async function DELETE(
  req: Request,
  { params }: { params: { fieldId: string, sectorId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!params.fieldId) {
      return new NextResponse("Field id is required", { status: 400 });
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

    const field = await prismadb.field.delete({
      where: {
        id: params.fieldId,
      }
    });
  
    return NextResponse.json(field);
  } catch (error) {
    console.log('[FIELD_DELETE]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};


export async function PATCH(
  req: Request,
  { params }: { params: { fieldId: string, sectorId: string } }
) {
  try {   
    const { userId } = auth();

    const body = await req.json();
    
    const { label, imageUrl } = body;
    
    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!label) {
      return new NextResponse("Label is required", { status: 400 });
    }

    if (!imageUrl) {
      return new NextResponse("Image URL is required", { status: 400 });
    }

    if (!params.fieldId) {
      return new NextResponse("field id is required", { status: 400 });
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

    const field = await prismadb.field.update({
      where: {
        id: params.fieldId,
      },
      data: {
        label,
        imageUrl
      }
    });
  
    return NextResponse.json(field);
  } catch (error) {
    console.log('[FIELD_PATCH]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};
