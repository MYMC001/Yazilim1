"use client";

import { useEffect, useState } from 'react';

import Container from '@/components/ui/container';
import useApplication from '@/hooks/use-application';

import Summary from './components/summary'
import ApplicationItem from './components/application-item';

export const revalidate = 0;

const ApplicationPage = () => {
  const [isMounted, setIsMounted] = useState(false);
  const application = useApplication();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="bg-white">
      <Container>
        <div className="px-4 py-16 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-black">Job applications</h1>
          <div className="mt-12 lg:grid lg:grid-cols-12 lg:items-start gap-x-12">
            <div className="lg:col-span-7">
              {application.items.length === 0 && <p className="text-neutral-500">You haven't applied to any job yet!!!</p>}
              <ul>
                {application.items.map((item) => (
                  <ApplicationItem key={item.id} data={item} />
                ))}
              </ul>
            </div>
            <Summary />
          </div>
        </div>
      </Container>
    </div>
  )
};

export default ApplicationPage;
