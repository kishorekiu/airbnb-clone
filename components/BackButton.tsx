"use client";

import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

const BackButton = () => {
  const router = useRouter();
  return (
    <button
      onClick={() => router.back()}
      className="flex flex-row gap-1 items-center hover:opacity-80 trasition text-neutral-800 cursor-pointer mb-6"
    >
      <ChevronLeft size={24} />
      <span className="font-semibold underline">Back to listings</span>
    </button>
  );
};

export default BackButton;
