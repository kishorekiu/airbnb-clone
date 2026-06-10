export default function ListingCardSkeleton() {
  return (
    <div className="col-span-1 flex flex-col gap-2 w-full animate-pulse">
      {/* Image Carousel Ghost */}
      <div className="aspect-square w-full bg-neutral-200 rounded-xl"></div>

      {/* Location Text Ghost */}
      <div className="h-5 w-3/4 bg-neutral-200 rounded-md mt-1"></div>

      {/* Category Text Ghost */}
      <div className="h-4 w-1/2 bg-neutral-200 rounded-md"></div>

      {/* Price Text Ghost */}
      <div className="flex flex-row items-center gap-2 mt-1">
        <div className="h-5 w-1/4 bg-neutral-200 rounded-md"></div>
        <div className="h-5 w-1/4 bg-neutral-200 rounded-md"></div>
      </div>
    </div>
  );
}
