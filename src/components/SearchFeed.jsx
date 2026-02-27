import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import VideoCard from "./VideoCard";
import Shimmer from "./Shimmer";
import { searchVideos } from "../utils/youtube";

export default function SearchFeed() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { searchTerm = "" } = useParams();
  const decodedSearchTerm = decodeURIComponent(searchTerm);

  useEffect(() => {
    async function fetchSearchResults() {
      setLoading(true);
      setError("");
      try {
        const data = await searchVideos({
          query: decodedSearchTerm,
          maxResults: 24,
        });

        setVideos(data.videos);
      } catch (error) {
        setError(error.message || "Failed to load search results.");
      } finally {
        setLoading(false);
      }
    }

    if (decodedSearchTerm) {
      fetchSearchResults();
    }
  }, [decodedSearchTerm]);

  return (
    <div className="min-h-[calc(100vh-74px)] px-4 py-3 text-white sm:px-5 md:px-6">
      <div className="mx-auto w-full max-w-[1600px]">
        <section className="glass-panel mb-5 rounded-3xl p-4 sm:p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-400">
            Search
          </p>
          <h2 className="mt-2 text-xl font-semibold tracking-tight sm:text-3xl title-gradient">
            Results for "{decodedSearchTerm}"
          </h2>
        </section>

        {error && (
          <div className="mb-4 rounded-xl border border-red-400/30 bg-red-500/10 p-3 text-sm text-red-200">
            {error}
          </div>
        )}

        <section className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {loading
            ? Array.from({ length: 8 }).map((_, i) => <Shimmer key={i} />)
            : videos.map((v) => <VideoCard key={v.id} video={v} />)}
        </section>

        {!loading && !videos.length && !error && (
          <p className="mt-8 text-center text-zinc-400">
            No videos found for this search term.
          </p>
        )}
      </div>
    </div>
  );
}

