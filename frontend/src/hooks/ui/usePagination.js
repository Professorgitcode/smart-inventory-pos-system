import {
    useState,
    useMemo,
    useCallback,
    useEffect
} from "react";

const usePagination = (
    items = [],
    initialPageSize = 10
) => {

    const [
        currentPage,
        setCurrentPage
    ] = useState(1);

    const [
        pageSize,
        setPageSize
    ] = useState(
        initialPageSize
    );

    // ====================================
    // CALCULATED VALUES
    // ====================================

    const totalItems =
        items.length;

    const totalPages =
        Math.max(
            1,
            Math.ceil(
                totalItems / pageSize
            )
        );

    // ====================================
    // KEEP PAGE VALID
    // ====================================

    useEffect(() => {

        setCurrentPage(
            page =>
                Math.min(
                    page,
                    totalPages
                )
        );

    }, [
        totalPages,
        items.length
    ]);

    // ====================================
    // PAGINATED DATA
    // ====================================

    const paginatedItems =
        useMemo(() => {

            const start =
                (currentPage - 1) *
                pageSize;

            const end =
                start + pageSize;

            return items.slice(
                start,
                end
            );

        }, [
            items,
            currentPage,
            pageSize
        ]);

    // ====================================
    // NAVIGATION
    // ====================================

    const nextPage =
        useCallback(() => {

            setCurrentPage(
                page =>
                    Math.min(
                        page + 1,
                        totalPages
                    )
            );

        }, [totalPages]);

    const previousPage =
        useCallback(() => {

            setCurrentPage(
                page =>
                    Math.max(
                        page - 1,
                        1
                    )
            );

        }, []);

    const goToPage =
        useCallback(
            page => {

                const target =
                    Math.max(
                        1,
                        Math.min(
                            page,
                            totalPages
                        )
                    );

                setCurrentPage(
                    target
                );

            },
            [totalPages]
        );

    // ====================================
    // PAGE SIZE
    // ====================================

    const changePageSize =
        useCallback(size => {

            const nextSize =
                Math.max(
                    1,
                    Number(size) || 10
                );

            setPageSize(
                nextSize
            );

            setCurrentPage(1);

        }, []);

    // ====================================
    // RESET
    // ====================================

    const reset =
        useCallback(() => {

            setCurrentPage(1);

        }, []);

    // ====================================
    // PUBLIC API
    // ====================================

    return {

        data:
            paginatedItems,

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