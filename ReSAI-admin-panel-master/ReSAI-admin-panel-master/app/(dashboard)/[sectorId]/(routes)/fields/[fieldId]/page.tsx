import prismadb from "@/lib/prismadb";

import { FieldForm } from "./components/field-form";

const FieldPage = async ({
  params
}: {
  params: { fieldId: string }
}) => {
  const field = await prismadb.field.findUnique({
    where: {
      id: params.fieldId
    }
  });

  return ( 
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <FieldForm initialData={field} />
      </div>
    </div>
  );
}

export default FieldPage;
