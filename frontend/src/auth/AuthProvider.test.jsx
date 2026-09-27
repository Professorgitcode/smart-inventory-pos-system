import React from "react";
import { act, renderHook, waitFor } from "@testing-library/react";

import { QueryProvider } from "../query";
import { QueryClient } from "../query/QueryClient";
import AuthRepository from "../repositories/auth/AuthRepository";
import AuthProvider from "./AuthProvider";
import useAuth from "./useAuth";

jest.mock("../repositories/auth/AuthRepository", () => ({
  __esModule: true,
  default: {
    login: jest.fn(),
    logout: jest.fn(),
    fetchProfile: jest.fn()
  }
}));

jest.mock("./authStorage", () => ({
  getToken: jest.fn(),
  getUser: jest.fn(),
  getExpiresAt: jest.fn(),
  saveAuth: jest.fn(),
  clearAuth: jest.fn()
}));

import {
  getToken,
  getUser,
  getExpiresAt
} from "./authStorage";

const createWrapper = (client) => ({ children }) => (
  <QueryProvider client={client}>
    <AuthProvider>
      {children}
    </AuthProvider>
  </QueryProvider>
);

describe("AuthProvider", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    getToken.mockReturnValue(null);
    getUser.mockReturnValue(null);
    getExpiresAt.mockReturnValue(null);

    AuthRepository.login.mockResolvedValue({
      token: "new-token",
      user: {
        id: 2,
        username: "user-two",
        role: "User"
      },
      expiresAt: "2099-01-01T00:00:00.000Z"
    });

    AuthRepository.logout.mockResolvedValue(null);
  });

  test("clears cached server-state during session restoration", async () => {
    const client = new QueryClient();

    client.setQueryData(
      ["inventory"],
      { products: ["previous-user-data"] },
      { staleTime: Infinity }
    );

    const { result } = renderHook(
      () => useAuth(),
      {
        wrapper: createWrapper(client)
      }
    );

    await waitFor(() =>
      expect(result.current.isInitializing).toBe(false)
    );

    expect(client.getQueryData(["inventory"])).toBeUndefined();
  });

  test("clears previous server-state before establishing a new login session", async () => {
    const client = new QueryClient();

    const { result } = renderHook(
      () => useAuth(),
      {
        wrapper: createWrapper(client)
      }
    );

    await waitFor(() =>
      expect(result.current.isInitializing).toBe(false)
    );

    client.setQueryData(
      ["inventory"],
      { products: ["previous-user-data"] },
      { staleTime: Infinity }
    );

    await act(async () => {
      await result.current.login({
        username: "user-two",
        password: "password"
      });
    });

    expect(AuthRepository.login).toHaveBeenCalledTimes(1);
    expect(result.current.isAuthenticated).toBe(true);
    expect(result.current.user.username).toBe("user-two");
    expect(client.getQueryData(["inventory"])).toBeUndefined();
  });

  test("clears server-state when the authenticated session is logged out", async () => {
    const client = new QueryClient();

    const { result } = renderHook(
      () => useAuth(),
      {
        wrapper: createWrapper(client)
      }
    );

    await waitFor(() =>
      expect(result.current.isInitializing).toBe(false)
    );

    await act(async () => {
      await result.current.login({
        username: "user-two",
        password: "password"
      });
    });

    client.setQueryData(
      ["inventory"],
      { products: ["authenticated-user-data"] },
      { staleTime: Infinity }
    );

    await act(async () => {
      await result.current.logout();
    });

    expect(AuthRepository.logout).toHaveBeenCalledTimes(1);
    expect(result.current.isAuthenticated).toBe(false);
    expect(result.current.user).toBeNull();
    expect(client.getQueryData(["inventory"])).toBeUndefined();
  });
});
