"use client";

import { DateRange, Range, RangeKeyDict } from "react-date-range";

// These CSS imports are mandatory for the calendar to render correctly
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

interface DatePickerProps {
  value: Range;
  onChange: (value: RangeKeyDict) => void;
}

export default function DatePicker({ value, onChange }: DatePickerProps) {
  return (
    <div className="w-full flex justify-center">
      <DateRange
        ranges={[value]}
        onChange={onChange}
        rangeColors={["#f43f5e"]} // The exact Airbnb Rose color
        direction="vertical"
        showDateDisplay={false}
        minDate={new Date()} // Prevents selecting dates in the past
      />
    </div>
  );
}
