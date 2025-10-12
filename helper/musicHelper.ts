// @/helper/musicHelper.ts

/**
 * Detect the type of music URL
 */
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

/**
 * Extract YouTube video ID from various URL formats
 * Handles:
 * - https://www.youtube.com/watch?v=VIDEO_ID
 * - https://www.youtube.com/watch?v=VIDEO_ID&list=PLAYLIST_ID
 * - https://youtu.be/VIDEO_ID
 * - https://www.youtube.com/embed/VIDEO_ID
 */
export const getYouTubeVideoId = (url: string): string | null => {
  if (!url) return null;

  try {
    // Remove any whitespace
    url = url.trim();

    // Pattern 1: youtube.com/watch?v=VIDEO_ID (with or without additional parameters)
    let match = url.match(/[?&]v=([^&#]+)/);
    if (match && match[1]) {
      return match[1];
    }

    // Pattern 2: youtu.be/VIDEO_ID
    match = url.match(/youtu\.be\/([^?&#]+)/);
    if (match && match[1]) {
      return match[1];
    }

    // Pattern 3: youtube.com/embed/VIDEO_ID
    match = url.match(/youtube\.com\/embed\/([^?&#]+)/);
    if (match && match[1]) {
      return match[1];
    }

    // Pattern 4: youtube.com/v/VIDEO_ID
    match = url.match(/youtube\.com\/v\/([^?&#]+)/);
    if (match && match[1]) {
      return match[1];
    }

    console.warn("Could not extract YouTube video ID from:", url);
    return null;
  } catch (error) {
    console.error("Error extracting YouTube video ID:", error);
    return null;
  }
};

/**
 * Extract Spotify track ID from various URL formats
 * Handles:
 * - https://open.spotify.com/track/TRACK_ID
 * - spotify:track:TRACK_ID
 */
export const getSpotifyTrackId = (url: string): string | null => {
  if (!url) return null;

  try {
    url = url.trim();

    // Pattern 1: open.spotify.com/track/TRACK_ID
    let match = url.match(/track\/([a-zA-Z0-9]{22})/);
    if (match && match[1]) {
      return match[1];
    }

    // Pattern 2: spotify:track:TRACK_ID
    match = url.match(/spotify:track:([a-zA-Z0-9]{22})/);
    if (match && match[1]) {
      return match[1];
    }

    console.warn("Could not extract Spotify track ID from:", url);
    return null;
  } catch (error) {
    console.error("Error extracting Spotify track ID:", error);
    return null;
  }
};

/**
 * Validate if a URL is a valid YouTube URL
 */
export const isValidYouTubeUrl = (url: string): boolean => {
  return getYouTubeVideoId(url) !== null;
};

/**
 * Validate if a URL is a valid Spotify URL
 */
export const isValidSpotifyUrl = (url: string): boolean => {
  return getSpotifyTrackId(url) !== null;
};

/**
 * Get clean YouTube URL from video ID
 */
export const getCleanYouTubeUrl = (videoId: string): string => {
  return `https://www.youtube.com/watch?v=${videoId}`;
};   

/**
 * Get clean Spotify URL from track ID
 */
export const getCleanSpotifyUrl = (trackId: string): string => {
  return `https://open.spotify.com/track/${trackId}`;
};
