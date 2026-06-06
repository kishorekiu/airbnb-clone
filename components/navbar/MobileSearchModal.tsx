"use client";

import { useState } from "react";
import { Search, X } from "lucide-react";

interface MobileSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileSearchModal({
  isOpen,
  onClose,
}: MobileSearchModalProps) {
  // Accordion state: which section is currently open?
  const [activeStep, setActiveStep] = useState<"where" | "when" | "who">(
    "where",
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-neutral-100 flex flex-col animate-in slide-in-from-bottom-full duration-300 md:hidden">
      {/* Top Header with Close Button */}
      <div className="bg-white px-4 py-4 flex items-center justify-start shadow-sm z-10">
        <button
          onClick={onClose}
          className="p-2 rounded-full border border-neutral-200 bg-white shadow-sm"
        >
          <X size={16} />
        </button>
      </div>

      {/* Accordion Body */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4 pb-24">
        {/* WHERE ACCORDION */}
        <div className="bg-white rounded-3xl p-6 shadow-sm">
          {activeStep === "where" ? (
            <div className="flex flex-col gap-4 animate-in fade-in">
              <h2 className="text-2xl font-bold">Where to?</h2>
              <input
                type="text"
                placeholder="Search destinations"
                className="w-full bg-neutral-100 rounded-xl px-4 py-4 outline-none border border-neutral-200"
              />
              {/* Simulated auto-advance to next step */}
              <button
                onClick={() => setActiveStep("when")}
                className="text-left text-sm text-neutral-500 pt-2"
              >
                I'm flexible
              </button>
            </div>
          ) : (
            <div
              onClick={() => setActiveStep("where")}
              className="flex justify-between items-center text-sm font-medium text-neutral-500 cursor-pointer"
            >
              <span>Where</span>
              <span className="text-neutral-800">I'm flexible</span>
            </div>
          )}
        </div>

        {/* WHEN ACCORDION */}
        <div className="bg-white rounded-3xl p-6 shadow-sm">
          {activeStep === "when" ? (
            <div className="flex flex-col gap-4 animate-in fade-in">
              <h2 className="text-2xl font-bold">When's your trip?</h2>
              <div className="h-48 flex items-center justify-center text-neutral-400 bg-neutral-50 rounded-xl border border-neutral-200">
                [Calendar Component Goes Here]
              </div>
              <button
                onClick={() => setActiveStep("who")}
                className="mt-4 bg-black text-white rounded-lg py-3 font-medium"
              >
                Next
              </button>
            </div>
          ) : (
            <div
              onClick={() => setActiveStep("when")}
              className="flex justify-between items-center text-sm font-medium text-neutral-500 cursor-pointer"
            >
              <span>When</span>
              <span className="text-neutral-800">Any week</span>
            </div>
          )}
        </div>

        {/* WHO ACCORDION */}
        <div className="bg-white rounded-3xl p-6 shadow-sm">
          {activeStep === "who" ? (
            <div className="flex flex-col gap-4 animate-in fade-in">
              <h2 className="text-2xl font-bold">Who's coming?</h2>
              <div className="text-neutral-400 py-4">
                [Guest Counter Component Goes Here]
              </div>
            </div>
          ) : (
            <div
              onClick={() => setActiveStep("who")}
              className="flex justify-between items-center text-sm font-medium text-neutral-500 cursor-pointer"
            >
              <span>Who</span>
              <span className="text-neutral-800">Add guests</span>
            </div>
          )}
        </div>
      </div>

      {/* Sticky Bottom Footer */}
      <div className="fixed bottom-0 w-full bg-white border-t border-neutral-200 px-6 py-4 flex justify-between items-center z-20">
        <button
          onClick={() => setActiveStep("where")}
          className="text-sm font-medium underline underline-offset-2"
        >
          Clear all
        </button>
        <button className="bg-rose-600 flex items-center gap-2 text-white px-6 py-3 rounded-lg font-medium shadow-md">
          <Search size={18} />
          Search
        </button>
      </div>
    </div>
  );
}
