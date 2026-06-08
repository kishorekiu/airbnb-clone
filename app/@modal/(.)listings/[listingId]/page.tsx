import { getListingById } from "@/app/actions/getListingById";
import { notFound } from "next/navigation";
import Modal from "@/components/Modal";
import Image from "next/image";
import { Heart } from "lucide-react";

interface IParams {
  listingId?: string;
}

export default async function ListingModalPage({
  params,
}: {
  params: IParams;
}) {
  const { listingId } = await params;

  if (!listingId) return notFound();

  const listing = await getListingById(listingId);

  if (!listing) return notFound();

  return (
    <Modal>
      <div className="w-full mx-auto px-4 sm:px-8 py-10">
        {/* Header Section */}
        <div className="flex flex-col gap-2 pl-12">
          <h1 className="text-3xl font-bold">{listing.title}</h1>
          <div className="flex flex-row items-center justify-between font-light text-neutral-500">
            <span>{listing.locationValue}</span>
            <button className="flex flex-row items-center gap-2 hover:bg-neutral-100 px-4 py-2 rounded-lg transition">
              <Heart size={18} />
              <span className="underline font-semibold">Save</span>
            </button>
          </div>
        </div>

        {/* Masonry Image Grid */}
        <div className="w-full h-[50vh] overflow-hidden rounded-xl mt-6 relative grid grid-cols-4 grid-rows-2 gap-2">
          <div className="col-span-2 row-span-2 relative">
            <Image
              fill
              unoptimized
              className="object-cover w-full h-full"
              src={listing.imageSrc[0]}
              alt="Main view"
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          {listing.imageSrc.slice(1, 5).map((image: string, index: number) => (
            <div key={index} className="col-span-1 row-span-1 relative">
              <Image
                fill
                unoptimized
                className="object-cover w-full h-full"
                src={image}
                alt={`View ${index + 2}`}
                sizes="25vw"
              />
            </div>
          ))}
        </div>

        {/* Details Section */}
        <div className="grid grid-cols-1 md:grid-cols-7 gap-10 mt-8">
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

          <div className="col-span-3">
            {/* Simple booking stub for now */}
            <div className="bg-white border border-neutral-200 rounded-xl shadow-sm p-6 flex flex-col gap-4">
              <div className="text-2xl font-bold">
                ${listing.price}{" "}
                <span className="font-light text-sm text-neutral-600">
                  night
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}
