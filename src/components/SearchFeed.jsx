import { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import VideoCard from "./VideoCard";
import Shimmer from "./Shimmer";
import { searchVideos } from "../utils/youtube";

const SHIMMER_COUNT = 8;

function safeDecodeSearchTerm(value) {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}

export default function SearchFeed() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { searchTerm = "" } = useParams();
  const decodedSearchTerm = safeDecodeSearchTerm(searchTerm);

  const fetchSearchResults = useCallback(async () => {
    if (!decodedSearchTerm) {
      setVideos([]);
      setLoading(false);
      setError("");
      return;
    }

    setLoading(true);
    setError("");
    try {
      const data = await searchVideos({
        query: decodedSearchTerm,
        maxResults: 24,
      });
      setVideos(data.videos);
    } catch (nextError) {
      setError(nextError.message || "Failed to load search results.");
    } finally {
      setLoading(false);
    }
  }, [decodedSearchTerm]);

  useEffect(() => {
    fetchSearchResults();
  }, [fetchSearchResults]);

  return (
    <div className="min-h-[calc(100vh-74px)] px-3 py-3 text-white sm:px-4 md:px-6">
      <div className="mx-auto w-full max-w-[1600px]">
        <div className="mb-6">
          <h1 className="text-3xl font-bold tracking-tight text-white">
            Search Results for "{decodedSearchTerm}"
          </h1>
          <p className="mt-2 text-sm text-zinc-400">
            Showing matching videos, channels, and playlists.
          </p>
        </div>

        {!decodedSearchTerm && (
          <div className="mb-5 rounded-2xl border border-white/10 bg-white/5 p-8 text-center">
            <p className="text-lg font-semibold text-white">Start with a search</p>
            <p className="mt-2 text-sm text-zinc-400">
              Use the top search bar to find videos by topic, channel, or keyword.
            </p>
          </div>
        )}

        {error && (
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-red-400/30 bg-red-500/10 p-4 text-sm text-red-200">
            <span>{error}</span>
            <button
              type="button"
              onClick={fetchSearchResults}
              disabled={loading}
              className="rounded-full border border-red-200/50 bg-red-400/20 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-red-100 transition hover:bg-red-300/30 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Retrying..." : "Retry"}
            </button>
          </div>
        )}

        {!loading && !error && (
          <div className="mb-4 flex items-center justify-between gap-3">
            <h2 className="text-lg font-semibold text-white">
              Matching videos
            </h2>
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-zinc-300">
              {videos.length} results
            </span>
          </div>
        )}

        <p className="sr-only" role="status" aria-live="polite">
          {loading
            ? "Loading search results"
            : error
            ? "Search failed to load"
            : `${videos.length} search results loaded`}
        </p>

        <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {loading
            ? Array.from({ length: SHIMMER_COUNT }).map((_, i) => <Shimmer key={i} />)
            : videos.map((v) => <VideoCard key={v.id} video={v} />)}
        </section>

        {!loading && !videos.length && !error && (
          <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-8 text-center">
            <p className="text-lg font-semibold text-white">No videos found</p>
            <p className="mt-2 text-sm text-zinc-400">
              Try a broader keyword or another creator name.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
