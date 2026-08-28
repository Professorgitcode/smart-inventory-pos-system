import React from "react";

const SidebarSection = ({
    theme,
    title,
    children
}) => {

    const colors = theme.colors;

    return (

        <div
            style={{
                marginBottom: "24px"
            }}
        >

            <div
                style={{
                    fontSize: "11px",
                    color: colors.textMuted,
                    fontWeight: 700,
                    marginBottom: "12px",
                    letterSpacing: "1px"
                }}
            >
                {title}
            </div>

            {children}

        </div>

    );

};

export default SidebarSection;