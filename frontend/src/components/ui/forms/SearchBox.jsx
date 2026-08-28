import React, { useState } from "react";
import theme from "../../../theme/theme";
import { Search, X } from "lucide-react";

export const SearchBox = ({
  value,
  onChange,
  onClear,
  placeholder = "Search across platform resources...",
  isDark = false,
  style = {},
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const mode = theme.getMode(isDark);

  const wrapperStyles = {
    position: "relative",
    display: "flex",
    alignItems: "center",
    width: "100%",
    fontFamily: mode.typography.fontFamily.primary,
  };

  const inputStyles = {
    width: "100%",
    padding: "10px 16px",
    paddingLeft: "40px",
    paddingRight: value ? "40px" : "16px",
    fontSize: mode.typography.fontSize.sm,
    color: mode.colors.text,
    backgroundColor: isDark ? "rgba(18, 26, 47, 0.5)" : mode.colors.surface,
    border: `1px solid ${isFocused ? mode.colors.primary : mode.colors.border}`,
    borderRadius: mode.radius.full,
    outline: "none",
    boxShadow: isFocused ? `0 0 0 3px ${mode.colors.secondary}30` : "none",
    transition: mode.animations.transition.base,
    ...style,
  };

  return (
    <div style={wrapperStyles} {...props}>
      <div style={{ position: "absolute", left: "14px", color: isFocused ? mode.colors.primary : mode.colors.textMuted, display: "flex", alignItems: "center" }}>
        <Search size={18} />
      </div>
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        style={inputStyles}
      />
      {value && onClear && (
        <button
          onClick={onClear}
          style={{
            position: "absolute", right: "14px", background: "none", border: "none", padding: 0,
            cursor: "pointer", display: "flex", alignItems: "center", color: mode.colors.textMuted
          }}
        >
          <X size={16} onMouseEnter={(e) => e.target.style.color = mode.colors.danger} onMouseLeave={(e) => e.target.style.color = mode.colors.textMuted} />
        </button>
      )}
    </div>
  );
};