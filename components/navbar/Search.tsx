"use client";

import { useState, useRef, useEffect } from "react";
import { Search as SearchIcon } from "lucide-react";
import GuestCounter from "./GuestCounter";
import DatePicker from "./DatePicker";
import { format } from "date-fns";
import LocationPicker, { CountrySelectValue } from "./LocationPicker";

export default function Search() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState<"stays" | "experiences">("stays");
  const [activeInput, setActiveInput] = useState<
    "where" | "when" | "who" | null
  >(null);
  const [dateRange, setDateRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });
  const checkInStr = format(dateRange.startDate, "MMM dd");
  const checkOutStr = format(dateRange.endDate, "MMM dd");
  const displayDates =
    dateRange.startDate !== dateRange.endDate
      ? `${checkInStr} - ${checkOutStr}`
      : "Add dates";

  const [location, setLocation] = useState<CountrySelectValue | null>(null);
  const searchRef = useRef<HTMLDivElement>(null);

  // Close the expanded menu if the user clicks outside of it
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setIsExpanded(false);
        setActiveInput(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const openSearch = (input: "where" | "when" | "who") => {
    setIsExpanded(true);
    setActiveInput(input);
  };

  // --- COMPONENT: Collapsed Pill ---
  if (!isExpanded) {
    return (
      <div
        onClick={() => openSearch("where")}
        className="border border-neutral-200 w-full md:w-auto py-2 rounded-full shadow-sm hover:shadow-md transition cursor-pointer"
      >
        <div className="flex flex-row items-center justify-between">
          <div className="text-sm font-medium px-6">Anywhere</div>
          <div className="hidden sm:block text-sm font-medium px-6 border-x border-neutral-200 flex-1 text-center">
            Any week
          </div>
          <div className="text-sm pl-6 pr-2 text-neutral-500 flex flex-row items-center gap-3">
            <div className="hidden sm:block">Add guests</div>
            <div className="p-2 bg-rose-500 rounded-full text-white">
              <SearchIcon size={16} strokeWidth={3} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // --- COMPONENT: Expanded Search Deck ---
  return (
    <div
      ref={searchRef}
      className="absolute top-0 left-0 w-full bg-white pb-6 shadow-sm z-50 animate-in fade-in slide-in-from-top-4 duration-200"
    >
      <div className="max-w-212.5 mx-auto flex flex-col items-center pt-4">
        {/* Top Tabs: Stays vs Experiences */}
        <div className="flex items-center gap-8 mb-6">
          <button
            onClick={() => setActiveTab("stays")}
            className={`text-base pb-2 ${activeTab === "stays" ? "text-black font-medium border-b-2 border-black" : "text-neutral-500 hover:text-neutral-800 hover:border-b-2 hover:border-neutral-300"}`}
          >
            Stays
          </button>
          <button
            onClick={() => setActiveTab("experiences")}
            className={`text-base pb-2 ${activeTab === "experiences" ? "text-black font-medium border-b-2 border-black" : "text-neutral-500 hover:text-neutral-800 hover:border-b-2 hover:border-neutral-300"}`}
          >
            Experiences
          </button>
        </div>

        {/* The Segmented Input Bar */}
        <div className="bg-neutral-100 rounded-3xl md:rounded-full flex flex-col md:flex-row items-center border border-neutral-200 w-full relative">
          {/* Where Input */}
          <div
            onClick={() => setActiveInput("where")}
            className={`w-full md:flex-1 rounded-full py-3 px-6 md:px-8 cursor-pointer hover:bg-neutral-200 transition relative ${activeInput === "where" ? "bg-white shadow-md hover:bg-white" : ""}`}
          >
            <div className="text-xs font-bold text-neutral-800">Where</div>
            <div
              className={`text-sm truncate ${location ? "text-black font-medium" : "text-neutral-500"}`}
            >
              {location ? location.label : "Search destinations"}
            </div>

            {/* WHERE - MODAL */}
            {activeInput === "where" && (
              <div className="absolute left-0 top-full mt-4 z-50 bg-white rounded-3xl shadow-xl border border-neutral-200 p-4">
                <LocationPicker
                  value={location!}
                  onChange={(val) => setLocation(val)}
                />
              </div>
            )}
          </div>

          {/* Mobile Horizontal Divider / Desktop Vertical Divider */}
          <div className="w-[90%] md:w-px h-px md:h-8 bg-neutral-300"></div>

          {/* When Input */}
          <div
            onClick={() => setActiveInput("when")}
            className={`w-full md:flex-1 rounded-full py-3 px-6 md:px-8 cursor-pointer hover:bg-neutral-200 transition relative ${activeInput === "when" ? "bg-white shadow-md hover:bg-white" : ""}`}
          >
            <div className="text-xs font-bold text-neutral-800">When</div>
            <div
              className={`text-sm ${displayDates === "Add dates" ? "text-neutral-500" : "text-black font-medium"}`}
            >
              {displayDates}
            </div>

            {/* WHEN - MODAL */}
            {activeInput === "when" && (
              <div className="absolute left-1/2 -translate-x-1/2 top-full mt-4 shadow-xl border border-neutral-200 rounded-3xl z-50 bg-white p-4">
                <DatePicker
                  value={dateRange}
                  onChange={(item) => setDateRange(item.selection as any)}
                />
              </div>
            )}
          </div>

          {/* Mobile Horizontal Divider / Desktop Vertical Divider */}
          <div className="w-[90%] md:w-px h-px md:h-8 bg-neutral-300"></div>

          {/* Who Input & Search Button */}
          <div
            onClick={() => setActiveInput("who")}
            className={`w-full md:flex-1 flex flex-row items-center justify-between rounded-full py-2 pl-6 pr-2 md:pl-8 cursor-pointer hover:bg-neutral-200 transition ${activeInput === "who" ? "bg-white shadow-md hover:bg-white" : ""}`}
          >
            <div>
              <div className="text-xs font-bold text-neutral-800">Who</div>
              <div className="text-sm text-neutral-500">Add guests</div>
            </div>

            <button className="bg-rose-500 hover:bg-rose-600 transition text-white rounded-full p-3 md:px-6 md:py-3 flex items-center justify-center gap-2">
              <SearchIcon size={18} strokeWidth={3} />
              <span className="hidden md:block font-medium">Search</span>
            </button>

            {/* WHO - MODAL */}
            {activeInput === "who" && (
              <div className="absolute right-0 top-full mt-4 w-[90vw] sm:w-100 max-w-[calc(100vw-2rem)] bg-white rounded-3xl shadow-xl border border-neutral-200 p-4 sm:p-8 z-50">
                <GuestCounter />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
