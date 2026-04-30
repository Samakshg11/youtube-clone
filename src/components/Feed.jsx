import { useCallback, useEffect, useRef, useState } from "react";
import VideoCard from "./VideoCard";
import Shimmer from "./Shimmer";
import SideBar from "./SideBar";
import { dedupeVideosById, searchVideos } from "../utils/youtube";
import { getCategoryById } from "../utils/categories";

const INITIAL_SHIMMER_COUNT = 8;
const PAGINATION_SHIMMER_COUNT = 4;
const PAGE_SIZE = 12;

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
  const categoryMeta = getCategoryById(selectedCategory);

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
    if (!sentinelRef.current || !pageToken || !hasMore || loading || loadingMore) {
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
  }, [fetchVideos, hasMore, loading, loadingMore, pageToken]);

  return (
    <div className="min-h-[calc(100vh-74px)] px-3 pb-8 text-white sm:px-4">
      <div className="mx-auto flex w-full max-w-[1600px] flex-col md:flex-row">
        <SideBar
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />

        <main className="flex-1 px-1 pb-6 sm:px-2 md:px-6">
          <div className="soft-panel hero-ring mb-5 overflow-hidden rounded-[32px] p-5 sm:p-7">
            <div className="absolute inset-y-0 right-0 hidden w-1/3 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.15),transparent_58%)] lg:block" />
            <p className="section-label">Discover</p>
            <div className="relative mt-3 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-2xl">
                <h2 className="text-2xl font-semibold tracking-tight sm:text-4xl title-gradient">
                  {categoryMeta.label} Videos
                </h2>
                <p className="mt-3 max-w-xl text-sm leading-6 text-zinc-300 sm:text-base">
                  {categoryMeta.blurb}. Curated scroll-worthy picks with a cleaner
                  layout, calmer spacing, and quicker access to what you want to
                  watch next.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <span className="rounded-full border border-white/15 bg-black/25 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-zinc-200">
                  {videos.length} loaded
                </span>
                <span className="rounded-full border border-white/10 bg-white/6 px-4 py-2 text-xs font-medium text-zinc-300">
                  Infinite scroll ready
                </span>
              </div>
            </div>
          </div>

          <div className="mb-5 grid gap-3 sm:grid-cols-3">
            <div className="soft-panel rounded-2xl p-4">
              <p className="section-label">Mood</p>
              <p className="mt-2 text-base font-semibold text-white">Focused browsing</p>
            </div>
            <div className="soft-panel rounded-2xl p-4">
              <p className="section-label">Category</p>
              <p className="mt-2 text-base font-semibold text-white">{categoryMeta.label}</p>
            </div>
            <div className="soft-panel rounded-2xl p-4">
              <p className="section-label">Status</p>
              <p className="mt-2 text-base font-semibold text-white">
                {loading ? "Loading feed" : "Ready to explore"}
              </p>
            </div>
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

          <div className="mb-4 flex items-center justify-between gap-3">
            <h3 className="text-sm font-semibold uppercase tracking-[0.22em] text-zinc-400">
              Fresh picks
            </h3>
            <span className="text-xs text-zinc-500">
              Scroll to load more
            </span>
          </div>

          <p className="sr-only" role="status" aria-live="polite">
            {loading
              ? "Loading videos"
              : loadingMore
              ? "Loading more videos"
              : `Showing ${videos.length} videos`}
          </p>

          <section
            aria-busy={loading || loadingMore}
            className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
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
            <div className="soft-panel mt-8 rounded-3xl p-8 text-center">
              <p className="text-lg font-semibold text-white">Nothing surfaced yet</p>
              <p className="mt-2 text-sm text-zinc-400">
                Try another category to pull in a different mix of videos.
              </p>
            </div>
          )}

          {!loading && videos.length > 0 && !hasMore && (
            <p className="mt-8 text-center text-sm text-zinc-500">
              You have reached the end of this category.
            </p>
          )}

          <div ref={sentinelRef} aria-hidden="true" className="h-4" />
        </main>
      </div>
    </div>
  );
}
