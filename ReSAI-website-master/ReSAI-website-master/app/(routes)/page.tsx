import getFields from "@/actions/get-fields";
import getJobs from "@/actions/get-jobs";
import JobList from "@/components/job-list";
import Field from "@/components/ui/field";
import Container from "@/components/ui/container";

export const revalidate = 0;

const HomePage = async () => {
  const jobs = await getJobs({ isFeatured: true });
  const field = await getFields("ce8caa18-a04f-49d7-a1ca-633cd7d0e103");

  return (
    <Container>
      <div className="space-y-10 pb-10">
        <Field 
          data={field}
        />
        <div className="flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8">
          <JobList title="Featured jobs" items={jobs} />
        </div>
      </div>
    </Container>
  )
};

export default HomePage;
