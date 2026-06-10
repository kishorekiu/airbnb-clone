"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { LucideIcon } from "lucide-react";

interface CategoryBoxProps {
  icon: LucideIcon;
  label: string;
  selected?: boolean;
}

export default function CategoryBox({
  icon: Icon,
  label,
  selected,
}: CategoryBoxProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleClick = useCallback(() => {
    // 1. Copy the current URL parameters
    const currentQuery = new URLSearchParams(
      Array.from(searchParams.entries()),
    );

    // 2. Toggle logic: If they click the already-selected category, remove it. Otherwise, set it.
    if (currentQuery.get("category") === label) {
      currentQuery.delete("category");
    } else {
      currentQuery.set("category", label);
    }

    // 3. Push the new URL to the browser
    const search = currentQuery.toString();
    const query = search ? `?${search}` : "";

    router.push(`/${query}`);
  }, [label, searchParams, router]);

  return (
    <div
      onClick={handleClick}
      className={`
        flex flex-col items-center justify-center gap-2 p-3 border-b-2 hover:text-neutral-800 transition cursor-pointer
        ${selected ? "border-b-neutral-800 text-neutral-800" : "border-transparent text-neutral-500"}
      `}
    >
      <Icon size={26} />
      <div className="font-medium text-sm">{label}</div>
    </div>
  );
}
