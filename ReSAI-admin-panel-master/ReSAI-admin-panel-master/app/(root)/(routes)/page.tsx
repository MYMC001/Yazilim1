"use client";

import { useEffect } from "react";
//import { useParams } from "next/navigation";

import { useSectorModal } from "@/hooks/use-sector-modal";

const SetupPage = () => {
  const onOpen = useSectorModal((state) => state.onOpen);
  const isOpen = useSectorModal((state) => state.isOpen);

  useEffect(() => {
    if (!isOpen) {
      onOpen();
    }
  }, [isOpen, onOpen]);

  return null;
};
 
export default SetupPage;
