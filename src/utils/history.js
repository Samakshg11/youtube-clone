const HISTORY_KEY = "yt_history";
const HISTORY_LIMIT = 50;

function hasLocalStorage() {
  try {
    return typeof window !== "undefined" && !!window.localStorage;
  } catch {
    return false;
  }
}

function isHistoryEntry(item) {
  return Boolean(item && typeof item === "object" && typeof item.id === "string");
}

function readHistory() {
  if (!hasLocalStorage()) return [];

  try {
    const storedValue = window.localStorage.getItem(HISTORY_KEY);
    if (!storedValue) {
      return [];
    }

    const parsed = JSON.parse(storedValue);
    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed.filter(isHistoryEntry);
  } catch {
    return [];
  }
}

export function saveToHistory(video) {
  if (!hasLocalStorage()) return;

  const history = readHistory();
  if (!video?.id) {
    return;
  }

  const filtered = history.filter((v) => v.id !== video.id);
  const nextHistory = [video, ...filtered].slice(0, HISTORY_LIMIT);

  try {
    window.localStorage.setItem(HISTORY_KEY, JSON.stringify(nextHistory));
  } catch {}
}

export function getHistory() {
  return readHistory();
}

export function clearHistory() {
  if (!hasLocalStorage()) return;

  try {
    window.localStorage.removeItem(HISTORY_KEY);
  } catch {}
}
