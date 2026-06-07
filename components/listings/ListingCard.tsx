"use client";

import Link from "next/link";
import ListingCarousel from "./ListingCarousel";

interface ListingCardProps {
  data: any;
}

export default function ListingCard({ data }: ListingCardProps) {
  return (
    <Link href={`/listings/${data._id}`}>
      <div className="col-span-1 cursor-pointer group">
        <div className="flex flex-col gap-2 w-full">
          {/* Image Container */}
          <ListingCarousel images={data.imageSrc} title={data.title} />

          {/* Text Content */}
          <div className="font-semibold text-lg mt-1 truncate">
            {data.locationValue}
          </div>
          <div className="font-light text-neutral-500 truncate">
            {data.category}
          </div>
          <div className="flex flex-row items-center gap-1">
            <div className="font-semibold">${data.price}</div>
            <div className="font-light text-neutral-500">night</div>
          </div>
        </div>
      </div>
    </Link>
  );
}
