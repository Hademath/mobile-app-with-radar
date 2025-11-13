import { authInstance } from "@/utils/apiService";

/**
 * Determine URL type from a given URL string
 */
export const getUrlType = ( url: string ): "youtube" | "spotify" | "direct" | "unknown" => {
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
 * - https://youtu.be/VIDEO_ID
 * - https://www.youtube.com/embed/VIDEO_ID
 * - https://www.youtube.com/v/VIDEO_ID
 */
export const extractYouTubeVideoId = (url: string): string | null => {
  if (!url) return null;

  try {
    url = url.trim();
    // Pattern 1: youtube.com/watch?v=VIDEO_ID
    let match = url.match(/[?&]v=([^&#]+)/);
    if (match && match[1]) return match[1];

    // Pattern 2: youtu.be/VIDEO_ID
    match = url.match(/youtu\.be\/([^?&#]+)/);
    if (match && match[1]) return match[1];

    // Pattern 3: youtube.com/embed/VIDEO_ID
    match = url.match(/youtube\.com\/embed\/([^?&#]+)/);
    if (match && match[1]) return match[1];

    // Pattern 4: youtube.com/v/VIDEO_ID
    match = url.match(/youtube\.com\/v\/([^?&#]+)/);
    if (match && match[1]) return match[1];

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
export const extractSpotifyTrackId = (url: string): string | null => {
  if (!url) return null;

  try {
    url = url.trim();

    // Pattern 1: open.spotify.com/track/TRACK_ID
    let match = url.match(/track\/([a-zA-Z0-9]{22})/);
    if (match && match[1]) return match[1];

    // Pattern 2: spotify:track:TRACK_ID
    match = url.match(/spotify:track:([a-zA-Z0-9]{22})/);
    if (match && match[1]) return match[1];

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
  return extractYouTubeVideoId(url) !== null;
};

/**
 * Validate if a URL is a valid Spotify URL
 */
export const isValidSpotifyUrl = (url: string): boolean => {
  return extractSpotifyTrackId(url) !== null;
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

/**
 * Extract YouTube audio URL from video ID
 */
export const getYouTubeAudioUrl = async (videoId: string) => {
  try {
    console.log("🎥 Fetching YouTube audio for videoId:", videoId);

    const response = await authInstance.get(`/music-streaming/youtube-audio?videoId=${videoId}` );

    console.log("✅ YouTube Response:", response.data);

    if (response.data.status && response.data.data?.audioUrl) {
      return {
        success: true,
        data: response.data.data,
      };
    } else {
      return {
        success: false,
        error: response.data.message || "Failed to extract YouTube audio",
      };
    }
  } catch (error: any) {
    console.error("❌ YouTube API Error:", error);
    return {
      success: false,
      error: error.response?.data?.message || error.message || "Network error",
    };
  }
};

/**
 * Extract Spotify audio URL from track ID
 */
export const getSpotifyAudioUrl = async (trackId: string) => {
  try {
    console.log("🎵 Fetching Spotify audio for trackId:", trackId);

    const response = await authInstance.get(`/music-streaming/spotify-audio-full?trackId=${trackId}` );

    console.log("✅ Spotify Response:", response.data);

    if (response.data.status && response.data.data?.audioUrl) {
      return {
        success: true,
        data: response.data.data,
      };
    } else {
      return {
        success: false,
        error: response.data.message || "Failed to get Spotify track",
      };
    }
  } catch (error: any) {
    console.error("❌ Spotify API Error:", error);
    return {
      success: false,
      error: error.response?.data?.message || error.message || "Network error",
    };
  }
};

/**
 * Process any music URL and return playable audio URL
 */
export const processMusicUrl = async ( url: string, urlType: "youtube" | "spotify" | "direct" | "unknown" ) => {
  try {
    if (urlType === "youtube") {
      const videoId = extractYouTubeVideoId(url);
      if (!videoId) {
        return {
          success: false,
          error: "Invalid YouTube URL",
        };
      }
      return await getYouTubeAudioUrl(videoId);
    } else if (urlType === "spotify") {
      const trackId = extractSpotifyTrackId(url);
      if (!trackId) {
        return {
          success: false,
          error: "Invalid Spotify URL",
        };
      }
      return await getSpotifyAudioUrl(trackId);
    } else if (urlType === "direct") {
      return {
        success: true,
        data: {
          audioUrl: url,
          title: "Direct Audio",
        },
      };
    } else {
      return {
        success: false,
        error: "Unsupported URL type",
      };
    }
  } catch (error: any) {
    console.error("❌ Process Music URL Error:", error);
    return {
      success: false,
      error: error.message || "Failed to process music URL",
    };
  }
};
