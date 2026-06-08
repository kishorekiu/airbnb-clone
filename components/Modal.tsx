"use client";

import { useRouter } from "next/navigation";
import { X } from "lucide-react";
import { useEffect } from "react";

export default function Modal({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  // Close modal on escape key press
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") router.back();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [router]);

  return (
    <div
      // The darkened backdrop
      className="fixed inset-0 z-50 bg-neutral-900/60 backdrop-blur-sm flex justify-center items-center p-4 sm:p-10"
      onClick={() => router.back()}
    >
      <div
        // The modal container
        onClick={(e) => e.stopPropagation()} // Prevent clicks inside modal from closing it
        className="bg-white w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-2xl relative shadow-2xl animate-in fade-in zoom-in-95 duration-200"
      >
        <button
          onClick={() => router.back()}
          className="absolute top-6 left-6 z-10 bg-white/90 border border-neutral-200 rounded-full p-2 hover:scale-105 hover:bg-white transition shadow-sm"
        >
          <X size={20} />
        </button>

        {children}
      </div>
    </div>
  );
}
