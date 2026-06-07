"use server";

const LISTING_SERVICE_URL = process.env.LISTING_SERVICE_URL;

export async function getListings(page = 1, limit = 12) {
  if (!LISTING_SERVICE_URL) {
    console.error(
      "LISTING_SERVICE_URL is not defined in environment variables.",
    );
    return [];
  }

  try {
    const apiUrl = `${LISTING_SERVICE_URL}/api/v1/listings?page=${page}&limit=${limit}`;

    const response = await fetch(apiUrl, { method: "GET" });

    if (!response.ok) {
      throw new Error(
        `Failed to fetch listings: ${response.status} ${response.statusText}`,
      );
    }

    const result = await response.json();
    return result.data;
  } catch (error: any) {
    console.error("Failed to fetch listings from microservice:", error);
    return [];
  }
}
