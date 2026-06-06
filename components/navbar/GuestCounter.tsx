"use client";

import { Minus, Plus } from "lucide-react";

interface CounterProps {
  title: string;
  subtitle: string;
  value: number;
  onChange: (value: number) => void;
  maxValue?: number;
}

const CounterRow = ({
  title,
  subtitle,
  value,
  onChange,
  maxValue = 16,
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
          disabled={value === 0}
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

export default function GuestCounter() {
  // In Phase 2, we will lift this state up to the URL Search Params
  return (
    <div className="w-full">
      <CounterRow
        title="Adults"
        subtitle="Ages 13 or above"
        value={0}
        onChange={(val) => console.log("Adults:", val)}
      />
      <CounterRow
        title="Children"
        subtitle="Ages 2-12"
        value={0}
        onChange={(val) => console.log("Children:", val)}
      />
      <CounterRow
        title="Infants"
        subtitle="Under 2"
        value={0}
        onChange={(val) => console.log("Infants:", val)}
      />
      <CounterRow
        title="Pets"
        subtitle="Bringing a service animal?"
        value={0}
        onChange={(val) => console.log("Pets:", val)}
        maxValue={5}
      />
    </div>
  );
}
