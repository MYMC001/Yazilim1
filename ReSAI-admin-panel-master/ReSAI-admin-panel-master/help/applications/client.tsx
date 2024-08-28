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

    //Get all the applications for the job
    const applications = await prismadb.application.findMany({
      where: {
        jobId: params.jobId
      },
      include: {
        job: true,
      },
      orderBy: {
        createdAt: 'desc'
      }
    });


  return (
    <>
      <Heading title={`Applications (${data.length})`} description="Manage Applications for your Company Sector" />
      <Separator />
      <DataTable searchKey="jobs" columns={columns} data={data} />
    </>
  );
};
