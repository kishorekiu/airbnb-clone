export default function LoadingListing() {
  return (
    <div className="max-w-280 mx-auto xl:px-20 md:px-10 sm:px-2 px-4 pt-28 pb-20">
      {/* Back Button Skeleton */}
      <div className="flex flex-row items-center gap-2 mb-6 animate-pulse mt-2">
        {/* The Chevron Icon Ghost */}
        <div className="w-6 h-6 bg-neutral-200 rounded-full"></div>
        {/* The "Back to listings" Text Ghost */}
        <div className="h-5 w-28 bg-neutral-200 rounded-md"></div>
      </div>
      {/* 1. Header Skeleton */}
      <div className="flex flex-col gap-2 animate-pulse">
        <div className="h-8 w-1/3 bg-neutral-200 rounded-lg"></div>
        <div className="flex flex-row items-center justify-between mt-2">
          <div className="h-4 w-1/4 bg-neutral-200 rounded"></div>
          <div className="h-8 w-20 bg-neutral-200 rounded-lg"></div>
        </div>
      </div>

      {/* 2. Masonry Image Grid Skeleton */}
      <div className="w-full h-[60vh] overflow-hidden rounded-xl mt-6 relative grid grid-cols-4 grid-rows-2 gap-2 animate-pulse">
        {/* Main large image skeleton */}
        <div className="col-span-2 row-span-2 bg-neutral-200"></div>
        {/* 4 smaller image skeletons */}
        <div className="col-span-1 row-span-1 bg-neutral-200"></div>
        <div className="col-span-1 row-span-1 bg-neutral-200"></div>
        <div className="col-span-1 row-span-1 bg-neutral-200"></div>
        <div className="col-span-1 row-span-1 bg-neutral-200"></div>
      </div>

      {/* 3. Details & Booking Container Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-7 gap-10 mt-8">
        {/* Left Side: Property Information Skeleton */}
        <div className="col-span-4 flex flex-col gap-8 animate-pulse">
          <div className="flex flex-col gap-4 border-b pb-6 border-neutral-200">
            <div className="h-6 w-1/2 bg-neutral-200 rounded-lg"></div>
            <div className="flex flex-row items-center gap-4">
              <div className="h-4 w-16 bg-neutral-200 rounded"></div>
              <div className="h-4 w-16 bg-neutral-200 rounded"></div>
              <div className="h-4 w-16 bg-neutral-200 rounded"></div>
            </div>
          </div>

          <div className="flex flex-col gap-2 mt-4">
            <div className="h-4 w-full bg-neutral-200 rounded"></div>
            <div className="h-4 w-11/12 bg-neutral-200 rounded"></div>
            <div className="h-4 w-4/5 bg-neutral-200 rounded"></div>
            <div className="h-4 w-full bg-neutral-200 rounded"></div>
            <div className="h-4 w-3/4 bg-neutral-200 rounded"></div>
          </div>
        </div>

        {/* Right Side: The Booking Stub Skeleton */}
        <div className="col-span-3 order-first md:order-last animate-pulse">
          <div className="bg-white border border-neutral-200 rounded-xl shadow-sm p-6 flex flex-col gap-4 sticky top-28">
            <div className="h-8 w-1/3 bg-neutral-200 rounded-lg"></div>
            <hr />
            <div className="h-48 bg-neutral-200 rounded-lg"></div>
            <div className="h-12 w-full bg-neutral-200 rounded-lg mt-2"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
