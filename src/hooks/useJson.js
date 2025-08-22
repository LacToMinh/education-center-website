import { useEffect, useState } from "react";
import { fetchJsonCached } from "../lib/fetchJson";

export function useJson(url, opts) {
  const [data, setData] = useState(null);
  const [loading, setL] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!url) return;
    const ac = new AbortController();
    setL(true);
    setError(null);
    fetchJsonCached(url, { ...opts, signal: ac.signal })
      .then(setData)
      .catch((e) => {
        if (e.name !== "AbortError") setError(e);
      })
      .finally(() => setL(false));
    return () => ac.abort();
  }, [url]);

  return { data, loading, error };
}
