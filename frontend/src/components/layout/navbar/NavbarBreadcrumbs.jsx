import React from "react";

const NavbarBreadcrumbs = ({ theme, title = "Dashboard", breadcrumbs = ["Home", "Dashboard"] }) => {
  const { colors, typography, animations } = theme;

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "2px" }}>
      <h2
        style={{
          margin: 0,
          color: colors.text,
          fontWeight: typography.fontWeight.extrabold,
          fontSize: typography.fontSize.lg,
          letterSpacing: typography.letterSpacing.tight,
        }}
      >
        {title}
      </h2>
      <div
        style={{
          fontSize: typography.fontSize.xs,
          color: colors.textMuted,
          fontWeight: typography.fontWeight.medium,
          display: "flex",
          alignItems: "center",
          gap: "6px"
        }}
      >
        {breadcrumbs.map((crumb, index) => {
          const isLast = index === breadcrumbs.length - 1;
          return (
            <React.Fragment key={crumb}>
              {index > 0 && <span style={{ opacity: 0.5 }}>/</span>}
              <span
                style={{
                  cursor: isLast ? "default" : "pointer",
                  color: isLast ? colors.primary : colors.textMuted,
                  transition: animations.transition.base
                }}
              >
                {crumb}
              </span>
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default NavbarBreadcrumbs;