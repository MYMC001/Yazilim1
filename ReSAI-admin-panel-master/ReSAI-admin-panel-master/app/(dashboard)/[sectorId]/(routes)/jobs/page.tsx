import { format } from "date-fns";

import prismadb from "@/lib/prismadb";
//import { formatter } from "@/lib/utils";

import { JobsClient } from "../../../../../help/components/client";
import { JobColumn } from "../../../../../help/components/columns";

const jobsPage = async ({
  params
}: {
  params: { sectorId: string }
}) => {
  const jobs = await prismadb.job.findMany({
    where: {
      sectorId: params.sectorId
    },
    include: {
      type: true,
    },
    orderBy: {
      createdAt: 'desc'
    }
  });

  const formattedJobs: JobColumn[] = jobs.map((item) => ({

    id: item.id,
    name: item.name,
    // Get only the first 50 characters of the about
    about: item.about.length > 50 ? item.about.substring(0, 50) + '...' : item.about,
    location: item.location,
    applicationsCount: item.applicationsCount,
    type: item.type.name,
    isFeatured: item.isFeatured,
    isArchived: item.isArchived,
  
    createdAt: format(item.createdAt, 'MMMM do, yyyy'),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <JobsClient data={formattedJobs} />
      </div>
    </div>
  );
};

export default jobsPage;
