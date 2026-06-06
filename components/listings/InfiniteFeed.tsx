"use client";

import { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import ListingCard from "./ListingCard";
import { getListings } from "@/app/actions/getListings";

interface InfiniteFeedProps {
  initialListings: any[];
}

export default function InfiniteFeed({ initialListings }: InfiniteFeedProps) {
  const [listings, setListings] = useState(initialListings);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  // The ref that triggers the intersection observer
  const { ref, inView } = useInView({
    threshold: 0,
    rootMargin: "400px", // Trigger fetch 400px before reaching the exact bottom
  });

  useEffect(() => {
    if (inView && hasMore) {
      loadMoreListings();
    }
  }, [inView, hasMore]);

  const loadMoreListings = async () => {
    const nextPage = page + 1;
    const newProducts = await getListings(nextPage, 12);

    if (newProducts?.length) {
      setPage(nextPage);
      setListings((prev) => [...prev, ...newProducts]);
    } else {
      // Database has no more properties left
      setHasMore(false);
    }
  };

  return (
    <>
      <div className="pt-24 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {listings.map((listing: any) => (
          <ListingCard key={listing._id} data={listing} />
        ))}
      </div>

      {/* The invisible trigger element */}
      {hasMore && (
        <div ref={ref} className="flex justify-center items-center py-12 mt-8">
          <div className="w-8 h-8 border-4 border-rose-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      {!hasMore && (
        <div className="text-center py-12 text-neutral-500 font-medium mt-8">
          You've reached the end of the feed.
        </div>
      )}
    </>
  );
}
