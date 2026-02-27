import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { saveToHistory } from "../utils/history";
import { getVideoById } from "../utils/youtube";

export default function WatchPage() {
  const { id } = useParams();
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
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

  const embedUrl = `https://www.youtube.com/embed/${id}?autoplay=0&mute=0&controls=1&rel=0&modestbranding=1&playsinline=1`;

  return (
    <div className="min-h-[calc(100vh-74px)] p-4 text-white sm:p-5 md:p-6">
      <div className="mx-auto grid w-full max-w-7xl gap-6 lg:grid-cols-[1.35fr_0.65fr]">
        <div>
          <div className="edge-glow overflow-hidden rounded-3xl border border-white/10 bg-black">
            <iframe
              className="aspect-video w-full"
              src={embedUrl}
              title="YouTube player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </div>

          {loading && (
            <p className="mt-4 text-sm text-zinc-400">Loading video details...</p>
          )}

          {error && (
            <p className="mt-4 rounded-xl border border-red-400/30 bg-red-500/10 p-3 text-sm text-red-200">
              {error}
            </p>
          )}
        </div>

        {!loading && video && (
          <section className="glass-panel h-fit rounded-3xl p-5 lg:sticky lg:top-24">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-400">
              Now Playing
            </p>
            <h1 className="mt-3 text-lg font-semibold leading-7 sm:text-2xl">
              {video.title}
            </h1>
            <p className="mt-3 text-sm font-medium uppercase tracking-[0.08em] text-zinc-300">
              {video.channel}
            </p>
            {video.views && (
              <p className="mt-1 text-xs text-zinc-400">
                {Number(video.views).toLocaleString()} views
              </p>
            )}
            {video.description && (
              <p className="mt-4 max-h-64 overflow-auto pr-1 text-sm leading-6 text-zinc-300">
                {video.description}
              </p>
            )}
          </section>
        )}
      </div>
    </div>
  );
}
