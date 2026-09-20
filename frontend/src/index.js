import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";

import App from "./App";

import reportWebVitals from "./reportWebVitals";

import {
  BrowserRouter
} from "react-router-dom";

import {
  QueryProvider
} from "./query";

import {
  AuthProvider
} from "./auth";

import {
  ThemeProvider
} from "./context/ThemeContext";


/*
=====================================
Application Bootstrap
=====================================

The application is initialized through
the centralized providers so that the
complete React application has access
to:

- routing
- server-state management
- theme state
- authentication state

Provider hierarchy:

React
  ↓
StrictMode
  ↓
BrowserRouter
  ↓
QueryProvider
  ↓
ThemeProvider
  ↓
AuthProvider
  ↓
App
  ↓
Application Components

=====================================
*/

const root = ReactDOM.createRoot(
  document.getElementById("root")
);

root.render(
  <React.StrictMode>

    <BrowserRouter>

      <QueryProvider>

        <ThemeProvider>

          <AuthProvider>

            <App />

          </AuthProvider>

        </ThemeProvider>

      </QueryProvider>

    </BrowserRouter>

  </React.StrictMode>
);

reportWebVitals();