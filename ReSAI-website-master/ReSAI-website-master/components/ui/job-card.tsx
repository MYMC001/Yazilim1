"use client";

import Image from "next/image";
import { MouseEventHandler } from "react";
import { Expand, ShoppingCart} from "lucide-react";
import { useRouter } from "next/navigation";

import IconButton  from "@/components/ui/icon-button";
import usePreviewModal from "@/hooks/use-preview-modal";
import useApplication from "@/hooks/use-application";
import { Job } from "@/types";

interface JobCard {
  data: Job
}

const JobCard: React.FC<JobCard> = ({
  data
}) => {
  const previewModal = usePreviewModal();
  const application = useApplication();
  const router = useRouter();

  const handleClick = () => {
    router.push(`/jobs/${data?.id}`);
  };

  const onPreview: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation();

    previewModal.onOpen(data);
  };

  const onAddToApplication: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation();

    application.addItem(data);
  };
  
  return ( 
    <div onClick={handleClick} className="bg-white group cursor-pointer rounded-xl border p-3 space-y-4">
     
      <div className="aspect-square rounded-xl bg-gray-100 relative">
        {/* <Image 
          src={data?.type}
          alt="" 
          fill
          className="aspect-square object-cover rounded-md"
        /> */}
        <div className="opacity-0 group-hover:opacity-100 transition absolute w-full px-6 bottom-5">
          <div className="flex gap-x-6 justify-center">
            <IconButton 
              onClick={onPreview} 
              icon={<Expand size={20} className="text-gray-600" />}
            />
            <IconButton
              onClick={onAddToApplication} 
              icon={<ShoppingCart size={20} className="text-gray-600" />} 
            />
          </div>
        </div>
      </div>
      {/* Description */}
      <div>
        <p className="font-semibold text-lg">{data.title}</p>
        <p className="text-sm text-gray-500">{data.type?.name}</p>
        <p className="text-sm text-gray-500">{data.description}</p>
        <p className="text-sm text-gray-500">{data.location}</p>
      </div>
     
    </div>
  );
}

export default JobCard;
