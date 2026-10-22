import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { saveToHistory } from "../utils/history";
import { formatPublishedDate, formatViewCount } from "../utils/formatters";
import { getVideoById } from "../utils/youtube";

import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { saveToHistory } from "../utils/history";
import { formatPublishedDate, formatViewCount } from "../utils/formatters";
import { getVideoById } from "../utils/youtube";

const VideoMetadata = ({ label, value }) => (
  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
    <p className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
      {label}
    </p>
    <p className="mt-2 text-lg font-semibold text-white">{value}</p>
  </div>
);

const ActionButton = ({ icon, label, active, onClick, copied }) => (
  <button
    type="button"
    onClick={onClick}
    className={`flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition ${
      active
        ? "border-red-400/50 bg-red-500/20 text-red-200"
        : "border-white/15 bg-white/5 text-zinc-200 hover:border-white/35 hover:bg-white/10"
    }`}
  >
    <span>{icon}</span>
    <span>{copied ? "Link Copied!" : label}</span>
  </button>
);

export default function WatchPage() {
  const { id } = useParams();
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [liked, setLiked] = useState(false);
  const [copied, setCopied] = useState(false);
  const playerTitle = video?.title || "YouTube player";

  function handleShare() {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }

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
          <div className="overflow-hidden rounded-2xl border border-white/10 bg-black">
            {embedUrl ? (
              <iframe
                className="aspect-video w-full rounded-t-2xl"
                src={embedUrl}
                title={playerTitle}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            ) : (
              <div className="grid aspect-video place-items-center rounded-t-2xl text-sm text-zinc-400">
                Missing video id
              </div>
            )}

            <div className="rounded-b-2xl border-t border-white/10 bg-white/5 p-4">
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-gradient-to-br from-[#ff5a4f] to-[#fbbf24] text-sm font-bold text-white">
                  {video?.channel?.charAt(0) || "?"}
                </div>
                <div>
                  <h1 className="text-lg font-semibold text-white">
                    {video?.title || "Loading video..."}
                  </h1>
                  <p className="text-sm text-zinc-400">
                    {video?.channel || ""}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {loading && (
            <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-zinc-400">
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
          <section className="h-fit">
            <div className="grid gap-3 sm:grid-cols-2">
              {video.views && (
                <VideoMetadata label="Views" value={formatViewCount(video.views)} />
              )}
              {video.publishedAt && (
                <VideoMetadata
                  label="Published"
                  value={formatPublishedDate(video.publishedAt)}
                />
              )}
            </div>

            <div className="mt-5 flex flex-wrap gap-3">
              <ActionButton
                icon={liked ? "❤️" : "🤍"}
                label={liked ? "Liked" : "Like"}
                active={liked}
                onClick={() => setLiked((prev) => !prev)}
              />
              <ActionButton
                icon="🔗"
                label={copied ? "Link Copied!" : "Share"}
                onClick={handleShare}
                copied={copied}
              />
            </div>

            {video.description && (
              <div className="mt-5 rounded-2xl border border-white/10 bg-white/5 p-4">
                <h2 className="text-sm font-semibold uppercase tracking-wider text-zinc-400">
                  Description
                </h2>
                <p className="mt-2 text-sm leading-6 text-zinc-300">
                  {video.description}
                </p>
              </div>
            )}

            <div className="mt-5 flex justify-between">
              <Link
                to="/"
                className="flex items-center gap-2 text-sm text-zinc-400 transition hover:text-white"
              >
                <span>←</span>
                <span>Back to feed</span>
              </Link>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
