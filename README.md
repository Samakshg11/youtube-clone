# MeTube (YouTube Clone)

A modern React + Vite YouTube-style app focused on smooth browsing, cleaner layout, and resilient data loading.

## Features

- Category-based home feed
- Infinite scroll with manual "Load more" fallback
- Search results with loading/empty/error states
- Watch page with embedded player and metadata
- Local watch history with clear-history action
- Duplicate-result protection during pagination

## Tech Stack

- React 19
- React Router 7
- Vite 6
- Tailwind CSS 4

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Create `.env` with a YouTube Data API key:

```bash
VITE_YOUTUBE_API_KEY=your_api_key_here
# Optional legacy fallback supported by the app:
# VITE_RAPID_API_KEY=your_api_key_here
```

3. Run the dev server:

```bash
npm run dev
```

4. Open the local URL shown in your terminal.

## Build

```bash
npm run build
npm run preview
```

## Notes

- Search and feed requests use the YouTube Data API v3 `search` endpoint.
- Watch page metadata uses the `videos` endpoint.
- If the API key is missing or invalid, the UI surfaces the API error message.
- If requests fail with quota/auth errors, verify the key is enabled for YouTube Data API v3.
