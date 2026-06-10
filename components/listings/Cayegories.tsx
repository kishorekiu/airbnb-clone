"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { categories } from "./CategoriesData"; // Your data file
import CategoryBox from "./CategoryBox";

export default function Categories() {
  const params = useSearchParams();
  const category = params?.get("category");
  const pathname = usePathname();

  // We only want the category bar to show up on the main homepage
  const isMainPage = pathname === "/";
  if (!isMainPage) return null;

  return (
    <div className="max-w-630 mx-auto xl:px-20 md:px-10 sm:px-2 px-4">
      <div className="flex flex-row items-center justify-between overflow-x-auto pt-4 flex-nowrap scrollbar-hide">
        {categories.map((item) => (
          <CategoryBox
            key={item.label}
            label={item.label}
            icon={item.icon}
            // Check if this box matches the URL parameter
            selected={category === item.label}
          />
        ))}
      </div>
    </div>
  );
}
