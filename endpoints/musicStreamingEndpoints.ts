import Constants from "expo-constants";
import { authInstance } from "@/utils/apiService";

/**
 * Get the base URL for API calls
 * Uses the same logic as your main axios config
 */
function getBaseUrl() {
  if (__DEV__) {
    // Development: resolve IP from Expo dev server
    const debuggerHost = Constants.expoConfig?.hostUri?.split(":")[0];
    if (debuggerHost) {
      return `http://${debuggerHost}:5000/api`;
    }
    // fallback
    return "http://localhost:5000/api";
  } else {
    // Production
    return (
      process.env.EXPO_PUBLIC_BASE_URL || "https://api.artisteradar.com/api"
    );
  }
}

/**
 * Extract YouTube audio URL from video ID
 */
export const getYouTubeAudioUrl = async (videoId: string) => {
  try {
    const baseUrl = getBaseUrl();
    const url = `${baseUrl}/music-streaming/youtube-audio?videoId=${videoId}`;

    console.log("🎥 Fetching YouTube audio from:", url);

    const response = await authInstance.get(
      `/music-streaming/youtube-audio?videoId=${videoId}`
    );

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


//  * Extract Spotify audio URL from track ID

export const getSpotifyAudioUrl = async (trackId: string) => {
  try {
    const baseUrl = getBaseUrl();
    const url = `${baseUrl}/music-streaming/spotify-audio-full?trackId=${trackId}`;

    console.log("🎵 Fetching Spotify audio from:", url);

    const response = await authInstance.get(
      `/music-streaming/spotify-audio-full?trackId=${trackId}`
    );

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


//  Process any music URL and return playable audio URL
export const processMusicUrl = async (
  url: string,
  urlType: "youtube" | "spotify" | "direct" | "unknown"
) => {
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

// Helper functions (same as before but included here for convenience)
function extractYouTubeVideoId(url: string): string | null {
  if (!url) return null;

  try {
    url = url.trim();
    let match = url.match(/[?&]v=([^&#]+)/);
    if (match && match[1]) return match[1];

    match = url.match(/youtu\.be\/([^?&#]+)/);
    if (match && match[1]) return match[1];

    match = url.match(/youtube\.com\/embed\/([^?&#]+)/);
    if (match && match[1]) return match[1];

    match = url.match(/youtube\.com\/v\/([^?&#]+)/);
    if (match && match[1]) return match[1];

    return null;
  } catch (error) {
    console.error("Error extracting YouTube video ID:", error);
    return null;
  }
}

function extractSpotifyTrackId(url: string): string | null {
  if (!url) return null;

  try {
    url = url.trim();
    let match = url.match(/track\/([a-zA-Z0-9]{22})/);
    if (match && match[1]) return match[1];

    match = url.match(/spotify:track:([a-zA-Z0-9]{22})/);
    if (match && match[1]) return match[1];

    return null;
  } catch (error) {
    console.error("Error extracting Spotify track ID:", error);
    return null;
  }
}
