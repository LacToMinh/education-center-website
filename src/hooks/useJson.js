// src/hooks/useJson.js
import { useEffect, useState } from "react";
import { fetchJsonCached, fetchJson } from "../lib/fetchJson";

/**
 * useJson(url, { ttl = 0, force = false, timeoutMs })
 * - ttl (ms): 0 = giữ trong session cho tới reload; >0 = cache expire sau ttl
 * - force: true -> bypass cache and call fetchJson directly
 */
export function useJson(
  url,
  { ttl = 0, force = false, timeoutMs = undefined } = {}
) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(Boolean(url));
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!url) {
      setData(null);
      setLoading(false);
      setError(null);
      return;
    }

    const ac = new AbortController();
    setLoading(true);
    setError(null);

    const call = () => {
      if (force) return fetchJson(url, { timeoutMs, signal: ac.signal });
      return fetchJsonCached(url, { timeoutMs, signal: ac.signal }, ttl);
    };

    call()
      .then((res) => setData(res))
      .catch((e) => {
        if (e.name !== "AbortError") setError(e);
      })
      .finally(() => setLoading(false));

    return () => ac.abort();
  }, [url, ttl, force, timeoutMs]);

  return { data, loading, error };
}
