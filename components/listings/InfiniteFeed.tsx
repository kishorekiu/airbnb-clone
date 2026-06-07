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

  // 1. THE LOCK: Track if a network request is currently active
  const [isFetching, setIsFetching] = useState(false);

  const { ref, inView } = useInView({ rootMargin: "400px" });

  useEffect(() => {
    // 2. CHECK THE LOCK: Only load more if we are NOT currently fetching
    if (inView && hasMore && cursor && !isFetching) {
      loadMoreListings();
    }
  }, [inView, hasMore, cursor, isFetching]);

  const loadMoreListings = async () => {
    setIsFetching(true); // Engage the lock

    try {
      const result = await getListings(cursor, 12);

      if (result.listings.length > 0) {
        setListings((prev) => {
          // 3. THE SAFETY NET: Filter out duplicates before adding them to state
          const newUniqueListings = result.listings.filter(
            (newListing: any) =>
              !prev.some(
                (existingListing: any) =>
                  existingListing._id === newListing._id,
              ),
          );
          return [...prev, ...newUniqueListings];
        });

        setCursor(result.nextCursor);
        setHasMore(result.nextCursor !== null);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error loading more listings:", error);
    } finally {
      setIsFetching(false); // Release the lock no matter what happens
    }
  };

  return (
    <>
      <div className="pt-24 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {listings.map((listing: any) => (
          <ListingCard key={listing._id} data={listing} />
        ))}
      </div>

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
