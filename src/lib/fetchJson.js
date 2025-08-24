// src/lib/fetchJson.js
// fetchJson: timeout + merge signal (timeout luôn có hiệu lực)
// fetchJsonCached: cache Promise + optional TTL (ms) trong session (Map)

export async function fetchJson(url, { timeoutMs = 10000, signal } = {}) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  // nếu caller truyền signal thì forward abort vào controller
  if (signal) {
    if (signal.aborted) controller.abort();
    else
      signal.addEventListener("abort", () => controller.abort(), {
        once: true,
      });
  }

  try {
    const res = await fetch(url, {
      method: "GET",
      signal: controller.signal,
      credentials: "omit", // không gửi cookie
      cache: "no-cache", // tuỳ: "no-cache" = revalidate; "no-store" = không lưu
    });

    if (!res.ok) throw new Error(`HTTP ${res.status} at ${url}`);

    // đọc text để an toàn khi body rỗng
    const text = await res.text();
    return text ? JSON.parse(text) : null;
  } finally {
    clearTimeout(timer);
  }
}

// Promise-cache với TTL
const _cache = new Map(); // url -> { promise, expire }

export function fetchJsonCached(url, opts = {}, ttl = 0) {
  const now = Date.now();
  const hit = _cache.get(url);

  if (hit) {
    if (hit.expire === 0 || now < hit.expire) return hit.promise;
    _cache.delete(url);
  }

  const p = fetchJson(url, opts)
    .then((data) => data)
    .catch((err) => {
      // remove cache on error so next try can refetch
      _cache.delete(url);
      throw err;
    });

  _cache.set(url, { promise: p, expire: ttl ? now + ttl : 0 });
  return p;
}
