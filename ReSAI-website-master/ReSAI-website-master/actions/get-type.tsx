import { Type } from "@/types";

const URL=`${process.env.NEXT_PUBLIC_API_URL}/types`;

const getType = async (id: string): Promise<Type> => {
  const res = await fetch(`${URL}/${id}`);

  return res.json();
};

export default getType;
