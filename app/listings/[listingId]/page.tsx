import Image from "next/image";
import { getListingById } from "@/app/actions/getListingById";
import { notFound } from "next/navigation";
import { Heart } from "lucide-react";

interface IParams {
  listingId?: string;
}

interface IListing {
  title: string;
  locationValue: string;
  imageSrc: string[];
  userId: string;
  guestCount: string;
  roomCount: string;
  bathroomCount: string;
  description: string;
  price: string;
}

export async function generateStaticParams() {
  // If we are running locally, skip this entirely to save the server
  if (process.env.NODE_ENV === "development") {
    return [];
  }

  // In production (Vercel), fetch the 100 listings to pre-build the HTML
  try {
    const res = await fetch(
      `${process.env.LISTING_SERVICE_URL}/api/v1/listings?limit=100`,
    );
    const data = await res.json();

    if (!data || !data.data) return [];

    return data.data.map((listing: any) => ({
      listingId: listing._id.toString(),
    }));
  } catch (error) {
    console.error("Failed to generate static params:", error);
    return [];
  }
}

export default async function ListingPage({ params }: { params: IParams }) {
  const { listingId } = await params;

  if (!listingId) return notFound();

  const listing: IListing = await getListingById(listingId);

  if (!listing) return notFound(); // Triggers the Next.js 404 page

  return (
    <div className="max-w-280 mx-auto xl:px-20 md:px-10 sm:px-2 px-4 pt-28 pb-20">
      {/* 1. Header Section */}
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold">{listing.title}</h1>
        <div className="flex flex-row items-center justify-between font-light text-neutral-500">
          <span>{listing.locationValue}</span>
          <button className="flex flex-row items-center gap-2 hover:bg-neutral-100 px-4 py-2 rounded-lg transition">
            <Heart size={18} />
            <span className="underline font-semibold">Save</span>
          </button>
        </div>
      </div>

      {/* 2. Masonry Image Grid */}
      <div className="w-full h-[60vh] overflow-hidden rounded-xl mt-6 relative grid grid-cols-4 grid-rows-2 gap-2">
        {/* Main large image takes up half the grid */}
        <div className="col-span-2 row-span-2 relative">
          <Image
            fill
            unoptimized
            className="object-cover w-full h-full hover:opacity-90 transition cursor-pointer"
            src={listing.imageSrc[0]}
            alt="Main property view"
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
          />
        </div>

        {/* Map through up to 4 smaller images */}
        {listing.imageSrc.slice(1, 5).map((image: string, index: number) => (
          <div key={index} className="col-span-1 row-span-1 relative">
            <Image
              fill
              unoptimized
              className="object-cover w-full h-full hover:opacity-90 transition cursor-pointer"
              src={image}
              alt={`Property view ${index + 2}`}
              sizes="(max-width: 768px) 50vw, 25vw"
            />
          </div>
        ))}
      </div>

      {/* 3. Details & Booking Container */}
      <div className="grid grid-cols-1 md:grid-cols-7 gap-10 mt-8">
        {/* Left Side: Property Information */}
        <div className="col-span-4 flex flex-col gap-8">
          <div className="flex flex-col gap-2 border-b pb-6 border-neutral-200">
            <h2 className="text-xl font-semibold">
              Hosted by User {listing.userId.substring(0, 5)}...
            </h2>
            <div className="flex flex-row items-center gap-4 font-light text-neutral-500">
              <div>{listing.guestCount} guests</div>
              <div>{listing.roomCount} rooms</div>
              <div>{listing.bathroomCount} bathrooms</div>
            </div>
          </div>

          <div className="text-lg font-light text-neutral-500">
            {listing.description}
          </div>
        </div>

        {/* Right Side: The Booking Stub */}
        <div className="col-span-3 order-first md:order-last">
          <div className="bg-white border border-neutral-200 rounded-xl shadow-sm p-6 flex flex-col gap-4 sticky top-28">
            <div className="flex flex-row items-center gap-1 p-2">
              <span className="text-2xl font-bold">${listing.price}</span>
              <span className="font-light text-neutral-600">night</span>
            </div>
            <hr />
            <div className="h-48 bg-neutral-100 rounded-lg flex items-center justify-center text-neutral-400 border border-dashed border-neutral-300">
              Calendar Component Goes Here
            </div>
            <button className="w-full bg-rose-600 text-white rounded-lg py-3 font-semibold hover:bg-rose-700 transition">
              Reserve
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
