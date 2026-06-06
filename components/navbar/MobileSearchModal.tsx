"use client";

import { useState } from "react";
import { X, Search } from "lucide-react";
import { format } from "date-fns";
import LocationPicker, { CountrySelectValue } from "./LocationPicker";
import DatePicker from "./DatePicker";
import GuestCounter from "./GuestCounter";

interface MobileSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileSearchModal({
  isOpen,
  onClose,
}: MobileSearchModalProps) {
  const [activeStep, setActiveStep] = useState<"where" | "when" | "who">(
    "where",
  );

  // Shared State
  const [location, setLocation] = useState<CountrySelectValue | null>(null);
  const [dateRange, setDateRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });

  if (!isOpen) return null;

  // Format dates for the accordion header
  const checkInStr = format(dateRange.startDate, "MMM dd");
  const checkOutStr = format(dateRange.endDate, "MMM dd");
  const displayDates =
    dateRange.startDate !== dateRange.endDate
      ? `${checkInStr} - ${checkOutStr}`
      : "Any week";

  return (
    <div className="fixed inset-0 z-50 bg-neutral-100 flex flex-col animate-in slide-in-from-bottom-full duration-300 md:hidden">
      {/* Top Header */}
      <div className="bg-white px-4 py-4 flex items-center justify-start shadow-sm z-10">
        <button
          onClick={onClose}
          className="p-2 rounded-full border border-neutral-200 bg-white shadow-sm hover:bg-neutral-50 transition"
        >
          <X size={16} />
        </button>
      </div>

      {/* Accordion Body */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4 pb-24 custom-scrollbar">
        {/* WHERE ACCORDION */}
        <div className="bg-white rounded-3xl p-6 shadow-sm">
          {activeStep === "where" ? (
            <div className="flex flex-col gap-4 animate-in fade-in">
              <h2 className="text-2xl font-bold">Where to?</h2>
              {/* Reused Component */}
              <LocationPicker
                value={location || undefined}
                onChange={(val) => {
                  setLocation(val);
                  setActiveStep("when"); // Auto-advance to next step!
                }}
              />
            </div>
          ) : (
            <div
              onClick={() => setActiveStep("where")}
              className="flex justify-between items-center text-sm font-medium text-neutral-500 cursor-pointer"
            >
              <span>Where</span>
              <span className="text-neutral-800">
                {location ? location.label : "I'm flexible"}
              </span>
            </div>
          )}
        </div>

        {/* WHEN ACCORDION */}
        <div className="bg-white rounded-3xl p-6 shadow-sm">
          {activeStep === "when" ? (
            <div className="flex flex-col gap-4 animate-in fade-in">
              <h2 className="text-2xl font-bold">When's your trip?</h2>
              {/* Reused Component */}
              <DatePicker
                value={dateRange}
                onChange={(item) => setDateRange(item.selection as any)}
              />
              <button
                onClick={() => setActiveStep("who")}
                className="mt-4 bg-black text-white rounded-lg py-3 font-medium hover:bg-neutral-800 transition"
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
              <span className="text-neutral-800">{displayDates}</span>
            </div>
          )}
        </div>

        {/* WHO ACCORDION */}
        <div className="bg-white rounded-3xl p-6 shadow-sm">
          {activeStep === "who" ? (
            <div className="flex flex-col gap-4 animate-in fade-in">
              <h2 className="text-2xl font-bold">Who's coming?</h2>
              {/* Reused Component */}
              <GuestCounter />
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
          onClick={() => {
            setLocation(null);
            setDateRange({
              startDate: new Date(),
              endDate: new Date(),
              key: "selection",
            });
            setActiveStep("where");
          }}
          className="text-sm font-medium underline underline-offset-2 hover:text-neutral-600 transition"
        >
          Clear all
        </button>
        <button className="bg-rose-600 hover:bg-rose-700 transition flex items-center gap-2 text-white px-6 py-3 rounded-lg font-medium shadow-md">
          <Search size={18} />
          Search
        </button>
      </div>
    </div>
  );
}
