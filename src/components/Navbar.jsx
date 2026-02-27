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
    <nav className="sticky top-0 z-50 px-3 py-3 sm:px-4">
      <div className="glass-panel mx-auto flex w-full max-w-[1600px] items-center gap-2 rounded-2xl px-3 py-2 sm:gap-4 sm:px-4">
        <Link to="/" className="group flex items-center gap-2 shrink-0">
          <div className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-[#ff4a3d] to-[#ff7d2b] text-lg font-black text-white transition group-hover:scale-105">
            Y
          </div>
          <span className="hidden text-lg font-semibold tracking-tight title-gradient sm:block">
            YouTube Clone
          </span>
        </Link>

        <form
          onSubmit={handleSubmit}
          className="edge-glow flex w-full items-center overflow-hidden rounded-full border border-white/10 bg-black/40"
        >
          <input
            className="w-full bg-transparent px-4 py-2.5 text-sm text-white outline-none placeholder:text-zinc-400"
            placeholder="Search videos, creators, and topics"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            type="submit"
            className="border-l border-white/15 bg-gradient-to-r from-[#ff4a3d] to-[#ff7d2b] px-4 py-2.5 text-sm font-semibold text-white transition hover:brightness-110"
          >
            Search
          </button>
        </form>

        <Link
          to="/history"
          className="shrink-0 rounded-full border border-white/20 bg-black/35 px-4 py-2 text-sm font-medium text-zinc-100 transition hover:border-white/40 hover:bg-white/10"
        >
          History
        </Link>
      </div>
    </nav>
  );
}

