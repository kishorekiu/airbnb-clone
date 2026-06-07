"use client";

import { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import ListingCard from "./ListingCard";
import { getListings } from "@/app/actions/getListings";

interface InfiniteFeedProps {
  initialListings: any[];
  initialCursor: string | null;
}

export default function InfiniteFeed({
  initialListings,
  initialCursor,
}: InfiniteFeedProps) {
  const [listings, setListings] = useState(initialListings);
  const [cursor, setCursor] = useState<string | null>(initialCursor);
  const [hasMore, setHasMore] = useState(initialCursor !== null);

  // The ref that triggers the intersection observer
  const { ref, inView } = useInView({
    threshold: 0,
    rootMargin: "400px", // Trigger fetch 400px before reaching the exact bottom
  });

  useEffect(() => {
    if (inView && hasMore && cursor) {
      loadMoreListings();
    }
  }, [inView, hasMore, cursor]);

  const loadMoreListings = async () => {
    // Pass the current cursor to the API
    const result = await getListings(cursor, 12);

    if (result.listings.length > 0) {
      setListings((prev) => [...prev, ...result.listings]);
      setCursor(result.nextCursor); // Update state with the next cursor
      setHasMore(result.nextCursor !== null); // If null, we hit the end
    } else {
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
