import React, { useState } from "react";
import Navbar from "../components/layout/navbar/Navbar";
import Sidebar from "../components/layout/sidebar/Sidebar";

const AppLayout = ({
    children,
    theme,
    toggleTheme,
    isDark
}) => {
    const { colors, spacing, animations } = theme;
    
    // Layout State
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

    // Dynamic width calculation for smooth transitions
    const sidebarWidth = sidebarCollapsed ? "80px" : "260px";
    const navbarHeight = "72px";

    return (
        <div
            style={{
                display: "flex",
                minHeight: "100vh",
                background: colors.background || (isDark ? "#0B1120" : "#F8FAFC"),
                color: colors.text || (isDark ? "#F8FAFC" : "#0F172A"),
                fontFamily: theme.typography.fontFamily.primary
            }}
        >
            <Sidebar
                theme={theme}
                collapsed={sidebarCollapsed}
                toggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
            />

            <div
                style={{
                    flex: 1,
                    // Dynamically follow the sidebar's width
                    marginLeft: sidebarWidth,
                    display: "flex",
                    flexDirection: "column",
                    // Apply smooth bezier transition for the enterprise feel
                    transition: animations?.transition?.base || "margin-left 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                    // Prevents flexbox blowout when rendering wide data tables
                    minWidth: 0 
                }}
            >
                <Navbar
                    theme={theme}
                    toggleTheme={toggleTheme}
                    isDark={isDark}
                    collapsed={sidebarCollapsed}
                    toggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)}
                    title="Dashboard"
                    breadcrumbs={["Home", "Dashboard"]}
                />

                <main
                    style={{
                        // Offsets the fixed Navbar perfectly
                        marginTop: navbarHeight,
                        // Replaces hardcoded 32px with your spacing token
                        padding: spacing.xl || "32px",
                        flex: 1,
                        overflowX: "hidden"
                    }}
                >
                    {children}
                </main>
            </div>
        </div>
    );
};

export default AppLayout;