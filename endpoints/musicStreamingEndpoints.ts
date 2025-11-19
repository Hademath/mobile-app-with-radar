import { extractSpotifyTrackId, extractYouTubeVideoId } from "@/helper/musicHelper";
import { authInstance } from "@/utils/apiService";

/**
 * Extract YouTube audio URL from video ID
 */
export const getYouTubeAudioUrl = async (videoId: string) => {
  try {
    // console.log("🎥 Fetching YouTube audio for videoId:", videoId);

    const response = await authInstance.get( `/music-streaming/youtube-audio?videoId=${videoId}` );

    // console.log("✅ YouTube Response:", response.data);

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

