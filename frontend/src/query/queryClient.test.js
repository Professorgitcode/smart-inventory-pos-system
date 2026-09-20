import React, { StrictMode } from "react";
import { act, renderHook, waitFor } from "@testing-library/react";
import { QueryClient } from "./QueryClient";
import { QueryProvider } from "./QueryContext";
import useQuery from "./useQuery";
import useMutation from "./useMutation";

const deferred = () => {
    let resolve;
    let reject;
    const promise = new Promise((res, rej) => { resolve = res; reject = rej; });
    return { promise, resolve, reject };
};

const wrapperFor = (client, strict = false) => ({ children }) => {
    const content = <QueryProvider client={client}>{children}</QueryProvider>;
    return strict ? <StrictMode>{content}</StrictMode> : content;
};

describe("QueryClient", () => {
    test("serves fresh data, expires it, and invalidates exact/prefix keys", () => {
        const client = new QueryClient();
        client.setQueryData(["inventory"], ["cached"], { staleTime: 1000 });
        expect(client.getQueryData(["inventory"])).toEqual(["cached"]);
        client.invalidateQueries(["inventory"]);
        expect(client.getQueryData(["inventory"])).toBeUndefined();

        client.setQueryData(["reports", "sales"], 1, { staleTime: Infinity });
        client.setQueryData(["reports", "inventory"], 2, { staleTime: Infinity });
        client.setQueryData(["reports", "dashboard"], 3, { staleTime: Infinity });
        client.invalidateQueriesByPrefix(["reports"]);
        expect(client.getQueryData(["reports", "sales"])).toBeUndefined();
        expect(client.getQueryData(["reports", "inventory"])).toBeUndefined();
        expect(client.getQueryData(["reports", "dashboard"])).toBeUndefined();
    });

    test("treats timestamp expiry as stale", () => {
        jest.useFakeTimers();
        const client = new QueryClient();
        client.setQueryData(["inventory"], ["cached"], { staleTime: 10 });
        jest.advanceTimersByTime(10);
        expect(client.getQueryData(["inventory"])).toBeUndefined();
        jest.useRealTimers();
    });

    test("shares concurrent requests and lets a forced refetch win the cache", async () => {
        const client = new QueryClient();
        const first = deferred();
        const second = deferred();
        const fetcher = jest.fn()
            .mockImplementationOnce(() => first.promise)
            .mockImplementationOnce(() => second.promise);
        const sharedOne = client.fetchQuery(["item"], fetcher);
        const sharedTwo = client.fetchQuery(["item"], fetcher);
        expect(fetcher).not.toHaveBeenCalled();
        await Promise.resolve();
        expect(fetcher).toHaveBeenCalledTimes(1);
        const forced = client.fetchQuery(["item"], fetcher, { force: true });
        await Promise.resolve();
        expect(fetcher).toHaveBeenCalledTimes(2);
        first.resolve("old");
        second.resolve("new");
        await Promise.all([sharedOne, sharedTwo, forced]);
        expect(client.getQueryData(["item"])).toBe("new");
    });
});

describe("query hooks", () => {
    test("uses a fresh cache hit and refetch forces a new request", async () => {
        const client = new QueryClient();
        const fetcher = jest.fn().mockResolvedValue("network");
        client.setQueryData(["item"], "cached", { staleTime: Infinity });
        const { result } = renderHook(() => useQuery(["item"], fetcher), { wrapper: wrapperFor(client) });
        await waitFor(() => expect(result.current.data).toBe("cached"));
        expect(fetcher).not.toHaveBeenCalled();
        await act(async () => { await result.current.refetch(); });
        expect(fetcher).toHaveBeenCalledTimes(1);
        expect(result.current.data).toBe("network");
    });

    test("an invalidated mounted query refetches and mutation invalidation uses prefixes", async () => {
        const client = new QueryClient();
        const fetcher = jest.fn().mockResolvedValue("fresh");
        client.setQueryData(["reports", "sales"], "old", { staleTime: Infinity });
        client.setQueryData(["reports", "inventory"], "old", { staleTime: Infinity });
        const query = renderHook(() => useQuery(["reports", "sales"], fetcher), { wrapper: wrapperFor(client) });
        await waitFor(() => expect(query.result.current.data).toBe("old"));
        const mutation = renderHook(() => useMutation(async () => "done", { invalidateKeys: [["reports"]] }), { wrapper: wrapperFor(client) });
        await act(async () => { await mutation.result.current.mutate(); });
        await waitFor(() => expect(fetcher).toHaveBeenCalledTimes(1));
        expect(client.getQueryData(["reports", "inventory"])).toBeUndefined();
        expect(query.result.current.data).toBe("fresh");
    });

    test("does not allow an old-key request to replace a new-key state", async () => {
        const client = new QueryClient();
        const first = deferred();
        const second = deferred();
        const fetcher = jest.fn((id) => id === 1 ? first.promise : second.promise);
        const { result, rerender } = renderHook(({ id }) => useQuery(["item", id], () => fetcher(id)), {
            initialProps: { id: 1 }, wrapper: wrapperFor(client)
        });
        rerender({ id: 2 });
        await act(async () => { second.resolve("new"); await second.promise; });
        await waitFor(() => expect(result.current.data).toBe("new"));
        await act(async () => { first.resolve("old"); await first.promise; });
        expect(result.current.data).toBe("new");
    });

    test("preserves consistent error/loading state and is safe after unmount in StrictMode", async () => {
        const client = new QueryClient();
        const request = deferred();
        const fetcher = jest.fn(() => request.promise);
        const { result, unmount } = renderHook(() => useQuery(["slow"], fetcher), {
            wrapper: wrapperFor(client, true)
        });
        expect(result.current.isLoading).toBe(true);
        await waitFor(() => expect(fetcher).toHaveBeenCalledTimes(1));
        unmount();
        await act(async () => { request.resolve("late"); await request.promise; });

        const failure = new Error("failed");
        const errorQuery = renderHook(() => useQuery(["error"], () => Promise.reject(failure)), {
            wrapper: wrapperFor(client)
        });
        await waitFor(() => expect(errorQuery.result.current.isError).toBe(true));
        expect(errorQuery.result.current.isLoading).toBe(false);
        expect(errorQuery.result.current.error).toBe(failure);
    });

    test("prevents duplicate submissions and reports mutation errors/callbacks", async () => {
        const client = new QueryClient();
        const request = deferred();
        const mutationFn = jest.fn(() => request.promise);
        const { result } = renderHook(() => useMutation(mutationFn), { wrapper: wrapperFor(client) });
        let first;
        let second;
        act(() => {
            first = result.current.mutate({ id: 1 });
            second = result.current.mutate({ id: 1 });
        });
        expect(mutationFn).toHaveBeenCalledTimes(1);
        await act(async () => { request.resolve("saved"); await Promise.all([first, second]); });
        expect(result.current.isSuccess).toBe(true);
        expect(result.current.isLoading).toBe(false);

        const failure = new Error("save failed");
        const onError = jest.fn();
        const failed = renderHook(() => useMutation(() => Promise.reject(failure), { onError }), {
            wrapper: wrapperFor(client)
        });
        await act(async () => { await failed.result.current.mutate(); });
        expect(failed.result.current.isError).toBe(true);
        expect(failed.result.current.error).toBe(failure);
        expect(onError).toHaveBeenCalledWith(failure);
    });
});
