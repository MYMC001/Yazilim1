import { format } from "date-fns";

import prismadb from "@/lib/prismadb";

import { FieldColumn } from "./components/columns"
import { FieldClient } from "./components/client";

const FieldsPage = async ({
  params
}: {
  params: { sectorId: string }
}) => {
  const fields = await prismadb.field.findMany({
    where: {
      sectorId: params.sectorId
    },
    orderBy: {
      createdAt: 'desc'
    }
  });

  const formattedFields: FieldColumn[] = fields.map((field) => ({
    id: field.id,
    label: field.label,
    createdAt: format(field.createdAt, 'MMMM do, yyyy'),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <FieldClient data={formattedFields} />
      </div>
    </div>
  );
};

export default FieldsPage;
