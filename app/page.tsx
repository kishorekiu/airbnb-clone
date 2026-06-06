import { getListings } from "@/app/actions/getListings";
import InfiniteFeed from "@/components/listings/InfiniteFeed";

// Make the Home page an async Server Component
export default async function Home() {
  // 1. Fetch the first 12 listings directly on the server
  const initialListings = await getListings(1, 12);

  // If the database is entirely empty
  if (initialListings.length === 0) {
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
      <InfiniteFeed initialListings={initialListings} />
    </div>
  );
}
