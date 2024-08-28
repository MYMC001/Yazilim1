import prismadb from "@/lib/prismadb";

import { JobForm } from "./components/job-form";
import { Separator } from "@/components/ui/separator";
import { Heading } from "@/components/ui/heading";

import { DataTable } from "@/components/ui/data-table";



// Import the application table
import {columns} from "./applications/columns";


const JobPage = async ({
  params
}: {
  params: { jobId: string, sectorId: string }
}) => {
  const job = await prismadb.job.findUnique({
    where: {
      id: params.jobId,
    },
    include: {
      type: true,
    }
  });

  const types = await prismadb.type.findMany({
    where: {
      sectorId: params.sectorId,
    },
  });

 
  //Let's get the applications for this job
  // const applications = await prismadb.application.findMany({
  //   where: {
  //     jobId: params.jobId
  //   }
  // });

  // console.log("Applications for this job: ",applications);

  return ( 
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <JobForm 
          types={types}
          initialData={job}
        />

        <Separator />
        
        {/* <Heading title={`Applications (${applications?.length})`}  description="Smart Evalutations for the Job Applications" /> */}
        {/* <Heading title={`Applications (${applications?.length})`} description="Manage Applications for your Company Sector" /> */}
     
        {/* <DataTable searchKey="applications" columns={columns} data={applications} /> */}
      

      </div>
    </div>
  );
}

export default JobPage;
