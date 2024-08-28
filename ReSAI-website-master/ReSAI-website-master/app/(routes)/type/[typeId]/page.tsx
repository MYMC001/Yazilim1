
import Container from '@/components/ui/container';
import Field from '@/components/ui/field';
import JobCard from '@/components/ui/job-card';
import NoResults from '@/components/ui/no-results';

import getJobs from "@/actions/get-jobs";
import getType from '@/actions/get-type';


import Filter from './components/filter';
import MobileFilters from './components/mobile-filters';

export const revalidate = 0;

interface TypePageProps {
  params: {
    typeId: string;
  },
  searchParams: {
    label: string;

  }
}

const typePage: React.FC<TypePageProps> = async ({ 
  params, 
  searchParams
}) => {
  const jobs = await getJobs({ 
    typeId: params.typeId,
  });
  
  const type = await getType(params.typeId);

  return (
    <div className="bg-white">
      <Container>
        <Field 
          data={type.field}
        />
        <div className="px-4 sm:px-6 lg:px-8 pb-24">
          <div className="lg:grid lg:grid-cols-5 lg:gap-x-8">
            {/* <MobileFilters sizes={sizes} colors={colors} />
            <div className="hidden lg:block">
              <Filter
                valueKey="sizeId" 
                name="Sizes" 
                data={sizes}
              />
              <Filter 
                valueKey="colorId" 
                name="Colors" 
                data={colors}
              />
            </div> */}
            <div className="mt-6 lg:col-span-4 lg:mt-0">
              {jobs.length === 0 && <NoResults />}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {jobs.map((item) => (
                  <JobCard key={item.id} data={item} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default typePage;
