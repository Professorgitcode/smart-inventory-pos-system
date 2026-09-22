import React, {
    useState
} from "react";

import {
    ChevronDown,
    Download,
    FileSpreadsheet,
    FileText
} from "lucide-react";

import {
    Button
} from "../ui";

import {
    useTheme
} from "../../context/ThemeContext";

// ====================================
// EXPORT OPTIONS
// ====================================

const EXPORT_OPTIONS = [
    {
        value: "pdf",
        label: "PDF",
        icon: FileText
    },
    {
        value: "excel",
        label: "Excel",
        icon: FileSpreadsheet
    },
    {
        value: "csv",
        label: "CSV",
        icon: FileSpreadsheet
    },
    {
        value: "docx",
        label: "DOCX",
        icon: FileText
    }
];

// ====================================
// COMPONENT
// ====================================

const ReportExportMenu = ({
    onExport,
    loading = false
}) => {

    const {
        theme,
        isDark
    } = useTheme();

    const [
        open,
        setOpen
    ] = useState(false);

    const handleExport = (
        format
    ) => {

        setOpen(false);

        onExport(
            format
        );

    };

    return (

        <div
            style={{
                position: "relative"
            }}
        >

            <Button
                variant="primary"
                size="md"
                isDark={isDark}
                icon={Download}
                disabled={loading}
                onClick={() =>
                    setOpen(
                        previous =>
                            !previous
                    )
                }
            >
                Export

                <ChevronDown
                    size={15}
                    style={{
                        marginLeft: "4px"
                    }}
                />

            </Button>

            {open && (

                <div
                    style={{
                        position: "absolute",
                        top: "calc(100% + 8px)",
                        right: 0,
                        minWidth: "180px",
                        padding: "6px",
                        borderRadius:
                            theme.radius.lg,
                        border:
                            `1px solid ${theme.colors.border}`,
                        backgroundColor:
                            theme.colors.surfaceGlass,
                        boxShadow:
                            theme.shadows.lg,
                        backdropFilter:
                            "blur(16px)",
                        zIndex: 100
                    }}
                >

                    {EXPORT_OPTIONS.map(
                        option => {

                            const Icon =
                                option.icon;

                            return (

                                <button
                                    key={
                                        option.value
                                    }
                                    type="button"
                                    onClick={() =>
                                        handleExport(
                                            option.value
                                        )
                                    }
                                    style={{
                                        width: "100%",
                                        display:
                                            "flex",
                                        alignItems:
                                            "center",
                                        gap: "9px",
                                        padding:
                                            "10px 11px",
                                        border: "none",
                                        borderRadius:
                                            theme.radius.md,
                                        background:
                                            "transparent",
                                        color:
                                            theme.colors.text,
                                        cursor:
                                            "pointer",
                                        textAlign:
                                            "left",
                                        fontSize:
                                            theme.typography
                                                .fontSize.sm
                                    }}
                                    onMouseEnter={
                                        event => {
                                            event.currentTarget.style.backgroundColor =
                                                theme.colors.surfaceHover;
                                        }
                                    }
                                    onMouseLeave={
                                        event => {
                                            event.currentTarget.style.backgroundColor =
                                                "transparent";
                                        }
                                    }
                                >

                                    <Icon
                                        size={16}
                                        color={
                                            theme.colors.primary
                                        }
                                    />

                                    Export as{" "}
                                    {option.label}

                                </button>

                            );

                        }
                    )}

                </div>

            )}

        </div>

    );

};

export default ReportExportMenu;
