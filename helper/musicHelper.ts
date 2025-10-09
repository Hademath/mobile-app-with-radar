// Helper function to detect and process URL type
export const getUrlType = (
  url: string
): "youtube" | "spotify" | "direct" | "unknown" => {
  if (!url) return "unknown";

  const lowerUrl = url.toLowerCase();
  if (lowerUrl.includes("youtube.com") || lowerUrl.includes("youtu.be")) {
    return "youtube";
  }
  if (lowerUrl.includes("spotify.com")) {
    return "spotify";
  }
  // Check for direct audio file extensions or known CDN services
  if (
    lowerUrl.match(/\.(mp3|wav|m4a|aac|ogg|flac)(\?|$)/i) ||
    lowerUrl.includes("cloudinary.com") ||
    lowerUrl.includes("res.cloudinary") ||
    lowerUrl.includes("amazonaws.com") ||
    lowerUrl.includes("storage.googleapis.com")
  ) {
    return "direct";
  }
  return "direct"; // Default to direct for other URLs
};

// Helper to extract YouTube video ID
export const getYouTubeVideoId = (url: string): string | null => {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
    /youtube\.com\/watch\?.*v=([^&\n?#]+)/,
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match && match[1]) {
      return match[1];
    }
  }
  return null;
};

// Helper to extract Spotify track ID
export const getSpotifyTrackId = (url: string): string | null => {
  const match = url.match(/track\/([a-zA-Z0-9]+)/);
  return match ? match[1] : null;
};
