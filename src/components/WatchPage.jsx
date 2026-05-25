import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { saveToHistory } from "../utils/history";
import { formatPublishedDate, formatViewCount } from "../utils/formatters";
import { getVideoById } from "../utils/youtube";

export default function WatchPage() {
  const { id } = useParams();
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) {
      setVideo(null);
      setError("Missing video id.");
      setLoading(false);
      return;
    }

    let ignore = false;

    async function fetchVideoDetails() {
      setLoading(true);
      setError("");
      try {
        const details = await getVideoById(id);
        if (!ignore) {
          setVideo(details);
          if (details) {
            saveToHistory(details);
          }
        }
      } catch (err) {
        if (!ignore) {
          setError(err.message || "Unable to load video details.");
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    }

    fetchVideoDetails();
    return () => {
      ignore = true;
    };
  }, [id]);

  const embedUrl = id
    ? `https://www.youtube.com/embed/${id}?autoplay=0&mute=0&controls=1&rel=0&modestbranding=1&playsinline=1`
    : "";

  return (
    <div className="min-h-[calc(100vh-74px)] px-3 py-3 text-white sm:px-4 md:px-6">
      <div className="mx-auto grid w-full max-w-7xl gap-6 lg:grid-cols-[1.35fr_0.65fr]">
        <div>
          <div className="soft-panel hero-ring overflow-hidden rounded-[32px] bg-black">
            {embedUrl ? (
              <iframe
                className="aspect-video w-full"
                src={embedUrl}
                title={video?.title || "YouTube player"}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            ) : (
              <div className="grid aspect-video place-items-center text-sm text-zinc-400">
                Missing video id
              </div>
            )}
          </div>

          {loading && (
            <div className="soft-panel mt-4 rounded-2xl p-4 text-sm text-zinc-400">
              Loading video details...
            </div>
          )}

          {error && (
            <p className="mt-4 rounded-2xl border border-red-400/30 bg-red-500/10 p-4 text-sm text-red-200">
              {error}
            </p>
          )}
        </div>

        {!loading && video && (
          <section className="soft-panel hero-ring h-fit rounded-[32px] p-5 lg:sticky lg:top-28">
            <p className="section-label">Now Playing</p>
            <h1 className="mt-3 text-xl font-semibold leading-8 sm:text-3xl">
              {video.title}
            </h1>
            <p className="mt-4 text-sm font-medium uppercase tracking-[0.12em] text-zinc-300">
              {video.channel}
            </p>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {video.views && (
                <div className="rounded-2xl border border-white/10 bg-white/6 p-4">
                  <p className="section-label">Views</p>
                  <p className="mt-2 text-lg font-semibold text-white">
                    {formatViewCount(video.views)}
                  </p>
                </div>
              )}
              {video.publishedAt && (
                <div className="rounded-2xl border border-white/10 bg-white/6 p-4">
                  <p className="section-label">Published</p>
                  <p className="mt-2 text-lg font-semibold text-white">
                    {formatPublishedDate(video.publishedAt)}
                  </p>
                </div>
              )}
            </div>
            {video.description && (
              <p className="mt-5 max-h-72 overflow-auto rounded-2xl border border-white/10 bg-black/20 p-4 pr-3 text-sm leading-7 text-zinc-300">
                {video.description}
              </p>
            )}
          </section>
        )}
      </div>
    </div>
  );
}
