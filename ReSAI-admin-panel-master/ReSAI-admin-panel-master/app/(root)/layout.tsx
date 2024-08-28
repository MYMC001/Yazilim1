import { redirect } from 'next/navigation';
import { auth } from '@clerk/nextjs';

import prismadb from '@/lib/prismadb';

export default async function SetupLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { userId } = auth();

  if (!userId) {
    redirect('/sign-in');
  }

  const sector = await prismadb.sector.findFirst({
    where: {
      userId,
    }
  });

  if (sector) {
    redirect(`/${sector.id}`);
  };

  return (
    <>
      {children}
    </>
  );
};
