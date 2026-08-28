import React from "react";
import { Search } from "lucide-react";

const NavbarSearch = ({ theme, isDark, searchTerm, setSearchTerm }) => {
  const { colors, spacing, radius, typography, animations } = theme;

  return (
    <div style={{ flex: 1.5, display: "flex", justifyContent: "center" }}>
      <div
        style={{
          width: "100%",
          maxWidth: "520px",
          display: "flex",
          alignItems: "center",
          gap: spacing.sm,
          background: isDark ? "rgba(255,255,255,0.03)" : colors.surface,
          padding: "8px 16px",
          borderRadius: radius.full,
          border: `1px solid ${isDark ? "rgba(255,255,255,0.08)" : colors.border}`,
          boxShadow: "inset 0 2px 4px rgba(0,0,0,0.02)",
          transition: animations.transition.base,
        }}
      >
        <Search size={16} color={colors.textMuted} />
        <input
          type="text"
          placeholder="Search products, invoices, suppliers..."
          value={searchTerm}
          onChange={(e) => setSearchTerm && setSearchTerm(e.target.value)}
          style={{
            flex: 1,
            border: "none",
            outline: "none",
            background: "transparent",
            color: colors.text,
            fontSize: typography.fontSize.sm,
            fontFamily: typography.fontFamily.primary,
          }}
        />
        <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
          <span style={{ fontSize: "10px", padding: "2px 6px", borderRadius: "4px", background: isDark ? "rgba(255,255,255,0.1)" : colors.surfaceHover, color: colors.textMuted, fontWeight: 600 }}>⌘</span>
          <span style={{ fontSize: "10px", padding: "2px 6px", borderRadius: "4px", background: isDark ? "rgba(255,255,255,0.1)" : colors.surfaceHover, color: colors.textMuted, fontWeight: 600 }}>K</span>
        </div>
      </div>
    </div>
  );
};

export default NavbarSearch;