const API_BASE_URL = "https://www.googleapis.com/youtube/v3";
const API_KEY =
  import.meta.env.VITE_YOUTUBE_API_KEY || import.meta.env.VITE_RAPID_API_KEY;

function assertApiKey() {
  if (!API_KEY) {
    throw new Error(
      "Missing YouTube API key. Set VITE_YOUTUBE_API_KEY (or legacy VITE_RAPID_API_KEY) in your .env file.\nSee README for setup instructions."
    );
  }
}

export function mapSearchItem(item) {
  return {
    id: item?.id?.videoId || item?.id || "",
    title: item?.snippet?.title || "Untitled video",
    channel: item?.snippet?.channelTitle || "Unknown channel",
    thumbnail:
      item?.snippet?.thumbnails?.high?.url ||
      item?.snippet?.thumbnails?.medium?.url ||
      item?.snippet?.thumbnails?.default?.url ||
      "",
    publishedAt: item?.snippet?.publishedAt || "",
    description: item?.snippet?.description || "",
  };
}

export async function searchVideos({ query, pageToken = "", maxResults = 12 }) {
  const normalizedQuery = (query || "").trim();
  if (!normalizedQuery) {
    return {
      videos: [],
      nextPageToken: "",
    };
  }

  assertApiKey();
  const params = new URLSearchParams({
    part: "snippet",
    q: normalizedQuery,
    type: "video",
    maxResults: String(maxResults),
    key: API_KEY,
  });

  if (pageToken) {
    params.set("pageToken", pageToken);
  }

  const response = await fetch(`${API_BASE_URL}/search?${params.toString()}`);
  if (!response.ok) {
    let apiMessage = "";
    try {
      const errorBody = await response.json();
      apiMessage = errorBody?.error?.message || "";
    } catch {
      apiMessage = "";
    }

    throw new Error(
      apiMessage || `YouTube request failed: ${response.status}`
    );
  }

  const data = await response.json();
  return {
    videos: dedupeVideosById((data.items || []).map(mapSearchItem).filter((v) => v.id)),
    nextPageToken: data.nextPageToken || "",
  };
}

export function dedupeVideosById(videos) {
  const seen = new Set();
  return videos.filter((video) => {
    if (!video?.id || seen.has(video.id)) {
      return false;
    }
    seen.add(video.id);
    return true;
  });
}

export async function getVideoById(id) {
  assertApiKey();
  const params = new URLSearchParams({
    part: "snippet,statistics",
    id,
    key: API_KEY,
  });

  const response = await fetch(`${API_BASE_URL}/videos?${params.toString()}`);
  if (!response.ok) {
    let apiMessage = "";
    try {
      const errorBody = await response.json();
      apiMessage = errorBody?.error?.message || "";
    } catch {
      apiMessage = "";
    }

    throw new Error(
      apiMessage || `YouTube request failed: ${response.status}`
    );
  }

  const data = await response.json();
  const item = data.items?.[0];
  if (!item) {
    return null;
  }

  return {
    ...mapSearchItem(item),
    views: item.statistics?.viewCount || "",
  };
}
