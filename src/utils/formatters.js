export function formatPublishedDate(dateValue) {
  if (!dateValue) {
    return "";
  }

  const date = new Date(dateValue);
  if (Number.isNaN(date.getTime())) {
    return "";
  }

  return date.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function formatViewCount(value) {
  const count = Number(value);
  if (!Number.isFinite(count) || count < 0) {
    return "";
  }

  return count.toLocaleString();
}
