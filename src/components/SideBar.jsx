const categories = [
  { id: "Trending", label: "Trending" },
  { id: "Music", label: "Music" },
  { id: "Gaming", label: "Gaming" },
  { id: "Movies", label: "Movies" },
  { id: "News", label: "News" },
  { id: "Sports", label: "Sports" },
  { id: "Education", label: "Education" },
  { id: "Technology", label: "Technology" },
];

export default function SideBar({ selectedCategory, setSelectedCategory }) {
  return (
    <>
      <aside className="hidden md:block w-64 shrink-0 px-4 py-2">
        <div className="glass-panel sticky top-24 rounded-2xl p-4">
        <p className="px-3 pb-4 text-xs font-semibold uppercase tracking-[0.24em] text-zinc-500">
          Explore
        </p>
        <div className="space-y-1">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`w-full rounded-xl px-3 py-2.5 text-left text-sm font-semibold transition ${
                  isActive
                    ? "bg-gradient-to-r from-[#ff4a3d] to-[#ff7d2b] text-white shadow-[0_10px_24px_rgba(255,74,61,0.35)]"
                    : "text-zinc-300 hover:bg-white/6 hover:text-white"
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
        </div>
      </aside>

      <div className="md:hidden px-3 pb-3">
        <div className="no-scrollbar flex gap-2 overflow-x-auto">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`rounded-full border px-4 py-2 text-sm font-medium whitespace-nowrap transition ${
                  isActive
                    ? "border-[#ff6f49] bg-gradient-to-r from-[#ff4a3d] to-[#ff7d2b] text-white"
                    : "border-white/15 bg-black/25 text-zinc-300"
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
}
