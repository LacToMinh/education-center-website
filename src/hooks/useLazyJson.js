// src/hooks/useLazyJson.js
import { useEffect, useRef, useState } from "react";
import { fetchJson } from "../lib/fetchJson";

/**
 * useLazyJson() -> { data, loading, error, load(url, opts) }
 * call load(url) để fetch khi cần (abort-safe)
 */
export function useLazyJson() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const acRef = useRef(null);

  async function load(url, { timeoutMs } = {}) {
    if (!url) throw new Error("load: missing url");
    // abort previous
    if (acRef.current) acRef.current.abort();
    acRef.current = new AbortController();
    setLoading(true);
    setError(null);
    try {
      const res = await fetchJson(url, {
        timeoutMs,
        signal: acRef.current.signal,
      });
      setData(res);
      return res;
    } catch (e) {
      if (e.name !== "AbortError") setError(e);
      throw e;
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    return () => acRef.current?.abort();
  }, []);

  return { data, loading, error, load };
}
