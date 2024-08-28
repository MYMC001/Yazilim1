"use client";

import { DataTable } from "@/components/ui/data-table";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";

import { columns, ApplicationColumn } from "./columns";

interface ApplicationClientProps {
  data: ApplicationColumn[];
}

export const ApplicationClient: React.FC<ApplicationClientProps> = ({
  data
}) => {



  return (
    <>
      <Heading title={`Applications (${data.length})`} description="Manage Applications for your Company Sector" />
      <Separator />
      <DataTable searchKey="jobs" columns={columns} data={data} />
    </>
  );
};
