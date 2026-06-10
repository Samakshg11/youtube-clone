import { Link } from "react-router-dom";
import { formatPublishedDate, formatRelativeDate } from "../utils/formatters";

export default function VideoCard({ video }) {
  const publishDate = formatPublishedDate(video.publishedAt);
  const relativePublishDate = formatRelativeDate(video.publishedAt);
  const hasVideoId = Boolean(video?.id);
  const watchLink = hasVideoId ? `/watch/${video.id}` : "#";
  const thumbnail = video?.thumbnail || "https://placehold.co/640x360?text=No+Thumbnail";
  const title = video?.title || "Untitled video";
  const channel = video?.channel || "Unknown channel";
  const description =
    video?.description ||
    "Open the video to watch details and start exploring more from this creator.";

  const Wrapper = hasVideoId ? Link : "div";

  return (
    <Wrapper
      {...(hasVideoId ? { to: watchLink } : { "aria-disabled": true })}
      className="group block"
    >
      <article className="soft-panel overflow-hidden rounded-[28px] transition duration-300 hover:-translate-y-1.5 hover:border-white/20 hover:shadow-[0_22px_45px_rgba(0,0,0,0.38)]">
        <div className="relative overflow-hidden">
          <img
            src={thumbnail}
            alt={title}
            className="aspect-video w-full object-cover transition duration-500 group-hover:scale-[1.06]"
            loading="lazy"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent opacity-80"></div>
          <div className="absolute left-3 top-3 rounded-full border border-white/15 bg-black/45 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-white/90 backdrop-blur-sm">
            Play now
          </div>
        </div>
        <div className="p-4 sm:p-5">
          <div className="mb-3 flex items-start justify-between gap-3">
            <p className="rounded-full border border-white/10 bg-white/6 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-zinc-300">
              {channel}
            </p>
            {publishDate && (
              <p className="shrink-0 pt-1 text-[11px] text-zinc-500" title={publishDate}>
                {relativePublishDate || publishDate}
              </p>
            )}
          </div>
          <h3 className="min-h-12 text-base font-semibold leading-6 text-white/95">
            {title}
          </h3>
          <p className="mt-3 line-clamp-2 text-sm leading-6 text-zinc-400">
            {description}
          </p>
        </div>
      </article>
    </Wrapper>
  );
}
