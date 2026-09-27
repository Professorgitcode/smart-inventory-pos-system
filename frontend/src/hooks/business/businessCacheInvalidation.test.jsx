import React from "react";
import { act, renderHook, waitFor } from "@testing-library/react";

import { QueryProvider } from "../../query";
import { QueryClient } from "../../query/QueryClient";

import InventoryRepository from "../../repositories/inventory/InventoryRepository";
import POSRepository from "../../repositories/pos/POSRepository";

import useInventory from "./inventory/useInventory";
import usePOS from "./pos/usePOS";

jest.mock("../../repositories/inventory/InventoryRepository", () => ({
    __esModule: true,
    default: {
        getAll: jest.fn().mockResolvedValue([]),
        getById: jest.fn().mockResolvedValue(null),
        create: jest.fn().mockResolvedValue({ id: 1 }),
        update: jest.fn().mockResolvedValue({ id: 1 }),
        remove: jest.fn().mockResolvedValue(true)
    }
}));

jest.mock("../../repositories/pos/POSRepository", () => ({
    __esModule: true,
    default: {
        getProducts: jest.fn().mockResolvedValue([
            {
                id: 1,
                name: "Test Product",
                price: 10,
                stockQuantity: 10
            }
        ]),
        checkout: jest.fn().mockResolvedValue({
            id: 100
        })
    }
}));

const createWrapper = (client) => ({ children }) => (
    <QueryProvider client={client}>
        {children}
    </QueryProvider>
);

describe("business-hook cache invalidation contracts", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test("inventory mutations invalidate all product-dependent server-state", async () => {
        const client = new QueryClient();
        const invalidateSpy = jest.spyOn(
            client,
            "invalidateQueriesByPrefix"
        );

        const { result } = renderHook(
            () => useInventory(),
            {
                wrapper: createWrapper(client)
            }
        );

        await waitFor(() => {
            expect(result.current.loading).toBe(false);
        });

        await act(async () => {
            await result.current.actions.createProduct({
                name: "New Product",
                price: 10,
                stockQuantity: 20
            });
        });

        const createKeys = invalidateSpy.mock.calls.map(
            ([key]) => JSON.stringify(key)
        );

        expect(new Set(createKeys)).toEqual(
            new Set([
                JSON.stringify(["inventory"]),
                JSON.stringify(["pos", "products"]),
                JSON.stringify(["dashboard"]),
                JSON.stringify(["inventory-insights"]),
                JSON.stringify(["forecasting", "products"])
            ])
        );

        invalidateSpy.mockClear();

        await act(async () => {
            await result.current.actions.updateProduct({
                id: 1,
                product: {
                    name: "Updated Product",
                    price: 12,
                    stockQuantity: 15
                }
            });
        });

        const updateKeys = invalidateSpy.mock.calls.map(
            ([key]) => JSON.stringify(key)
        );

        expect(new Set(updateKeys)).toEqual(
            new Set([
                JSON.stringify(["inventory"]),
                JSON.stringify(["pos", "products"]),
                JSON.stringify(["dashboard"]),
                JSON.stringify(["inventory-insights"]),
                JSON.stringify(["forecasting", "products"])
            ])
        );

        invalidateSpy.mockClear();

        await act(async () => {
            await result.current.actions.deleteProduct(1);
        });

        const deleteKeys = invalidateSpy.mock.calls.map(
            ([key]) => JSON.stringify(key)
        );

        expect(new Set(deleteKeys)).toEqual(
            new Set([
                JSON.stringify(["inventory"]),
                JSON.stringify(["pos", "products"]),
                JSON.stringify(["dashboard"]),
                JSON.stringify(["inventory-insights"]),
                JSON.stringify(["forecasting", "products"])
            ])
        );

        expect(InventoryRepository.create).toHaveBeenCalledTimes(1);
        expect(InventoryRepository.update).toHaveBeenCalledTimes(1);
        expect(InventoryRepository.remove).toHaveBeenCalledTimes(1);
    });

    test("POS checkout invalidates all sale-dependent server-state", async () => {
        const client = new QueryClient();
        const invalidateSpy = jest.spyOn(
            client,
            "invalidateQueriesByPrefix"
        );

        const { result } = renderHook(
            () => usePOS(),
            {
                wrapper: createWrapper(client)
            }
        );

        await waitFor(() => {
            expect(result.current.loading).toBe(false);
        });

        act(() => {
            result.current.actions.addToCart(
                {
                    id: 1,
                    name: "Test Product",
                    price: 10,
                    stockQuantity: 10
                },
                1
            );
        });

        await act(async () => {
            await result.current.actions.checkout();
        });

        const checkoutKeys = invalidateSpy.mock.calls.map(
            ([key]) => JSON.stringify(key)
        );

        expect(new Set(checkoutKeys)).toEqual(
            new Set([
                JSON.stringify(["pos", "products"]),
                JSON.stringify(["inventory"]),
                JSON.stringify(["dashboard"]),
                JSON.stringify(["reports"]),
                JSON.stringify(["inventory-insights"]),
                JSON.stringify(["forecasting", "products"]),
                JSON.stringify(["forecasting", "forecast"])
            ])
        );

        expect(POSRepository.checkout).toHaveBeenCalledTimes(1);
    });
});
