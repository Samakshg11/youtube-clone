const categories = [
  { id: "Trending", label: "Trending", blurb: "Big stories and viral drops" },
  { id: "Music", label: "Music", blurb: "Live sessions and fresh tracks" },
  { id: "Gaming", label: "Gaming", blurb: "Streams, clips, and launches" },
  { id: "Movies", label: "Movies", blurb: "Trailers and scene breakdowns" },
  { id: "News", label: "News", blurb: "Headlines, context, and updates" },
  { id: "Sports", label: "Sports", blurb: "Highlights and match reactions" },
  { id: "Education", label: "Education", blurb: "Learn something useful fast" },
  {
    id: "Technology",
    label: "Technology",
    blurb: "Builds, reviews, and future stuff",
  },
];

export default function SideBar({ selectedCategory, setSelectedCategory }) {
  return (
    <>
      <aside className="hidden md:block w-64 shrink-0 px-4 py-2">
        <div className="soft-panel sticky top-28 rounded-[30px] p-4">
          <p className="section-label px-3 pb-4">Explore</p>
          <div className="space-y-2">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`w-full rounded-2xl px-3 py-3 text-left transition ${
                    isActive
                      ? "bg-gradient-to-r from-[#ff5a4f] to-[#ff7d2b] text-white shadow-[0_14px_30px_rgba(255,90,79,0.26)]"
                      : "bg-transparent text-zinc-300 hover:bg-white/6 hover:text-white"
                  }`}
                >
                  <span className="block text-sm font-semibold">{cat.label}</span>
                  <span
                    className={`mt-1 block text-xs ${
                      isActive ? "text-white/80" : "text-zinc-500"
                    }`}
                  >
                    {cat.blurb}
                  </span>
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
                    ? "border-[#ff6f49] bg-gradient-to-r from-[#ff5a4f] to-[#ff7d2b] text-white shadow-[0_10px_24px_rgba(255,90,79,0.28)]"
                    : "border-white/15 bg-white/6 text-zinc-300"
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
