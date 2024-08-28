import JobList from '@/components/job-list'
import Gallery from '@/components/gallery';
import Info from '@/components/info';
import getJob from '@/actions/get-job';
import getJobs from '@/actions/get-jobs';
import Container from '@/components/ui/container';

export const revalidate = 0;

interface JobPageProps {
  params: {
    jobId: string;
  },
}

const JobPage: React.FC<JobPageProps> = async ({ 
  params
 }) => {
  const job = await getJob(params.jobId);
  const suggestedjobs = await getJobs({ 
    typeId: job?.type?.id
  });

  if (!job) {
    return null;
  }

  return (
    <div className="bg-white">
      <Container>
        <div className="px-4 py-10 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
            {/* <Gallery images={job.images} /> */}
            <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
              <Info data={job} />
            </div>
          </div>
          <hr className="my-10" />
          <JobList title="Related Items" items={suggestedjobs} />
        </div>
      </Container>
    </div>  
  )
}

export default JobPage;
