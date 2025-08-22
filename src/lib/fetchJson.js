// tiện ích fetch JSON có timeout; có bản cached ở dưới
export async function fetchJson(url, { timeoutMs = 10000, signal } = {}) {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(url, {
      signal: signal ?? controller.signal,
      credentials: "same-origin",
      cache: "no-cache", // đổi "force-cache" nếu muốn tận dụng cache trình duyệt
    });
    if (!res.ok) throw new Error(`HTTP ${res.status} at ${url}`);
    return await res.json();
  } finally {
    clearTimeout(id);
  }
}

const _cache = new Map();
export async function fetchJsonCached(url, opts) {
  if (_cache.has(url)) return _cache.get(url);
  const data = await fetchJson(url, opts);
  _cache.set(url, data);
  return data;
}
