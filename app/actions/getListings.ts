"use server";

const LISTING_SERVICE_URL = process.env.LISTING_SERVICE_URL;

export async function getListings(
  cursor: string | null = null,
  limit = 12,
  category: string,
) {
  if (!LISTING_SERVICE_URL) return { listings: [], nextCursor: null };

  try {
    // If a cursor exists, append it to the URL query string
    const cursorParam = cursor ? `&cursor=${cursor}` : "";
    const categoryParam = category ? `&category=${category}` : "";
    const apiUrl = `${LISTING_SERVICE_URL}/api/v1/listings?limit=${limit}${cursorParam}${categoryParam}`;

    const response = await fetch(apiUrl, { method: "GET" });

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
