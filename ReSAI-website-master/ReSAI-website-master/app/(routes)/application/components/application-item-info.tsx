interface ApplicationItemInfoProps {
  job: Record<string, any>;
}

const CartItemInfo: React.FC<ApplicationItemInfoProps> = ({
  job
}) => {
  return ( 
    <div>
      <div className="flex justify-between">
        <p className=" text-sm font-semibold text-black">
          {job.title}
        </p>
      </div>

      <div className="mt-1 flex text-sm">
        <p className="text-gray-500">{job.description}</p>
        <p className="ml-4 border-l border-gray-200 pl-4 text-gray-500">{job.location}</p>
      </div>
      <p className="mt-1 text-sm font-medium text-gray-900">{job.type}</p>
    </div>
  );
}
 
export default CartItemInfo;
