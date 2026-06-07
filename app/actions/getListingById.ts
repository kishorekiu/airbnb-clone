"use server";

const LISTING_SERVICE_URL = process.env.LISTING_SERVICE_URL;

export async function getListingById(listingId: string) {
  try {
    const response = await fetch(
      `${LISTING_SERVICE_URL}/api/v1/listings/${listingId}`,
      { next: { revalidate: 60 } },
    );
    if (!response.ok) {
      return null;
    }
    const result = await response.json();
    return result.data;
  } catch (e) {
    console.error("Failed to fetch listing by ID:", e);
    return null;
  }
}
