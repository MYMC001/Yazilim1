import { format } from "date-fns";

import prismadb from "@/lib/prismadb";
//import { formatter } from "@/lib/utils";

import { ApplicationColumn } from "../../../../../../../help/applications/columns"
import { ApplicationClient } from "../../../../../../../help/applications/client";


const ApplicationsPage = async ({params}: {params: { jobId: string }}) => {

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

  const formattedApplications: ApplicationColumn[] = applications.map((item) => ({
    id: item.id,
    name: item.name,
    surname: item.surname,
    email: item.email,
    resume: item.resume,
    // score is a decimal number
    score: item.score,
    range: item.range,
    status: item.status,
    createdAt: format(item.createdAt, 'MMMM do, yyyy'),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ApplicationClient data={formattedApplications} />
      </div>
    </div>
  );
};

export default ApplicationsPage;
