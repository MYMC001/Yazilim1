import { redirect } from 'next/navigation';
import { auth } from '@clerk/nextjs';

import Navbar from '@/components/navbar'
import prismadb from '@/lib/prismadb';

export default async function DashboardLayout({
  children,
  params
}: {
  children: React.ReactNode
  params: { sectorId: string }
}) {
  const { userId } = auth();

  if (!userId) {
    redirect('/sign-in');
  }

  const sector = await prismadb.sector.findFirst({ 
    where: {
      id: params.sectorId,
      userId,
    }
   });

  if (!sector) {
    redirect('/');
  };

  return (
    <>
      <Navbar />
      {children}
    </>
  );
};
