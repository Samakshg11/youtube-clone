import { useCallback, useEffect, useRef, useState } from "react";
import VideoCard from "./VideoCard";
import Shimmer from "./Shimmer";
import SideBar from "./SideBar";
import { searchVideos } from "../utils/youtube";

export default function Feed() {
  const [videos, setVideos] = useState([]);
  const [pageToken, setPageToken] = useState("");
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Trending");
  const sentinelRef = useRef(null);

  const fetchVideos = useCallback(
    async (token = "") => {
      const isFirstPage = !token;
      if (isFirstPage) {
        setLoading(true);
      } else {
        setLoadingMore(true);
      }

      setError("");
      try {
        const data = await searchVideos({
          query: selectedCategory,
          pageToken: token,
          maxResults: 12,
        });

        setVideos((prev) =>
          isFirstPage ? data.videos : [...prev, ...data.videos]
        );
        setPageToken(data.nextPageToken || "");
      } catch (err) {
        setError(err.message || "Unable to load videos right now.");
      } finally {
        setLoading(false);
        setLoadingMore(false);
      }
    },
    [selectedCategory]
  );

  useEffect(() => {
    fetchVideos();
  }, [fetchVideos]);

  useEffect(() => {
    if (!sentinelRef.current || !pageToken || loading || loadingMore) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const first = entries[0];
        if (first.isIntersecting) {
          fetchVideos(pageToken);
        }
      },
      { rootMargin: "320px" }
    );

    observer.observe(sentinelRef.current);
    return () => observer.disconnect();
  }, [fetchVideos, loading, loadingMore, pageToken]);

  return (
    <div className="min-h-[calc(100vh-74px)] text-white">
      <div className="mx-auto flex w-full max-w-[1600px] flex-col md:flex-row">
        <SideBar
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />

        <main className="flex-1 px-4 pb-6 sm:px-5 md:px-6">
          <div className="glass-panel mb-5 rounded-3xl p-4 sm:p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-400">
              Discover
            </p>
            <div className="mt-2 flex items-center justify-between gap-3">
              <h2 className="text-xl font-semibold tracking-tight sm:text-3xl title-gradient">
                {selectedCategory} Videos
              </h2>
              <span className="rounded-full border border-white/15 bg-black/30 px-3 py-1 text-xs text-zinc-300">
                {videos.length} loaded
              </span>
            </div>
          </div>

          {error && (
            <div className="mb-4 rounded-xl border border-red-400/30 bg-red-500/10 p-3 text-sm text-red-200">
              {error}
            </div>
          )}

          <section className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {loading
              ? Array.from({ length: 8 }).map((_, i) => <Shimmer key={i} />)
              : videos.map((v) => <VideoCard key={v.id} video={v} />)}

            {loadingMore &&
              Array.from({ length: 4 }).map((_, i) => (
                <Shimmer key={`more-${i}`} />
              ))}
          </section>

          {!loading && !videos.length && !error && (
            <p className="mt-8 text-center text-zinc-400">
              No videos found for this category.
            </p>
          )}

          <div ref={sentinelRef} className="h-4" />
        </main>
      </div>
    </div>
  );
}
