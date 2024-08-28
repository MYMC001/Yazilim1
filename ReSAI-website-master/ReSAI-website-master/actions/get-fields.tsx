import { Field } from "@/types";

const URL=`${process.env.NEXT_PUBLIC_API_URL}/fields`;

const getFields = async (id: string): Promise<Field> => {
  const res = await fetch(`${URL}/${id}`);

  return res.json();
};

export default getFields;
