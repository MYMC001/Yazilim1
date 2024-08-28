import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";

import prismadb from "@/lib/prismadb";

export async function GET(
  req: Request,
  { params }: { params: { typeId: string } }
) {
  try {
    if (!params.typeId) {
      return new NextResponse("Type id is required", { status: 400 });
    }

    const type = await prismadb.type.findUnique({
      where: {
        id: params.typeId
      },
      include: {
        field: true
      }
    });
  
    return NextResponse.json(type);
  } catch (error) {
    console.log('[TYPE_GET]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};

export async function DELETE(
  req: Request,
  { params }: { params: { typeId: string, sectorId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!params.typeId) {
      return new NextResponse("type id is required", { status: 400 });
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

    const type = await prismadb.type.delete({
      where: {
        id: params.typeId,
      }
    });
  
    return NextResponse.json(type);
  } catch (error) {
    console.log('[TYPE_DELETE]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};


export async function PATCH(
  req: Request,
  { params }: { params: { typeId: string, sectorId: string } }
) {
  try {   
    const { userId } = auth();

    const body = await req.json();
    
    const { name, fieldId } = body;
    
    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!fieldId) {
      return new NextResponse("Field ID is required", { status: 400 });
    }

    if (!name) {
      return new NextResponse("Category Name is required", { status: 400 });
    }

    if (!params.typeId) {
      return new NextResponse("Type id is required", { status: 400 });
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

    const type = await prismadb.type.update({
      where: {
        id: params.typeId,
      },
      data: {
        name,
        fieldId
      }
    });
  
    return NextResponse.json(type);
  } catch (error) {
    console.log('[TYPE_PATCH]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};
