"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { format } from "date-fns";
import { CountrySelectValue } from "@/components/navbar/LocationPicker";

export function useSearchForm(onCloseUI: () => void) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // 1. All Form State
  const [location, setLocation] = useState<CountrySelectValue | null>(null);
  const [dateRange, setDateRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });
  const [adults, setAdults] = useState(1);
  const [childrenCount, setChildrenCount] = useState(0);
  const [infants, setInfants] = useState(0);
  const [pets, setPets] = useState(0);

  // 2. Computed Values (Calculated automatically when state changes)
  const totalGuests = adults + childrenCount;

  let guestDisplayStr = totalGuests === 1 ? "1 guest" : `${totalGuests} guests`;
  if (infants > 0) guestDisplayStr += `, ${infants} infants`;
  if (pets > 0) guestDisplayStr += `, ${pets} pets`;

  const checkInStr = format(dateRange.startDate, "MMM dd");
  const checkOutStr = format(dateRange.endDate, "MMM dd");
  const displayDates =
    dateRange.startDate !== dateRange.endDate
      ? `${checkInStr} - ${checkOutStr}`
      : "Any week";

  // 3. Handlers
  const clearAll = () => {
    setLocation(null);
    setDateRange({
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    });
    setAdults(1);
    setChildrenCount(0);
    setInfants(0);
    setPets(0);
  };

  const onSubmit = () => {
    const currentQuery = new URLSearchParams(
      Array.from(searchParams.entries()),
    );

    if (location?.value) currentQuery.set("locationValue", location.label);

    // Only set dates if they actually picked a range
    if (dateRange.startDate !== dateRange.endDate) {
      currentQuery.set("startDate", dateRange.startDate.toISOString());
      currentQuery.set("endDate", dateRange.endDate.toISOString());
    }

    currentQuery.set("guestCount", totalGuests.toString());

    const search = currentQuery.toString();
    router.push(`/?${search}`);

    // Trigger the callback to close whichever UI (Desktop/Mobile) is open
    onCloseUI();
  };

  return {
    location,
    setLocation,
    dateRange,
    setDateRange,
    displayDates,
    adults,
    setAdults,
    childrenCount,
    setChildrenCount,
    infants,
    setInfants,
    pets,
    setPets,
    totalGuests,
    guestDisplayStr,
    clearAll,
    onSubmit,
  };
}
