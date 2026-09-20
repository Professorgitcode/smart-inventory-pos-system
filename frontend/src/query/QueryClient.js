/* Small shared cache for server data. */
export class QueryClient {
    constructor() {
        this.cache = new Map();
        this.listeners = new Map();
        this.inFlight = new Map();
    }

    createEntry(data, staleTime) {
        return { data, timestamp: Date.now(), staleTime, isInvalidated: false };
    }

    isFresh(entry) {
        if (!entry || entry.isInvalidated) return false;
        if (entry.staleTime === Infinity) return true;
        return Date.now() - entry.timestamp < entry.staleTime;
    }

    getQueryData(key) {
        const entry = this.cache.get(this.normalizeKey(key));
        return this.isFresh(entry) ? entry.data : undefined;
    }

    getQueryEntry(key) {
        return this.cache.get(this.normalizeKey(key));
    }

    setQueryData(key, data, { staleTime = 5 * 60 * 1000 } = {}) {
        const cacheKey = this.normalizeKey(key);
        this.cache.set(cacheKey, this.createEntry(data, staleTime));
        this.notify(cacheKey, { type: "updated" });
        return data;
    }

    updateQueryData(key, updater) {
        const cacheKey = this.normalizeKey(key);
        const entry = this.cache.get(cacheKey);
        if (!entry) return undefined;
        entry.data = typeof updater === "function" ? updater(entry.data) : updater;
        entry.timestamp = Date.now();
        entry.isInvalidated = false;
        this.cache.set(cacheKey, entry);
        this.notify(cacheKey, { type: "updated" });
        return entry.data;
    }

    /*
     * Shares normal concurrent requests. A forced request deliberately starts
     * a newer operation; only that newest operation may write this cache key.
     */
    fetchQuery(key, queryFn, options = {}) {
        const { staleTime = 5 * 60 * 1000, force = false } = options;
        const cacheKey = this.normalizeKey(key);
        const existing = this.inFlight.get(cacheKey);
        if (existing && !force) return existing.promise;

        const request = {
            id: (existing?.id || 0) + 1,
            promise: null
        };
        request.promise = Promise.resolve()
            .then(queryFn)
            .then((data) => {
                if (this.inFlight.get(cacheKey) === request) {
                    this.setQueryData(key, data, { staleTime });
                }
                return data;
            })
            .finally(() => {
                if (this.inFlight.get(cacheKey) === request) {
                    this.inFlight.delete(cacheKey);
                }
            });
        this.inFlight.set(cacheKey, request);
        return request.promise;
    }

    invalidateQueries(key) {
        this.invalidateCacheKey(this.normalizeKey(key));
    }

    invalidateQueriesByPrefix(prefix) {
        const prefixParts = this.normalizeKeyParts(prefix);
        for (const cacheKey of this.cache.keys()) {
            if (this.matchesPrefix(this.parseKey(cacheKey), prefixParts)) {
                this.invalidateCacheKey(cacheKey);
            }
        }
    }

    invalidateCacheKey(cacheKey) {
        const entry = this.cache.get(cacheKey);
        if (!entry) return;
        entry.isInvalidated = true;
        this.cache.set(cacheKey, entry);
        this.notify(cacheKey, { type: "invalidated" });
    }

    subscribe(key, listener) {
        const cacheKey = this.normalizeKey(key);
        const listeners = this.listeners.get(cacheKey) || new Set();
        listeners.add(listener);
        this.listeners.set(cacheKey, listeners);
        return () => {
            const currentListeners = this.listeners.get(cacheKey);
            if (!currentListeners) return;
            currentListeners.delete(listener);
            if (currentListeners.size === 0) this.listeners.delete(cacheKey);
        };
    }

    notify(cacheKey, event) {
        const listeners = this.listeners.get(cacheKey);
        if (listeners) [...listeners].forEach((listener) => listener(event));
    }

    clear() { this.cache.clear(); this.inFlight.clear(); }
    hasQuery(key) { return this.cache.has(this.normalizeKey(key)); }
    normalizeKey(key) { return Array.isArray(key) ? JSON.stringify(key) : String(key); }
    normalizeKeyParts(key) { return Array.isArray(key) ? key : [key]; }

    parseKey(key) {
        try {
            const parsed = JSON.parse(key);
            if (Array.isArray(parsed)) return parsed;
        } catch (error) {
            // Plain string keys are not JSON arrays.
        }
        return [key];
    }

    matchesPrefix(queryParts, prefixParts) {
        return prefixParts.length <= queryParts.length &&
            prefixParts.every((part, index) => queryParts[index] === part);
    }
}

const queryClient = new QueryClient();
export default queryClient;
