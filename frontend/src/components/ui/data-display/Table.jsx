import React, { useState } from "react";
import theme from "../../../theme/theme";
import { ChevronUp, ChevronDown, ChevronLeft, ChevronRight, MoreVertical } from "lucide-react";
import { Button } from "../forms/Button";

export const Table = ({
  columns = [], // Array of { key, label, sortable, width, render }
  data = [],    // Array of objects matching keys
  isDark = false,
  stickyHeader = true,
  onRowClick,
  pagination = { totalItems: 0, itemsPerPage: 10, currentPage: 1, onPageChange: () => {} },
  ...props
}) => {
  const [sortKey, setSortKey] = useState(null);
  const [sortDirection, setSortDirection] = useState("asc"); // asc, desc
  const [hoveredRow, setHoveredRow] = useState(null);
  
  const mode = theme.getMode(isDark);

  const handleSort = (key) => {
    if (sortKey === key) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortDirection("asc");
    }
  };

  const tableWrapperStyles = {
    width: "100%",
    overflowX: "auto",
    borderRadius: mode.radius.lg,
    border: `1px solid ${mode.colors.border}`,
    backgroundColor: mode.colors.surface,
    boxShadow: mode.shadows.sm,
  };

  const thStyles = (column) => ({
    padding: `${mode.spacing.sm} ${mode.spacing.md}`,
    backgroundColor: isDark ? "#17223B" : "#F4F8FA",
    color: mode.colors.textMuted,
    fontSize: mode.typography.fontSize.xs,
    fontWeight: mode.typography.fontWeight.semibold,
    textTransform: "uppercase",
    letterSpacing: mode.typography.letterSpacing.wide,
    textAlign: "left",
    borderBottom: `2px solid ${mode.colors.border}`,
    position: stickyHeader ? "sticky" : "static",
    top: 0,
    zIndex: 10,
    cursor: column.sortable ? "pointer" : "default",
    userSelect: "none",
    width: column.width || "auto",
    transition: mode.animations.transition.base,
  });

  const tdStyles = (rowIndex) => ({
    padding: `${mode.spacing.md}`,
    fontSize: mode.typography.fontSize.sm,
    color: mode.colors.text,
    borderBottom: `1px solid ${mode.colors.border}`,
    backgroundColor: hoveredRow === rowIndex ? mode.colors.surfaceHover : "transparent",
    cursor: onRowClick ? "pointer" : "default",
    transition: "background-color 150ms ease",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  });

  // Calculate pages
  const totalPages = Math.ceil(pagination.totalItems / pagination.itemsPerPage) || 1;

  return (
    <div style={{ width: "100%" }}>
      <div style={tableWrapperStyles} {...props}>
        <table style={{ width: "100%", borderCollapse: "separate", borderSpacing: 0, tableLayout: "fixed" }}>
          <thead>
            <tr>
              {columns.map((col) => (
                <th
                  key={col.key}
                  style={thStyles(col)}
                  onClick={() => col.sortable && handleSort(col.key)}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: mode.spacing.xxs }}>
                    {col.label}
                    {col.sortable && sortKey === col.key && (
                      sortDirection === "asc" ? <ChevronUp size={14} /> : <ChevronDown size={14} />
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.length === 0 ? (
              <tr>
                <td colSpan={columns.length} style={{ padding: mode.spacing.huge, textAlign: "center", color: mode.colors.textMuted, fontSize: mode.typography.fontSize.sm }}>
                  No transactional data available.
                </td>
              </tr>
            ) : (
              data.map((row, rowIndex) => (
                <tr
                  key={row.id || rowIndex}
                  onMouseEnter={() => setHoveredRow(rowIndex)}
                  onMouseLeave={() => setHoveredRow(null)}
                  onClick={() => onRowClick?.(row)}
                >
                  {columns.map((col) => (
                    <td key={col.key} style={tdStyles(rowIndex)}>
                      {col.render ? col.render(row[col.key], row) : row[col.key]}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      {pagination.totalItems > 0 && (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: `${mode.spacing.md} ${mode.spacing.xs}`, fontFamily: mode.typography.fontFamily.primary }}>
          <span style={{ fontSize: mode.typography.fontSize.xs, color: mode.colors.textMuted }}>
            Showing Page <strong>{pagination.currentPage}</strong> of {totalPages} ({pagination.totalItems} entries)
          </span>
          <div style={{ display: "flex", alignItems: "center", gap: mode.spacing.xxs }}>
            <Button
              variant="outline"
              size="sm"
              isDark={isDark}
              disabled={pagination.currentPage === 1}
              onClick={() => pagination.onPageChange(pagination.currentPage - 1)}
            >
              <ChevronLeft size={16} />
            </Button>
            <Button
              variant="outline"
              size="sm"
              isDark={isDark}
              disabled={pagination.currentPage === totalPages}
              onClick={() => pagination.onPageChange(pagination.currentPage + 1)}
            >
              <ChevronRight size={16} />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};