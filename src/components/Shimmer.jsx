export default function Shimmer() {
  return (
    <div className="soft-panel animate-pulse overflow-hidden rounded-[28px]">
      <div className="aspect-video w-full bg-zinc-800/80"></div>
      <div className="space-y-3 p-5">
        <div className="h-5 w-4/12 rounded-full bg-zinc-800/80"></div>
        <div className="h-4 w-11/12 rounded bg-zinc-800/80"></div>
        <div className="h-4 w-9/12 rounded bg-zinc-800/80"></div>
        <div className="h-3 w-10/12 rounded bg-zinc-800/60"></div>
      </div>
    </div>
  );
}
