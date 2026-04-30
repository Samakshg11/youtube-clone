export const CATEGORIES = [
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

export function getCategoryById(id) {
  return CATEGORIES.find((category) => category.id === id) || CATEGORIES[0];
}
