import { Job } from "@/types";
import qs from "query-string";

const URL=`${process.env.NEXT_PUBLIC_API_URL}/jobs`;

interface Query {
  typeId?: string;
  fieldId?: string;
  title?: string;
  description?: string;
  location?: string;
  isFeatured?: boolean;
  postedAt?: string;
}

const getJobs = async (query: Query): Promise<Job[]> => {
  const url = qs.stringifyUrl({
    url: URL,
    query: { 
      fieldId: query.fieldId,
      title: query.title,
      description: query.description,
      location: query.location,
      typeId: query.typeId,
      isFeatured: query.isFeatured,
      postedAt: query.postedAt,
    },
  });

  const res = await fetch(url);

  return res.json();
};

export default getJobs;
