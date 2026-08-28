import React from "react";
import { UserCircle } from "lucide-react";

const SidebarProfile = ({ theme }) => {

    const colors = theme.colors;

    return (

        <div
            style={{
                display: "flex",
                alignItems: "center",
                gap: "12px"
            }}
        >

            <UserCircle
                size={42}
                color={colors.primary}
            />

            <div>

                <div
                    style={{
                        color: colors.text,
                        fontWeight: 700
                    }}
                >
                    Albert Ryan
                </div>

                <div
                    style={{
                        fontSize: "12px",
                        color: colors.textMuted
                    }}
                >
                    Administrator
                </div>

            </div>

        </div>

    );

};

export default SidebarProfile;