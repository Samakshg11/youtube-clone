import { useState } from "react";
import { clearHistory, getHistory } from "../utils/history";
import VideoCard from "./VideoCard";

export default function History() {
  const [history, setHistory] = useState(() => getHistory());

  function handleClearHistory() {
    const confirmed = window.confirm(
      "Clear your full watch history? This action cannot be undone."
    );
    if (!confirmed) {
      return;
    }

    clearHistory();
    setHistory([]);
  }

  return (
    <div className="min-h-[calc(100vh-74px)] px-3 py-3 text-white sm:px-4 md:px-6">
      <div className="mx-auto w-full max-w-[1600px]">
        <div className="soft-panel hero-ring mb-5 flex flex-col items-start justify-between gap-4 rounded-[32px] p-5 sm:flex-row sm:items-center sm:p-7">
          <div>
            <p className="section-label">Library</p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight sm:text-4xl title-gradient">
              Watch History
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-zinc-300 sm:text-base">
              Your recently watched videos stay in one clean, easy-to-scan space.
            </p>
          </div>
          {history.length > 0 && (
            <button
              onClick={handleClearHistory}
              className="rounded-full border border-white/15 bg-white/6 px-4 py-3 text-sm text-zinc-100 transition hover:border-white/35 hover:bg-white/10"
            >
              Clear history
            </button>
          )}
        </div>

        {history.length === 0 && (
          <div className="soft-panel rounded-[28px] p-8 text-center">
            <p className="text-lg font-semibold text-white">No history yet</p>
            <p className="mt-2 text-sm text-zinc-400">
              Watch a video and it will appear here automatically.
            </p>
          </div>
        )}

        {history.length > 0 && (
          <div className="mb-4 flex items-center justify-between gap-3">
            <h3 className="text-sm font-semibold uppercase tracking-[0.22em] text-zinc-400">
              Recently watched
            </h3>
            <span className="rounded-full border border-white/10 bg-white/6 px-3 py-1 text-xs text-zinc-300">
              {history.length} saved
            </span>
          </div>
        )}

        <section className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {history.map((v) => (
            <VideoCard key={v.id} video={v} />
          ))}
        </section>
      </div>
    </div>
  );
}
