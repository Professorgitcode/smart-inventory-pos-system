// ====================================
// THEMED PAGE ADAPTER
// ====================================
//
// Transitional compatibility layer.
//
// Some legacy pages currently receive
// theme through props.
//
// Newer pages obtain theme directly
// with useTheme().
//
// This adapter allows both patterns
// to coexist while the application is
// migrated incrementally.
// ====================================

import React from "react";

import { useTheme } from "../context/ThemeContext";

const ThemedPage = ({
  component: Component,
  ...props
}) => {
  const { theme } = useTheme();

  return (
    <Component
      {...props}
      theme={theme}
    />
  );
};

export default ThemedPage;