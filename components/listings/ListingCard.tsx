"use client";

import Image from "next/image";
import { Heart } from "lucide-react";

interface ListingCardProps {
  data: any;
}

export default function ListingCard({ data }: ListingCardProps) {
  return (
    <div className="col-span-1 cursor-pointer group">
      <div className="flex flex-col gap-2 w-full">
        {/* Image Container */}
        <div className="aspect-square w-full relative overflow-hidden rounded-xl">
          <Image
            fill
            className="object-cover h-full w-full group-hover:scale-110 transition duration-300"
            src={data.imageSrc}
            alt={data.title}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          />
          {/* Favorite Button Overlay */}
          <div className="absolute top-3 right-3">
            <Heart
              size={24}
              className="text-white drop-shadow-md hover:fill-rose-500 hover:text-rose-500 transition"
            />
          </div>
        </div>

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
  );
}
