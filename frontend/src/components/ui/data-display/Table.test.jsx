import React from "react";

import {
    fireEvent,
    render,
    screen
} from "@testing-library/react";

import {
    Table
} from "./Table";

describe(
    "Table sorting",
    () => {

        const columns = [
            {
                key: "name",
                label: "Name",
                sortable: true
            },
            {
                key: "stock",
                label: "Stock",
                sortable: true
            }
        ];

        const data = [
            {
                id: 1,
                name: "Beta",
                stock: 20
            },
            {
                id: 2,
                name: "Alpha",
                stock: 5
            },
            {
                id: 3,
                name: "Gamma",
                stock: 12
            }
        ];

        // ====================================
        // INTERNAL SORTING
        // ====================================

        test(
            "sorts an internal dataset ascending and descending",
            () => {

                render(
                    <Table
                        columns={columns}
                        data={data}
                    />
                );

                fireEvent.click(
                    screen.getByText("Name")
                );

                let rows =
                    screen.getAllByRole(
                        "row"
                    );

                expect(
                    rows[1]
                ).toHaveTextContent(
                    "Alpha"
                );

                expect(
                    rows[2]
                ).toHaveTextContent(
                    "Beta"
                );

                expect(
                    rows[3]
                ).toHaveTextContent(
                    "Gamma"
                );

                fireEvent.click(
                    screen.getByText("Name")
                );

                rows =
                    screen.getAllByRole(
                        "row"
                    );

                expect(
                    rows[1]
                ).toHaveTextContent(
                    "Gamma"
                );

                expect(
                    rows[2]
                ).toHaveTextContent(
                    "Beta"
                );

                expect(
                    rows[3]
                ).toHaveTextContent(
                    "Alpha"
                );

            }
        );

        // ====================================
        // NUMERIC SORTING
        // ====================================

        test(
            "sorts numeric values numerically",
            () => {

                render(
                    <Table
                        columns={columns}
                        data={data}
                    />
                );

                fireEvent.click(
                    screen.getByText("Stock")
                );

                const rows =
                    screen.getAllByRole(
                        "row"
                    );

                expect(
                    rows[1]
                ).toHaveTextContent(
                    "Alpha"
                );

                expect(
                    rows[2]
                ).toHaveTextContent(
                    "Gamma"
                );

                expect(
                    rows[3]
                ).toHaveTextContent(
                    "Beta"
                );

            }
        );

        // ====================================
        // CONTROLLED / MANUAL SORTING
        // ====================================

        test(
            "delegates sorting when manual sorting is enabled",
            () => {

                const onSortChange =
                    jest.fn();

                render(
                    <Table
                        columns={columns}
                        data={data}
                        manualSorting
                        sortKey="name"
                        sortDirection="desc"
                        onSortChange={
                            onSortChange
                        }
                    />
                );

                fireEvent.click(
                    screen.getByText("Name")
                );

                expect(
                    onSortChange
                ).toHaveBeenCalledWith(
                    "name",
                    "asc"
                );

                const rows =
                    screen.getAllByRole(
                        "row"
                    );

                // The parent owns sorting in manual mode.
                // Table must not reorder the supplied data.
                expect(
                    rows[1]
                ).toHaveTextContent(
                    "Beta"
                );

                expect(
                    rows[2]
                ).toHaveTextContent(
                    "Alpha"
                );

                expect(
                    rows[3]
                ).toHaveTextContent(
                    "Gamma"
                );

            }
        );

    }
);
