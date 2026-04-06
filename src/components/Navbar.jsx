import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Navbar() {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const nextTerm = searchTerm.trim();
    if (nextTerm) {
      navigate(`/search/${encodeURIComponent(nextTerm)}`);
      setSearchTerm("");
    }
  };

  return (
    <nav className="sticky top-0 z-50 px-3 pt-3 sm:px-4 sm:pt-4">
      <div className="soft-panel hero-ring mx-auto flex w-full max-w-[1600px] items-center gap-3 rounded-[28px] px-3 py-3 sm:gap-4 sm:px-5">
        <Link to="/" className="group flex shrink-0 items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-2xl bg-gradient-to-br from-[#ff5a4f] via-[#ff7d2b] to-[#fbbf24] text-lg font-black text-white shadow-[0_14px_30px_rgba(255,90,79,0.28)] transition duration-300 group-hover:scale-105">
            M
          </div>
          <div className="hidden sm:block">
            <span className="block text-lg font-semibold tracking-tight title-gradient">
              MeTube
            </span>
            <span className="text-[11px] uppercase tracking-[0.28em] text-zinc-400">
              Stream the moment
            </span>
          </div>
        </Link>

        <form
          onSubmit={handleSubmit}
          className="edge-glow flex w-full items-center overflow-hidden rounded-full border border-white/10 bg-black/35"
        >
          <input
            className="w-full bg-transparent px-4 py-3 text-sm text-white outline-none placeholder:text-zinc-400"
            placeholder="Search videos, creators, and topics"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            type="submit"
            className="border-l border-white/15 bg-gradient-to-r from-[#ff5a4f] to-[#ff7d2b] px-4 py-3 text-sm font-semibold text-white transition hover:brightness-110"
          >
            Search
          </button>
        </form>

        <Link
          to="/history"
          className="shrink-0 rounded-full border border-white/15 bg-white/6 px-4 py-3 text-sm font-medium text-zinc-100 transition hover:border-white/35 hover:bg-white/10"
        >
          History
        </Link>
      </div>
    </nav>
  );
}
