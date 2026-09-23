import React from "react";

import {
    BrowserRouter
} from "react-router-dom";

import {
    QueryProvider
} from "../query";

import {
    ThemeProvider
} from "../context/ThemeContext";

import {
    AuthProvider
} from "../auth";

// ====================================
// APPLICATION PROVIDERS
// ====================================
// Centralized dependency composition for
// the React application.
//
// Provider order is intentional:
//
// BrowserRouter
//     ↓
// QueryProvider
//     ↓
// ThemeProvider
//     ↓
// AuthProvider
//     ↓
// Application
//
// Responsibilities:
// - routing context
// - server-state context
// - theme context
// - authentication context
//
// Business logic does not belong here.
// ====================================

const AppProviders = ({
    children
}) => {

    return (

        <BrowserRouter>

            <QueryProvider>

                <ThemeProvider>

                    <AuthProvider>

                        {children}

                    </AuthProvider>

                </ThemeProvider>

            </QueryProvider>

        </BrowserRouter>

    );

};

export default AppProviders;
