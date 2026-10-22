export const CATEGORIES = Object.freeze([
  { id: "Trending", label: "Trending", icon: "🔥", blurb: "Big stories and viral drops" },
  { id: "Music", label: "Music", icon: "🎵", blurb: "Live sessions and fresh tracks" },
  { id: "Gaming", label: "Gaming", icon: "🎮", blurb: "Streams, clips, and launches" },
  { id: "Movies", label: "Movies", icon: "🎬", blurb: "Trailers and scene breakdowns" },
  { id: "News", label: "News", icon: "📰", blurb: "Headlines, context, and updates" },
  { id: "Sports", label: "Sports", icon: "⚽", blurb: "Highlights and match reactions" },
  { id: "Education", label: "Education", icon: "🎓", blurb: "Learn something useful fast" },
  {
    id: "Technology",
    label: "Technology",
    icon: "💻",
    blurb: "Builds, reviews, and future stuff",
  },
]);

export function getCategoryById(id) {
  return CATEGORIES.find((category) => category.id === id) || CATEGORIES[0];
}
