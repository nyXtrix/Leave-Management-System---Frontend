import { useState, useEffect, useCallback, useRef } from "react";
import { useLoader } from "@/contexts/LoaderContext";

interface QueryResult<T> {
  data: T | null;
  isLoading: boolean;
  error: any;
  refetch: () => Promise<void>;
  setData: React.Dispatch<React.SetStateAction<T | null>>;
}

interface CacheEntry<T> {
  data: T;
  timestamp: number;
}

const queryCache = new Map<string, CacheEntry<any>>();

const DEFAULT_TTL_MS = 5 * 60 * 1000;
function isCacheValid<T>(entry: CacheEntry<T>, ttl: number): boolean {
  return Date.now() - entry.timestamp < ttl;
}

export function useQuery<T, Args extends any[]>(
  queryFn: (...args: Args) => Promise<T>,
  args: Args,
  options: { showGlobalLoader?: boolean; ttl?: number } = { showGlobalLoader: true }
): QueryResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<any>(null);
  const { showLoader, hideLoader } = useLoader();
  const ttl = options.ttl ?? DEFAULT_TTL_MS;

  const cacheKey = `${queryFn.name}__${JSON.stringify(args)}`;

  const forceRefetchRef = useRef(false);

  const fetchData = useCallback(async (force = false) => {
    if (!force) {
      const cached = queryCache.get(cacheKey);
      if (cached && isCacheValid(cached, ttl)) {
        setData(cached.data as T);
        return;
      }
    }

    setIsLoading(true);
    if (options.showGlobalLoader) showLoader();

    try {
      const result = await queryFn(...args);
      setData(result);
      setError(null);
      queryCache.set(cacheKey, { data: result, timestamp: Date.now() });
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
      if (options.showGlobalLoader) hideLoader();
    }
  }, [cacheKey, ttl, options.showGlobalLoader, showLoader, hideLoader, queryFn, JSON.stringify(args)]);

  useEffect(() => {
    fetchData(forceRefetchRef.current);
    forceRefetchRef.current = false;
  }, [fetchData]);

  const refetch = useCallback(async () => {
    queryCache.delete(cacheKey);
    await fetchData(true);
  }, [cacheKey, fetchData]);

  return { data, isLoading, error, refetch, setData };
}

export function invalidateQuery(fnName: string, args?: any[]) {
  if (args !== undefined) {
    queryCache.delete(`${fnName}__${JSON.stringify(args)}`);
  } else {
    for (const key of queryCache.keys()) {
      if (key.startsWith(`${fnName}__`)) queryCache.delete(key);
    }
  }
}

