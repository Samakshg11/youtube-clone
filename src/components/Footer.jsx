export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-black/30">
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-4 px-4 py-6 text-sm text-zinc-400 sm:flex-row">
        <div className="flex items-center gap-2">
          <span className="grid h-7 w-7 place-items-center rounded-lg bg-linear-to-br from-[#ff5a4f] to-[#fbbf24] text-xs font-black text-white">
            M
          </span>
          <span>
            MeTube · YouTube clone · © {year}
          </span>
        </div>
        <div className="flex items-center gap-5">
          <a
            href="https://www.youtube.com"
            target="_blank"
            rel="noreferrer"
            className="transition hover:text-white"
          >
            YouTube
          </a>
          <span className="h-1 w-1 rounded-full bg-white/20" />
          <span>React 19 · Vite · Tailwind</span>
        </div>
      </div>
    </footer>
  );
}