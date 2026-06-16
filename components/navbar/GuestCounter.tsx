"use client";

import { Minus, Plus } from "lucide-react";

interface CounterProps {
  title: string;
  subtitle: string;
  value: number;
  onChange: (value: number) => void;
  maxValue?: number;
  minValue?: number; // Added to prevent adults from going below 1
}

const CounterRow = ({
  title,
  subtitle,
  value,
  onChange,
  maxValue = 16,
  minValue = 0,
}: CounterProps) => {
  return (
    <div className="flex flex-row items-center justify-between py-4 border-b border-neutral-200 last:border-none">
      <div className="flex flex-col">
        <div className="font-medium text-neutral-800">{title}</div>
        <div className="text-sm text-neutral-500">{subtitle}</div>
      </div>
      <div className="flex flex-row items-center gap-4">
        <button
          onClick={() => onChange(value - 1)}
          disabled={value <= minValue}
          className="w-8 h-8 rounded-full border border-neutral-400 flex items-center justify-center text-neutral-600 hover:border-neutral-800 hover:text-neutral-800 disabled:opacity-30 disabled:cursor-not-allowed transition"
        >
          <Minus size={14} strokeWidth={3} />
        </button>
        <div className="font-light text-neutral-600 text-lg w-4 text-center">
          {value}
        </div>
        <button
          onClick={() => onChange(value + 1)}
          disabled={value >= maxValue}
          className="w-8 h-8 rounded-full border border-neutral-400 flex items-center justify-center text-neutral-600 hover:border-neutral-800 hover:text-neutral-800 disabled:opacity-30 disabled:cursor-not-allowed transition"
        >
          <Plus size={14} strokeWidth={3} />
        </button>
      </div>
    </div>
  );
};

// NEW: Define the props expected from the Search component
interface GuestCounterProps {
  adults: number;
  setAdults: (val: number) => void;
  childrenCount: number;
  setChildrenCount: (val: number) => void;
  infants: number;
  setInfants: (val: number) => void;
  pets: number;
  setPets: (val: number) => void;
}

export default function GuestCounter({
  adults,
  setAdults,
  childrenCount,
  setChildrenCount,
  infants,
  setInfants,
  pets,
  setPets,
}: GuestCounterProps) {
  return (
    <div className="w-full">
      <CounterRow
        title="Adults"
        subtitle="Ages 13 or above"
        value={adults}
        onChange={setAdults}
        minValue={1} // Airbnb always requires at least 1 adult!
      />
      <CounterRow
        title="Children"
        subtitle="Ages 2-12"
        value={childrenCount}
        onChange={setChildrenCount}
      />
      <CounterRow
        title="Infants"
        subtitle="Under 2"
        value={infants}
        onChange={setInfants}
      />
      <CounterRow
        title="Pets"
        subtitle="Bringing a service animal?"
        value={pets}
        onChange={setPets}
        maxValue={5}
      />
    </div>
  );
}
