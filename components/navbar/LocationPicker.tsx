"use client";

import { useState } from "react";
import useCountries from "@/hooks/useCountries";
import { MapPin } from "lucide-react";

export type CountrySelectValue = {
  flag: string;
  label: string;
  latlng: number[];
  region: string;
  value: string;
};

interface LocationPickerProps {
  value?: CountrySelectValue;
  onChange: (value: CountrySelectValue) => void;
}

export default function LocationPicker({
  value,
  onChange,
}: LocationPickerProps) {
  const { getAll } = useCountries();
  const [searchTerm, setSearchTerm] = useState("");

  // Filter countries based on what the user types
  const filteredCountries = getAll().filter((country) =>
    country.label.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="w-full">
      {/* Internal Search Input for Filtering */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search destinations..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-3 rounded-xl border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-rose-500 transition"
        />
      </div>

      {/* Scrollable List of Countries */}
      <div className="max-h-75 overflow-y-auto pr-2 custom-scrollbar">
        {filteredCountries.length === 0 ? (
          <div className="text-center text-neutral-500 py-4">
            No locations found.
          </div>
        ) : (
          filteredCountries.map((country) => (
            <div
              key={country.value}
              onClick={() => onChange(country)}
              className={`flex flex-row items-center gap-4 p-3 rounded-xl cursor-pointer hover:bg-neutral-100 transition ${
                value?.value === country.value ? "bg-neutral-100" : ""
              }`}
            >
              <div className="text-2xl">{country.flag}</div>
              <div className="flex flex-col">
                <span className="font-medium text-neutral-800">
                  {country.label}
                </span>
                <span className="text-sm text-neutral-500">
                  {country.region}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
