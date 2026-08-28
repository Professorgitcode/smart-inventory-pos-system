import React from "react";
import { Boxes } from "lucide-react";

const SidebarHeader = ({ theme }) => {

    const colors = theme.colors;

    return (

        <div
            style={{
                display: "flex",
                alignItems: "center",
                gap: "14px",
                paddingBottom: "28px",
                borderBottom: `1px solid ${colors.border}`
            }}
        >

            <div
                style={{
                    width: "48px",
                    height: "48px",
                    borderRadius: "14px",
                    background: colors.primary,

                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                }}
            >

                <Boxes
                    size={24}
                    color="white"
                />

            </div>

            <div>

                <div
                    style={{
                        fontWeight: 700,
                        fontSize: "18px",
                        color: colors.text
                    }}
                >
                    Smart Inventory
                </div>

                <div
                    style={{
                        fontSize: "12px",
                        color: colors.textMuted
                    }}
                >
                    Enterprise POS
                </div>

            </div>

        </div>

    );

};

export default SidebarHeader;