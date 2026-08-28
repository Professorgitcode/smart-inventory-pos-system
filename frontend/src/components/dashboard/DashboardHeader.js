import React from "react";

const DashboardHeader = ({ theme }) => {

    const hour = new Date().getHours();

    let greeting = "Good Evening";

    if (hour < 12)
        greeting = "Good Morning";

    else if (hour < 18)
        greeting = "Good Afternoon";

    return (

        <div
            style={{
                marginBottom: 30
            }}
        >

            <h1
                style={{
                    margin: 0,
                    fontSize: 32,
                    fontWeight: 700,
                    color: theme.colors.text
                }}
            >
                {greeting}
            </h1>

            <p
                style={{
                    marginTop: 8,
                    color: theme.colors.textMuted,
                    fontSize: 15
                }}
            >
                Welcome back. Here's today's business overview.
            </p>

        </div>

    );

};

export default DashboardHeader;