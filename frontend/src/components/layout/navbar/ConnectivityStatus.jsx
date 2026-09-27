import React, { useEffect, useState } from "react";
import {
    Wifi,
    ChevronDown,
    ChevronUp,
    Info
} from "lucide-react";

const ConnectivityStatus = ({ theme, isDark }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isOnline, setIsOnline] = useState(() => navigator.onLine);

    // ====================================
    // NETWORK STATE MONITORING
    // ====================================

    useEffect(() => {
        const handleOnline = () => setIsOnline(true);
        const handleOffline = () => setIsOnline(false);

        window.addEventListener("online", handleOnline);
        window.addEventListener("offline", handleOffline);

        return () => {
            window.removeEventListener("online", handleOnline);
            window.removeEventListener("offline", handleOffline);
        };
    }, []);

    // ====================================
    // DISPLAY STATE
    // ====================================

    const statusColor = isOnline ? "#10b981" : "#ef4444";
    const statusLabel = isOnline ? "ONLINE" : "OFFLINE";

    // ====================================
    // RENDER
    // ====================================

    return (
        <div
            style={{
                position: "relative"
            }}
        >
            <button
                type="button"
                onClick={() => setIsOpen((current) => !current)}
                style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    padding: "6px 14px",
                    borderRadius: "20px",
                    border: `1px solid ${statusColor}`,
                    backgroundColor: isDark
                        ? `${statusColor}20`
                        : `${statusColor}12`,
                    color: statusColor,
                    fontSize: "0.75rem",
                    fontWeight: "700",
                    cursor: "pointer",
                    transition: "all 0.2s"
                }}
                aria-expanded={isOpen}
                aria-label="View network status"
            >
                <Wifi size={14} />

                NETWORK: {statusLabel}

                {isOpen ? (
                    <ChevronUp size={14} />
                ) : (
                    <ChevronDown size={14} />
                )}
            </button>

            {isOpen && (
                <div
                    style={{
                        position: "absolute",
                        top: "120%",
                        left: 0,
                        width: "320px",
                        backgroundColor: isDark
                            ? "#1e293b"
                            : "#ffffff",
                        border: `1px solid ${
                            isDark
                                ? "rgba(255,255,255,0.1)"
                                : "#e2e8f0"
                        }`,
                        borderRadius: "8px",
                        padding: "16px",
                        boxShadow:
                            "0 10px 15px -3px rgba(0,0,0,0.1)",
                        zIndex: 1001,
                        display: "flex",
                        flexDirection: "column",
                        gap: "12px"
                    }}
                >
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                            fontSize: "0.85rem",
                            color: isDark
                                ? "#cbd5e1"
                                : "#475569"
                        }}
                    >
                        <Info size={14} />

                        <span>Network Status</span>

                        <span
                            style={{
                                marginLeft: "auto",
                                display: "flex",
                                alignItems: "center",
                                gap: "6px",
                                color: statusColor,
                                fontWeight: "700"
                            }}
                        >
                            <span
                                style={{
                                    width: "8px",
                                    height: "8px",
                                    backgroundColor: statusColor,
                                    borderRadius: "50%"
                                }}
                            />

                            {statusLabel}
                        </span>
                    </div>

                    <div
                        style={{
                            fontSize: "0.8rem",
                            lineHeight: "1.5",
                            color: isDark
                                ? "#94a3b8"
                                : "#64748b"
                        }}
                    >
                        {isOnline
                            ? "Your browser currently reports an active network connection."
                            : "Your browser currently reports that the network connection is unavailable."
                        }
                    </div>

                    <div
                        style={{
                            padding: "10px 12px",
                            borderRadius: "8px",
                            background: isDark
                                ? "rgba(255,255,255,0.04)"
                                : "#f8fafc",
                            fontSize: "0.75rem",
                            lineHeight: "1.5",
                            color: isDark
                                ? "#94a3b8"
                                : "#64748b"
                        }}
                    >
                        This status reflects the browser network state.
                        It does not verify API, database, or backend
                        availability.
                    </div>
                </div>
            )}
        </div>
    );
};

export default ConnectivityStatus;