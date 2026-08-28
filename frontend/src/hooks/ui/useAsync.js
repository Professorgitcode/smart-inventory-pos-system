import { useState, useCallback } from "react";

const useAsync = () => {

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState(null);

    /*
    =====================================
    Execute Async Function
    =====================================
    */

    const execute = useCallback(async (asyncFunction) => {

        try {

            setLoading(true);

            setError(null);

            const result = await asyncFunction();

            return result;

        }

        catch (err) {

            console.error(err);

            setError(err);

            throw err;

        }

        finally {

            setLoading(false);

        }

    }, []);

    /*
    =====================================
    Reset Error
    =====================================
    */

    const clearError = () => {

        setError(null);

    };

    /*
    =====================================
    Public API
    =====================================
    */

    return {

        loading,

        error,

        execute,

        clearError

    };

};

export default useAsync;