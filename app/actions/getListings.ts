"use server";

const LISTING_SERVICE_URL = process.env.LISTING_SERVICE_URL;

export async function getListings(
  cursor: string | null = null,
  limit = 12,
  category: string,
  locationValue?: string | null,
  guestCount?: string | null,
  startDate?: string | null,
  endDate?: string | null,
) {
  if (!LISTING_SERVICE_URL) return { listings: [], nextCursor: null };

  try {
    // If a cursor exists, append it to the URL query string
    const url = new URL(`${process.env.LISTING_SERVICE_URL}/api/v1/listings`);

    // 2. Use searchParams.append() to automatically handle all encoding!
    url.searchParams.append("limit", limit.toString());

    if (cursor) url.searchParams.append("cursor", cursor);
    if (category) url.searchParams.append("category", category);
    if (locationValue) url.searchParams.append("locationValue", locationValue);
    if (guestCount) url.searchParams.append("guestCount", guestCount);
    if (startDate) url.searchParams.append("startDate", startDate);
    if (endDate) url.searchParams.append("endDate", endDate);

    const response = await fetch(url, { method: "GET" });

    if (!response.ok) throw new Error("Network response was not ok");

    const result = await response.json();

    return {
      listings: result.data || [],
      nextCursor: result.nextCursor || null,
    };
  } catch (error: any) {
    console.error("Failed to fetch cursor listings:", error);
    return { listings: [], nextCursor: null };
  }
}
