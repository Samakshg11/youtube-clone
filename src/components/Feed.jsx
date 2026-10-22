import { useCallback, useEffect, useRef, useState } from "react";
import VideoCard from "./VideoCard";
import Shimmer from "./Shimmer";
import SideBar from "./SideBar";
import { dedupeVideosById, searchVideos } from "../utils/youtube";
import { getCategoryById } from "../utils/categories";

const INITIAL_SHIMMER_COUNT = 8;
const PAGINATION_SHIMMER_COUNT = 4;
const PAGE_SIZE = 12;

function getFeedStatusMessage({ loading, loadingMore, count }) {
  if (loading) {
    return "Loading videos";
  }

  if (loadingMore) {
    return "Loading more videos";
  }

  return `Showing ${count} videos`;
}

export default function Feed() {
  const [videos, setVideos] = useState([]);
  const [pageToken, setPageToken] = useState("");
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Trending");
  const sentinelRef = useRef(null);
  const inflightTokenRef = useRef("");
  const requestIdRef = useRef(0);
  const statusMessage = getFeedStatusMessage({ loading, loadingMore, count: videos.length });
  const categoryMeta = getCategoryById(selectedCategory);
  const supportsIntersectionObserver =
    typeof window !== "undefined" && "IntersectionObserver" in window;

  const fetchVideos = useCallback(
    async (token = "") => {
      const isFirstPage = !token;
      const requestId = requestIdRef.current + 1;
      requestIdRef.current = requestId;
      if (!isFirstPage && inflightTokenRef.current === token) {
        return;
      }

      inflightTokenRef.current = token;
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
          maxResults: PAGE_SIZE,
        });

        if (requestId === requestIdRef.current) {
          setVideos((prev) =>
            isFirstPage ? data.videos : dedupeVideosById([...prev, ...data.videos])
          );
          const nextToken = data.nextPageToken || "";
          setPageToken(nextToken);
          setHasMore(Boolean(nextToken));
        }
      } catch (err) {
        if (requestId === requestIdRef.current) {
          setError(err.message || "Unable to load videos.");
        }
      } finally {
        if (requestId === requestIdRef.current) {
          inflightTokenRef.current = "";
          setLoading(false);
          setLoadingMore(false);
        }
      }
    },
    [selectedCategory]
  );

  useEffect(() => {
    fetchVideos();
  }, [fetchVideos]);

  useEffect(() => {
    if (
      !supportsIntersectionObserver ||
      !sentinelRef.current ||
      !pageToken ||
      !hasMore ||
      loading ||
      loadingMore
    ) {
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
  }, [fetchVideos, hasMore, loading, loadingMore, pageToken, supportsIntersectionObserver]);

  return (
    <div className="min-h-[calc(100vh-74px)] px-3 pb-8 text-white sm:px-4">
      <div className="mx-auto flex w-full max-w-[1600px] flex-col md:flex-row">
        <SideBar
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />

        <main className="flex-1 px-1 pb-6 sm:px-2 md:px-6">
          <div className="mb-6">
            <h1 className="text-3xl font-bold tracking-tight text-white">
              {categoryMeta.label} Videos
            </h1>
            <p className="mt-2 text-sm text-zinc-400">
              {categoryMeta.blurb}
            </p>
          </div>

          {error && (
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-red-400/30 bg-red-500/10 p-4 text-sm text-red-200">
              <span>{error}</span>
              <button
                type="button"
                onClick={() => fetchVideos()}
                disabled={loading || loadingMore}
                className="rounded-full border border-red-200/50 bg-red-400/20 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-red-100 transition hover:bg-red-300/30"
              >
                {loading || loadingMore ? "Retrying..." : "Retry"}
              </button>
            </div>
          )}

          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-white">
              {loading ? "Loading..." : `${videos.length} Videos`}
            </h2>
            <span className="text-sm text-zinc-400">
              {loading ? "" : `Scroll to load more`}
            </span>
          </div>

          <p className="sr-only" role="status" aria-live="polite">
            {statusMessage}
          </p>

          <section
            aria-busy={loading || loadingMore}
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          >
            {loading
              ? Array.from({ length: INITIAL_SHIMMER_COUNT }).map((_, i) => (
                  <Shimmer key={i} />
                ))
              : videos.map((v) => <VideoCard key={v.id} video={v} />)}

            {loadingMore &&
              Array.from({ length: PAGINATION_SHIMMER_COUNT }).map((_, i) => (
                <Shimmer key={`more-${i}`} />
              ))}
          </section>

          {!loading && !videos.length && !error && (
            <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-8 text-center">
              <p className="text-lg font-semibold text-white">No videos found</p>
              <p className="mt-2 text-sm text-zinc-400">
                Try another category or search for something else.
              </p>
            </div>
          )}

          {!loading && videos.length > 0 && !hasMore && (
            <p className="mt-8 text-center text-sm text-zinc-500">
              You've reached the end of this category.
            </p>
          )}

          {!loading && hasMore && !supportsIntersectionObserver && (
            <div className="mt-8 flex justify-center">
              <button
                type="button"
                onClick={() => fetchVideos(pageToken)}
                disabled={loadingMore}
                className="rounded-full border border-white/20 bg-white/10 px-5 py-2 text-sm font-medium text-zinc-100 transition hover:bg-white/15 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loadingMore ? "Loading..." : "Load more"}
              </button>
            </div>
          )}

          <div ref={sentinelRef} aria-hidden="true" className="h-4" />
        </main>
      </div>
    </div>
  );
}
