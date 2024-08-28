import prismadb from "@/lib/prismadb";

import { TypeForm } from "./components/type-form";

const TypePage = async ({
  params
}: {
  params: { typeId: string, sectorId: string }
}) => {
  const type = await prismadb.type.findUnique({
    where: {
      id: params.typeId
    }
  });

  const fields = await prismadb.field.findMany({
    where: {
      sectorId: params.sectorId
    }
  });

  return ( 
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <TypeForm fields={fields} initialData={type} />
      </div>
    </div>
  );
}

export default TypePage;
