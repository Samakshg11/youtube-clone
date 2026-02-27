import { useState } from "react";
import { clearHistory, getHistory } from "../utils/history";
import VideoCard from "./VideoCard";

export default function History() {
  const [history, setHistory] = useState(() => getHistory());

  function handleClearHistory() {
    clearHistory();
    setHistory([]);
  }

  return (
    <div className="min-h-[calc(100vh-74px)] px-4 py-3 text-white sm:px-5 md:px-6">
      <div className="mx-auto w-full max-w-[1600px]">
        <div className="glass-panel mb-5 flex items-center justify-between gap-3 rounded-3xl p-4 sm:p-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-400">
              Library
            </p>
            <h2 className="mt-2 text-xl font-semibold tracking-tight sm:text-3xl title-gradient">
              Watch History
            </h2>
          </div>
          {history.length > 0 && (
            <button
              onClick={handleClearHistory}
              className="rounded-full border border-white/20 bg-black/35 px-4 py-2 text-sm text-zinc-100 transition hover:border-white/40 hover:bg-white/10"
            >
              Clear history
            </button>
          )}
        </div>

        {history.length === 0 && (
          <p className="rounded-xl border border-white/10 bg-[#0f0f0f] p-6 text-zinc-400">
            No history yet. Watch a video and it will appear here.
          </p>
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
