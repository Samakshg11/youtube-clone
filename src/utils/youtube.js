const API_BASE_URL = "https://www.googleapis.com/youtube/v3";
const API_KEY =
  import.meta.env.VITE_YOUTUBE_API_KEY || import.meta.env.VITE_RAPID_API_KEY;

function assertApiKey() {
  if (!API_KEY) {
    throw new Error(
      "Missing YouTube API key. Set VITE_YOUTUBE_API_KEY in your .env file."
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
  assertApiKey();
  const params = new URLSearchParams({
    part: "snippet",
    q: query,
    type: "video",
    maxResults: String(maxResults),
    key: API_KEY,
  });

  if (pageToken) {
    params.set("pageToken", pageToken);
  }

  const response = await fetch(`${API_BASE_URL}/search?${params.toString()}`);
  if (!response.ok) {
    throw new Error(`YouTube request failed: ${response.status}`);
  }

  const data = await response.json();
  return {
    videos: (data.items || []).map(mapSearchItem).filter((v) => v.id),
    nextPageToken: data.nextPageToken || "",
  };
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
    throw new Error(`YouTube request failed: ${response.status}`);
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
