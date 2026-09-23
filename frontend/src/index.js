import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";

import App from "./App";

import AppProviders
    from "./app/AppProviders";

import reportWebVitals
    from "./reportWebVitals";

// ====================================
// APPLICATION BOOTSTRAP
// ====================================
// Entry point.
//
// ReactDOM is responsible only for
// starting the React application.
//
// Provider composition lives in
// AppProviders so the bootstrap boundary
// remains explicit and maintainable.
// ====================================

const root = ReactDOM.createRoot(
    document.getElementById("root")
);

root.render(

    <React.StrictMode>

        <AppProviders>

            <App />

        </AppProviders>

    </React.StrictMode>

);

reportWebVitals();
