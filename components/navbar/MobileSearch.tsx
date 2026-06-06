"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import MobileSearchModal from "./MobileSearchModal";

export default function MobileSearch() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      {/* The Sticky Mobile Pill */}
      <div
        onClick={() => setIsModalOpen(true)}
        className="md:hidden flex flex-row items-center gap-4 border border-neutral-200 rounded-full px-4 py-3 shadow-sm hover:shadow-md transition cursor-pointer bg-white w-full"
      >
        <Search size={20} className="text-neutral-800" />
        <div className="flex flex-col">
          <span className="text-sm font-medium text-neutral-800">
            Where to?
          </span>
          <span className="text-xs text-neutral-500">
            Anywhere • Any week • Add guests
          </span>
        </div>
      </div>

      {/* The Full-Screen Accordion (Hidden until clicked) */}
      <MobileSearchModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
