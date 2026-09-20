// ====================================
// SUPPLIER HEADER
// ====================================

import React from "react";

import {
    FileText,
    Plus
} from "lucide-react";

import {
    PageHeader,
    Button
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

const SupplierHeader = ({
    onAddSupplier
}) => {

    const {
        isDark
    } = useTheme();

    return (

        <PageHeader

            title="Supplier Intelligence"

            subtitle={
                "Monitor supplier performance, delivery reliability and procurement efficiency."
            }

            actions={

                <>

                    {/* ==================================
                        EXPORT
                        ==================================

                        No supplier export endpoint
                        exists yet, so this remains
                        disabled rather than pretending
                        the feature works.
                    */}

                    <Button
                        variant="outline"
                        size="md"
                        isDark={isDark}
                        icon={FileText}
                        disabled
                        title="Supplier export is not available yet."
                    >
                        Export
                    </Button>

                    {/* ==================================
                        CREATE SUPPLIER
                        ================================== */}

                    <RoleGuard
                        roles={["Admin"]}
                    >
                        <Button
                            variant="primary"
                            size="md"
                            isDark={isDark}
                            icon={Plus}
                            onClick={
                                onAddSupplier
                            }
                        >
                            Add Supplier
                        </Button>
                    </RoleGuard>

                </>

            }

        />

    );
};

export default SupplierHeader;