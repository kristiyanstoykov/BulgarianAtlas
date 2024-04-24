export default function getCoordinatesFromUrl(googleMapsUrl) {
  // Use URL and URLSearchParams to parse the query. Example: https://www.google.com/maps?q=42.6574441,23.349783
  try {
    const queryParams = new URL(googleMapsUrl).searchParams;
    const coordinates = queryParams.get("q");
    if (coordinates) {
      const parts = coordinates.split(",");
      if (parts.length === 2) {
        const [latitude, longitude] = parts.map(Number);
        if (!isNaN(latitude) && !isNaN(longitude)) {
          return [latitude, longitude];
        }
      }
    }
  } catch (error) {
    // TODO remove this console.error before production
    // console.error("Failed to parse URL or extract coordinates:", error);
  }
  return null;
}
