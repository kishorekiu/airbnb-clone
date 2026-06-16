import { getListings } from "@/app/actions/getListings";
import InfiniteFeed from "@/components/listings/InfiniteFeed";

interface HomeProps {
  searchParams: Promise<{
    category?: string;
    locationValue?: string;
    guestCount?: string;
    startDate?: string;
    endDate?: string;
  }>;
}

// Make the Home page an async Server Component
export default async function Home({ searchParams }: HomeProps) {
  const params = await searchParams;
  // 1. Fetch the first 12 listings directly on the server
  const initialData = await getListings(
    null,
    12,
    params.category || "",
    params.locationValue || null,
    params.guestCount || null,
    params.startDate || null,
    params.endDate || null,
  );

  // If the database is entirely empty
  if (initialData.listings.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh]">
        <h2 className="text-2xl font-bold">No exact matches</h2>
        <p className="text-neutral-500 mt-2">
          Try changing or removing some of your filters.
        </p>
      </div>
    );
  }

  // 2. Pass the initial array to the Client component
  return (
    <div className="max-w-630 mx-auto xl:px-20 md:px-10 sm:px-2 px-4 pb-20">
      <InfiniteFeed
        initialListings={initialData.listings}
        initialCursor={initialData.nextCursor}
      />
    </div>
  );
}
