import React from "react";

import {
    act,
    renderHook
} from "@testing-library/react";

import {
    useQuery,
    useMutation
} from "../../../query";

import usePOS from "./usePOS";

const mockMutate = jest.fn();

let mockProducts = [];
let mockProductLoading = false;
let mockProductError = null;
let mockCheckoutError = null;

jest.mock("../../../query", () => ({
    useQuery: jest.fn(),
    useMutation: jest.fn()
}));

jest.mock("../../../repositories/pos/POSRepository", () => ({
    __esModule: true,
    default: {
        getProducts: jest.fn(),
        checkout: jest.fn()
    }
}));

const productA = {
    id: 1,
    name: "Phone A",
    price: 100,
    stockQuantity: 3
};

const productB = {
    id: 2,
    name: "Phone B",
    price: 50,
    stockQuantity: 5
};

describe("usePOS", () => {
    beforeEach(() => {

    jest.clearAllMocks();

    mockProducts = [
        productA,
        productB
    ];

    mockProductLoading = false;
    mockProductError = null;
    mockCheckoutError = null;

    mockMutate.mockResolvedValue({
        orderId: 101
    });

    useQuery.mockImplementation(() => ({
        data: mockProducts,
        loading: mockProductLoading,
        error: mockProductError,
        refetch: jest.fn()
    }));

    useMutation.mockImplementation(() => ({
        mutate: mockMutate,
        isLoading: false,
        error: mockCheckoutError
    }));

});

    test("adds products to the cart and calculates the current transaction total", () => {
        const { result } = renderHook(() => usePOS());

        act(() => {
            result.current.actions.addToCart(productA);
            result.current.actions.addToCart(productB, 2);
        });

        expect(result.current.cart).toHaveLength(2);
        expect(result.current.cart[0].quantity).toBe(1);
        expect(result.current.cart[1].quantity).toBe(2);
        expect(result.current.subtotal).toBe(200);
        expect(result.current.tax).toBe(0);
        expect(result.current.total).toBe(200);
    });

    test("does not allow cart quantity to exceed available stock", () => {
        const { result } = renderHook(() => usePOS());

        act(() => {
            result.current.actions.addToCart(productA, 3);
            result.current.actions.addToCart(productA, 1);
        });

        expect(result.current.cart).toHaveLength(1);
        expect(result.current.cart[0].quantity).toBe(3);
    });

    test("sends only the backend-supported checkout payload and clears the cart after success", async () => {
        const { result } = renderHook(() => usePOS());

        act(() => {
            result.current.actions.addToCart(productA, 2);
            result.current.actions.addToCart(productB);
        });

        await act(async () => {
            await result.current.actions.checkout();
        });

        expect(mockMutate).toHaveBeenCalledWith({
            items: [
                {
                    productId: 1,
                    quantity: 2
                },
                {
                    productId: 2,
                    quantity: 1
                }
            ]
        });

        expect(result.current.cart).toEqual([]);
    });

    test("retains the cart when checkout fails", async () => {
        mockMutate.mockRejectedValueOnce(
            new Error("Not enough stock for Phone A")
        );

        const { result } = renderHook(() => usePOS());

        act(() => {
            result.current.actions.addToCart(productA, 2);
        });

        await expect(
            act(async () => {
                await result.current.actions.checkout();
            })
        ).rejects.toThrow("Not enough stock for Phone A");

        expect(result.current.cart).toHaveLength(1);
        expect(result.current.cart[0].quantity).toBe(2);
    });

    test("keeps catalogue errors separate from checkout errors", () => {
        mockProductError = new Error("Catalogue unavailable");
        mockCheckoutError = new Error("Checkout failed");

        const { result } = renderHook(() => usePOS());

        expect(result.current.error).toBe(
            mockProductError
        );
        expect(result.current.checkoutError).toBe(
            mockCheckoutError
        );
    });

    test("rejects checkout when the cart is empty", async () => {
        const { result } = renderHook(() => usePOS());

        await expect(
            act(async () => {
                await result.current.actions.checkout();
            })
        ).rejects.toThrow(
            "Cannot checkout an empty cart."
        );

        expect(mockMutate).not.toHaveBeenCalled();
    });
});
