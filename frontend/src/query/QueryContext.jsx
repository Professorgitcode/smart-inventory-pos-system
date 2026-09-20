import React, {
    createContext,
    useContext,
    useMemo
} from "react";

import queryClient from "./QueryClient";

/*
=====================================
Query Context
=====================================

Provides the centralized QueryClient
to the React application.

Components should access the client
through useQueryContext() rather than
importing the singleton directly.
=====================================
*/

const QueryContext = createContext(null);

/*
=====================================
Query Provider
=====================================
*/

export const QueryProvider = ({ children, client = queryClient }) => {

    /*
    =====================================
    Stable Query Client Reference
    =====================================
    */

    const resolvedClient = useMemo(
        () => client,
        [client]
    );

    return (
        <QueryContext.Provider value={resolvedClient}>
            {children}
        </QueryContext.Provider>
    );

};

/*
=====================================
Query Context Hook
=====================================
*/

export const useQueryContext = () => {

    const context = useContext(
        QueryContext
    );

    if (!context) {

        throw new Error(
            "useQueryContext must be used inside QueryProvider."
        );

    }

    return context;

};

export default QueryContext;
