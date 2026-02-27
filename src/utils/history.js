const HISTORY_KEY = "yt_history";
const HISTORY_LIMIT = 50;

export function saveToHistory(video) {
  const history = JSON.parse(localStorage.getItem(HISTORY_KEY)) || [];
  if (!video?.id) {
    return;
  }

  const filtered = history.filter((v) => v.id !== video.id);
  const nextHistory = [video, ...filtered].slice(0, HISTORY_LIMIT);

  localStorage.setItem(HISTORY_KEY, JSON.stringify(nextHistory));
}

export function getHistory() {
  return JSON.parse(localStorage.getItem(HISTORY_KEY)) || [];
}

export function clearHistory() {
  localStorage.removeItem(HISTORY_KEY);
}
