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
      {...(hasVideoId ? { to: watchLink } : { "aria-disabled": true, tabIndex: -1 })}
      className="group block"
    >
      <article className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 transition duration-300 hover:-translate-y-1 hover:border-white/20 hover:shadow-lg hover:shadow-black/20">
        <div className="relative aspect-video w-full overflow-hidden">
          <img
            src={thumbnail}
            alt={`${title} thumbnail`}
            className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 transition duration-300 group-hover:opacity-100" />
          <div className="absolute bottom-2 right-2 rounded-md bg-black/80 px-2 py-1 text-xs font-semibold text-white">
            Watch
          </div>
        </div>

        <div className="p-4">
          <div className="flex items-start gap-3">
            <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-gradient-to-br from-[#ff5a4f] to-[#fbbf24] text-xs font-bold text-white">
              {channel.charAt(0)}
            </div>
            <div className="flex-1 overflow-hidden">
              <h3 className="line-clamp-2 text-sm font-semibold leading-snug text-white/90 group-hover:text-white">
                {title}
              </h3>
              <p className="mt-1 text-xs font-medium text-zinc-400">
                {channel}
              </p>
              <div className="mt-1 flex items-center gap-2 text-xs text-zinc-500">
                {publishDate && (
                  <span title={publishDate}>
                    {relativePublishDate || publishDate}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </article>
    </Wrapper>
  );
}
