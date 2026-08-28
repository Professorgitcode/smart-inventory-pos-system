import { useState, useMemo, useCallback } from "react";

const usePagination = (
    items = [],
    initialPageSize = 10
) => {

    const [currentPage, setCurrentPage] = useState(1);

    const [pageSize, setPageSize] =
        useState(initialPageSize);

    /*
    =====================================
    Calculated Values
    =====================================
    */

    const totalItems = items.length;

    const totalPages = Math.max(
        1,
        Math.ceil(totalItems / pageSize)
    );

    /*
    =====================================
    Paginated Data
    =====================================
    */

    const paginatedItems = useMemo(() => {

        const start =
            (currentPage - 1) * pageSize;

        const end =
            start + pageSize;

        return items.slice(start, end);

    }, [items, currentPage, pageSize]);

    /*
    =====================================
    Navigation
    =====================================
    */

    const nextPage = useCallback(() => {

        setCurrentPage((page) =>
            Math.min(page + 1, totalPages)
        );

    }, [totalPages]);

    const previousPage = useCallback(() => {

        setCurrentPage((page) =>
            Math.max(page - 1, 1)
        );

    }, []);

    const goToPage = useCallback((page) => {

        const target = Math.max(
            1,
            Math.min(page, totalPages)
        );

        setCurrentPage(target);

    }, [totalPages]);

    /*
    =====================================
    Page Size
    =====================================
    */

    const changePageSize = useCallback((size) => {

        setPageSize(size);

        setCurrentPage(1);

    }, []);

    /*
    =====================================
    Reset
    =====================================
    */

    const reset = useCallback(() => {

        setCurrentPage(1);

    }, []);

    /*
    =====================================
    Public API
    =====================================
    */

    return {

        data: paginatedItems,

        pagination: {

            currentPage,

            totalPages,

            totalItems,

            pageSize

        },

        actions: {

            nextPage,

            previousPage,

            goToPage,

            changePageSize,

            reset

        }

    };

};

export default usePagination;