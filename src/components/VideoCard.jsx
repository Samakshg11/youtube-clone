import { Link } from "react-router-dom";

export default function VideoCard({ video }) {
  const publishDate = video.publishedAt
    ? new Date(video.publishedAt).toLocaleDateString()
    : "";

  return (
    <Link to={`/watch/${video.id}`} className="group block">
      <article className="edge-glow overflow-hidden rounded-2xl border border-white/10 bg-[#0f1016] transition duration-300 hover:-translate-y-1.5 hover:border-white/30 hover:shadow-[0_18px_35px_rgba(0,0,0,0.42)]">
        <div className="relative">
          <img
            src={video.thumbnail}
            alt={video.title}
            className="aspect-video w-full object-cover transition duration-500 group-hover:scale-[1.06]"
            loading="lazy"
          />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/70 to-transparent"></div>
        </div>
        <div className="p-3 sm:p-4">
          <h3 className="min-h-11 text-sm font-semibold leading-5 text-white/95">
            {video.title}
          </h3>
          <p className="mt-2 text-xs font-medium uppercase tracking-[0.08em] text-zinc-400">
            {video.channel}
          </p>
          {publishDate && (
            <p className="mt-1 text-xs text-zinc-500">{publishDate}</p>
          )}
        </div>
      </article>
    </Link>
  );
}
