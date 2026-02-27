export default function Shimmer() {
  return (
    <div className="edge-glow animate-pulse overflow-hidden rounded-2xl border border-white/10 bg-[#0f1016]">
      <div className="aspect-video w-full bg-zinc-800/80"></div>
      <div className="space-y-2 p-4">
        <div className="h-4 w-11/12 rounded bg-zinc-800/80"></div>
        <div className="h-4 w-8/12 rounded bg-zinc-800/80"></div>
        <div className="h-3 w-5/12 rounded bg-zinc-800/80"></div>
      </div>
    </div>
  );
}
