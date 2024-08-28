"use client";

import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { ApiList } from "@/components/ui/api-list";

import { JobColumn, columns } from "./columns";

interface JobsClientProps {
  data: JobColumn[];
};

export const JobsClient: React.FC<JobsClientProps> = ({
  data
}) => {
  const params = useParams();
  const router = useRouter();

  return (
    <> 
      <div className="flex items-center justify-between">
        <Heading title={`Jobs (${data.length})`} description="Manage jobs for your company sector" />
        <Button onClick={() => router.push(`/${params.sectorId}/jobs/new`)}>
          <Plus className="mr-2 h-4 w-4" /> Add New
        </Button>
      </div>
      <Separator />
      <DataTable searchKey="name" columns={columns} data={data} />
      <Heading title="API" description="API Calls for jobs" />
      <Separator />
      <ApiList entityName="jobs" entityIdName="jobId" />
    </>
  );
};
