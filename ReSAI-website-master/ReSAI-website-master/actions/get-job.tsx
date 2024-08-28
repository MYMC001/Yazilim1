import { Job } from "@/types";

const URL=`${process.env.NEXT_PUBLIC_API_URL}/jobs`;

const getJob = async (id: string): Promise<Job> => {
  const res = await fetch(`${URL}/${id}`);

  return res.json();
};

export default getJob;
