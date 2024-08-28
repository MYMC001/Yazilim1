"use client";

import { useEffect, useState } from "react";

import { SectorModal } from "@/components/modals/sector-modal";

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <SectorModal />
    </>
  );
}
