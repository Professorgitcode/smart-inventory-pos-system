import { useCallback, useEffect, useRef, useState } from "react";
import { useQueryContext } from "./QueryContext";

const useQuery = (queryKey, queryFn, options = {}) => {
    const queryClient = useQueryContext();
    const { enabled = true, staleTime = 5 * 60 * 1000, initialData, onSuccess, onError } = options;
    const cacheKey = queryClient.normalizeKey(queryKey);
    const keyRef = useRef({ key: queryKey, cacheKey });
    const queryFnRef = useRef(queryFn);
    const successRef = useRef(onSuccess);
    const errorRef = useRef(onError);
    const mountedRef = useRef(false);
    const requestRef = useRef(0);

    // Update in render so effects always observe the newest query key/callback.
    keyRef.current = { key: queryKey, cacheKey };
    queryFnRef.current = queryFn;
    successRef.current = onSuccess;
    errorRef.current = onError;

    const cachedData = queryClient.getQueryData(queryKey);
    const [state, setState] = useState(() => ({
        key: cacheKey,
        data: cachedData !== undefined ? cachedData : initialData,
        loading: enabled && cachedData === undefined,
        error: null
    }));

    useEffect(() => {
        mountedRef.current = true;
        return () => { mountedRef.current = false; requestRef.current += 1; };
    }, []);

    const executeQuery = useCallback(async (force = false, requested = keyRef.current) => {
        if (!enabled) return undefined;
        const { key, cacheKey: requestedCacheKey } = requested;
        const cached = queryClient.getQueryData(key);
        if (!force && cached !== undefined) {
            if (mountedRef.current && keyRef.current.cacheKey === requestedCacheKey) {
                setState({ key: requestedCacheKey, data: cached, loading: false, error: null });
            }
            return cached;
        }

        const requestId = ++requestRef.current;
        if (mountedRef.current && keyRef.current.cacheKey === requestedCacheKey) {
            setState((current) => ({ ...current, key: requestedCacheKey, loading: true, error: null }));
        }

        try {
            const result = await queryClient.fetchQuery(
                key,
                () => queryFnRef.current(),
                { staleTime, force }
            );
            const isCurrent = requestId === requestRef.current && keyRef.current.cacheKey === requestedCacheKey;
            if (mountedRef.current && isCurrent) {
                setState({ key: requestedCacheKey, data: result, loading: false, error: null });
                if (successRef.current) await successRef.current(result);
            }
            return result;
        } catch (requestError) {
            const isCurrent = requestId === requestRef.current && keyRef.current.cacheKey === requestedCacheKey;
            if (mountedRef.current && isCurrent) {
                setState((current) => ({ ...current, key: requestedCacheKey, loading: false, error: requestError }));
                if (errorRef.current) await errorRef.current(requestError);
            }
            return undefined;
        }
    }, [enabled, queryClient, staleTime]);

    useEffect(() => {
        const requested = { key: keyRef.current.key, cacheKey };
        requestRef.current += 1; // retire any request belonging to the prior key
        if (!enabled) {
            setState((current) => ({ ...current, key: cacheKey, loading: false }));
            return undefined;
        }
        executeQuery(false, requested);
        return undefined;
    }, [cacheKey, enabled, executeQuery]);

    useEffect(() => queryClient.subscribe(keyRef.current.key, (event) => {
        if (event.type === "invalidated" && enabled) {
            executeQuery(true, { key: keyRef.current.key, cacheKey });
        } else if (event.type === "updated") {
            const data = queryClient.getQueryData(keyRef.current.key);
            if (mountedRef.current && data !== undefined) {
                setState({ key: cacheKey, data, loading: false, error: null });
            }
        }
    }), [cacheKey, enabled, executeQuery, queryClient]);

    // Do not expose data/state belonging to the previous key between renders.
    const visibleData = state.key === cacheKey ? state.data : (cachedData !== undefined ? cachedData : initialData);
    const loading = state.key === cacheKey ? state.loading : enabled && cachedData === undefined;
    const error = state.key === cacheKey ? state.error : null;
    const refetch = useCallback(() => executeQuery(true), [executeQuery]);
    const invalidate = useCallback(() => queryClient.invalidateQueries(keyRef.current.key), [queryClient]);
    const clear = useCallback(() => {
        queryClient.invalidateQueries(keyRef.current.key);
        if (mountedRef.current) setState({ key: keyRef.current.cacheKey, data: initialData, loading: false, error: null });
    }, [initialData, queryClient]);

    return {
        data: visibleData, loading, error,
        isLoading: loading,
        isError: Boolean(error),
        isSuccess: !loading && !error && visibleData !== undefined,
        refetch, invalidate, clear
    };
};

export default useQuery;
