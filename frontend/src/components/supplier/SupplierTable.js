// ====================================
// SUPPLIER TABLE
// ====================================

import React, {
    useMemo
} from "react";

import {
    Trash2
} from "lucide-react";

import {
    Card,
    Table,
    SearchBox,
    Badge,
    Button,
    SkeletonLoader,
    Alert
} from "../ui";

import {
    RoleGuard
} from "../../auth";

import {
    useTheme
} from "../../context/ThemeContext";

// ====================================
// COMPONENT
// ====================================

const SupplierTable = ({
    suppliers = [],
    search,
    setSearch,
    onDelete,
    loading = false,
    error = null,
    isDeleting = false,
    pagination
}) => {

    const {
        theme,
        isDark
    } = useTheme();

    // ====================================
    // TABLE DATA
    // ====================================
    //
    // Shared Table expects "id".
    // Backend supplier records use
    // "supplierId", so we provide a
    // UI-level identifier.
    // ====================================

    const tableData =
        useMemo(
            () =>
                suppliers.map(
                    supplier => ({
                        ...supplier,
                        id:
                            supplier.supplierId
                    })
                ),
            [suppliers]
        );

    // ====================================
    // COLUMNS
    // ====================================

    const columns = useMemo(
        () => [
            {
                key:
                    "supplierName",
                label:
                    "Supplier"
            },
            {
                key:
                    "contactPerson",
                label:
                    "Contact"
            },
            {
                key:
                    "phone",
                label:
                    "Phone"
            },
            {
                key:
                    "rating",
                label:
                    "Rating",
                render:
                    value =>
                        Number(
                            value || 0
                        ).toFixed(1)
            },
            {
                key:
                    "averageLeadTime",
                label:
                    "Lead Time",
                render:
                    value =>
                        `${Number(
                            value || 0
                        ).toFixed(0)} Days`
            },
            {
                key:
                    "intelligenceScore",
                label:
                    "Score",
                render:
                    value =>
                        Number(
                            value || 0
                        ).toFixed(1)
            },
            {
                key:
                    "riskLevel",
                label:
                    "Risk",
                render:
                    value => (
                        <Badge
                            variant={
                                value === "High"
                                    ? "danger"
                                    : value === "Medium"
                                        ? "warning"
                                        : "success"
                            }
                            isDark={isDark}
                        >
                            {value || "Unknown"}
                        </Badge>
                    )
            },
            {
                key:
                    "status",
                label:
                    "Status",
                render:
                    value => (
                        <Badge
                            variant={
                                String(
                                    value
                                ).toLowerCase() ===
                                "active"
                                    ? "success"
                                    : "warning"
                            }
                            isDark={isDark}
                        >
                            {value || "Unknown"}
                        </Badge>
                    )
            },
            {
                key:
                    "actions",
                label:
                    "Actions",
                render:
                    (_, supplier) => (

                        <RoleGuard
                            roles={["Admin"]}
                        >
                            <Button
                                variant="icon"
                                isDark={isDark}
                                icon={Trash2}
                                isLoading={
                                    isDeleting
                                }
                                disabled={
                                    isDeleting
                                }
                                onClick={() =>
                                    onDelete(
                                        supplier.supplierId
                                    )
                                }
                                aria-label={
                                    `Delete ${supplier.supplierName}`
                                }
                                style={{
                                    color:
                                        theme.colors.danger
                                }}
                            />
                        </RoleGuard>

                    )
            }
        ],
        [
            isDark,
            isDeleting,
            onDelete,
            theme.colors.danger
        ]
    );

    // ====================================
    // LOADING
    // ====================================

    if (loading) {

        return (

            <Card
                isDark={isDark}
            >

                <SearchBox
                    value={search}
                    onChange={
                        event =>
                            setSearch(
                                event.target.value
                            )
                    }
                    onClear={() =>
                        setSearch("")
                    }
                    isDark={isDark}
                    placeholder={
                        "Search suppliers..."
                    }
                />

                <div
                    style={{
                        marginTop: "24px",
                        display: "flex",
                        flexDirection:
                            "column",
                        gap: "12px"
                    }}
                >

                    {Array.from(
                        { length: 6 }
                    ).map(
                        (_, index) => (

                            <SkeletonLoader
                                key={index}
                                variant="rect"
                                height="42px"
                                isDark={isDark}
                            />

                        )
                    )}

                </div>

            </Card>

        );

    }

    // ====================================
    // ERROR
    // ====================================

    if (error) {

        return (

            <Alert
                variant="danger"
                isDark={isDark}
                title="Supplier data error"
            >
                Unable to load supplier
                records.
            </Alert>

        );

    }

    return (

        <Card
            isDark={isDark}
        >

            <div
                style={{
                    display: "flex",
                    justifyContent:
                        "space-between",
                    alignItems: "center",
                    gap: "16px",
                    marginBottom: "20px",
                    flexWrap: "wrap"
                }}
            >

                <div>

                    <h3
                        style={{
                            margin: 0,
                            color:
                                theme.colors.text
                        }}
                    >
                        Supplier Directory
                    </h3>

                    <div
                        style={{
                            marginTop: "4px",
                            color:
                                theme.colors.textMuted,
                            fontSize:
                                theme.typography.fontSize.xs
                        }}
                    >
                        {tableData.length}{" "}
                        suppliers displayed
                    </div>

                </div>

                <div
                    style={{
                        width:
                            "min(320px, 100%)"
                    }}
                >

                    <SearchBox
                        value={search}
                        onChange={
                            event =>
                                setSearch(
                                    event.target.value
                                )
                        }
                        onClear={() =>
                            setSearch("")
                        }
                        isDark={isDark}
                        placeholder={
                            "Search suppliers..."
                        }
                    />

                </div>

            </div>

            {tableData.length === 0 ? (

                <Alert
                    variant="info"
                    isDark={isDark}
                    title="No suppliers found"
                >
                    No supplier records match
                    the current search.
                </Alert>

            ) : (

                <Table
                    columns={columns}
                    data={tableData}
                    isDark={isDark}
                    stickyHeader
                    pagination={
                        pagination
                            ? {
                                totalItems:
                                    pagination.totalItems,
                                itemsPerPage:
                                    pagination.pageSize,
                                currentPage:
                                    pagination.currentPage,
                                onPageChange:
                                    pagination.onPageChange
                            }
                            : undefined
                    }
                />

            )}

        </Card>

    );

};

export default SupplierTable;