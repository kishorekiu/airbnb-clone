"use client";

import { useInView } from "react-intersection-observer";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import ListingCard from "./ListingCard";
import { getListings } from "@/app/actions/getListings";
import { useSearchParams } from "next/navigation";
import ListingCardSkeleton from "./ListingCardSkeleton";

interface InfiniteFeedProps {
  initialListings: any[];
  initialCursor: string | null;
}

export default function InfiniteFeed({
  initialListings,
  initialCursor,
}: InfiniteFeedProps) {
  const { ref, inView } = useInView({ rootMargin: "50px", threshold: 0 });
  const searchParams = useSearchParams();
  let category = searchParams?.get("category");
  const locationValue = searchParams?.get("locationValue");
  const guestCount = searchParams?.get("guestCount");
  const startDate = searchParams?.get("startDate");
  const endDate = searchParams?.get("endDate");

  const isSearch = category || locationValue || guestCount || startDate;

  // React Query takes over the global cache and pagination logic
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteQuery({
      queryKey: [
        "listings",
        "feed",
        category,
        locationValue,
        guestCount,
        startDate,
        endDate,
      ],
      queryFn: async ({ pageParam }) => {
        if (category === null) category = "";
        const result = await getListings(
          pageParam,
          12,
          category,
          locationValue,
          guestCount,
          startDate,
          endDate,
        );
        return result;
      },
      initialPageParam: initialCursor,
      getNextPageParam: (lastPage) => lastPage?.nextCursor || undefined,
      // We seed the cache with the server-rendered initial data so the first load is instant
      initialData: !isSearch
        ? {
            pages: [{ listings: initialListings, nextCursor: initialCursor }],
            pageParams: [null],
          }
        : undefined,
    });

  // Automatically fetch the next page when the loader enters the viewport
  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (isLoading) {
    return (
      <div className="pt-30 min-h-screen grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {/* Create an array of 12 empty items and map them to skeletons */}
        {[...Array(12)].map((_, i) => (
          <ListingCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  // Flatten the array of pages into a single array of listings
  const allListings = data?.pages.flatMap((page) => page.listings) || [];

  return (
    <>
      <div className="pt-24 min-h-screen grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {allListings.map((listing: any) => (
          <ListingCard key={listing._id} data={listing} />
        ))}
      </div>

      {hasNextPage && (
        <div ref={ref} className="flex justify-center items-center py-12 mt-8">
          <div className="w-8 h-8 border-4 border-rose-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      {!hasNextPage && allListings.length === 0 && (
        <div className="text-center py-12 text-neutral-500 font-medium mt-8">
          No listings found for this category.
        </div>
      )}
    </>
  );
}
