import {
    useCallback,
    useEffect,
    useRef,
    useState
} from "react";

import { useQueryContext } from "./QueryContext";


/*
=====================================
useMutation
=====================================

Reusable server-state mutation hook
responsible for:

- POST operations
- PUT operations
- PATCH operations
- DELETE operations
- Mutation loading state
- Mutation errors
- Mutation results
- Cache invalidation
- Success callbacks
- Error callbacks
- Component lifecycle safety

Expected usage:

const {
    mutate,
    data,
    loading,
    error,
    reset
} = useMutation(
    (product) =>
        ProductRepository.create(product),
    {
        invalidateKeys: [
            "inventory"
        ]
    }
);

=====================================
*/

const useMutation = (
    mutationFn,
    options = {}
) => {

    const queryClient =
        useQueryContext();


    /*
    =====================================
    Options
    =====================================
    */

    const {
        invalidateKeys = [],
        onSuccess,
        onError,
        throwOnError = false
    } = options;


    /*
    =====================================
    Stable References
    =====================================
    */

    const mutationFnRef =
        useRef(mutationFn);

    const onSuccessRef =
        useRef(onSuccess);

    const onErrorRef =
        useRef(onError);

    const invalidateKeysRef =
        useRef(invalidateKeys);

    const inFlightRef =
        useRef(null);


    useEffect(() => {

        mutationFnRef.current =
            mutationFn;

    }, [mutationFn]);


    useEffect(() => {

        onSuccessRef.current =
            onSuccess;

    }, [onSuccess]);


    useEffect(() => {

        onErrorRef.current =
            onError;

    }, [onError]);


    useEffect(() => {

        invalidateKeysRef.current =
            invalidateKeys;

    }, [invalidateKeys]);


    /*
    =====================================
    Mounted State
    =====================================
    */

    const mountedRef =
        useRef(false);


    useEffect(() => {

        mountedRef.current = true;

        return () => {

            mountedRef.current = false;

        };

    }, []);


    /*
    =====================================
    Mutation State
    =====================================
    */

    const [data, setData] =
        useState(null);

    const [loading, setLoading] =
        useState(false);

    const [error, setError] =
        useState(null);


    /*
    =====================================
    Execute Mutation
    =====================================
    */

    const mutate =
        useCallback(
            async (variables) => {

                /* Prevent repeated clicks from sending the same mutation twice. */
                if (inFlightRef.current) {

                    return inFlightRef.current;

                }

                const operation = (async () => {

                if (
                    mountedRef.current
                ) {

                    setLoading(true);
                    setError(null);

                }


                try {

                    /*
                    =============================
                    Execute Mutation
                    =============================
                    */

                    const result =
                        await mutationFnRef.current(
                            variables
                        );


                    /*
                    =============================
                    Store Result
                    =============================
                    */

                    if (
                        mountedRef.current
                    ) {

                        setData(result);
                        setLoading(false);
                        setError(null);

                    }


                    /*
                    =============================
                    Invalidate Related Queries
                    =============================
                    */

                    invalidateKeysRef.current.forEach(
                        (key) => {

                            queryClient.invalidateQueriesByPrefix(
                                key
                            );

                        }
                    );


                    /*
                    =============================
                    Success Callback
                    =============================
                    */

                    if (
                        onSuccessRef.current
                    ) {

                        await onSuccessRef.current(
                            result
                        );

                    }


                    return result;


                } catch (
                    mutationError
                ) {

                    /*
                    =============================
                    Store Error
                    =============================
                    */

                    if (
                        mountedRef.current
                    ) {

                        setError(
                            mutationError
                        );

                        setLoading(false);

                    }


                    /*
                    =============================
                    Error Callback
                    =============================
                    */

                    if (
                        onErrorRef.current
                    ) {

                        await onErrorRef.current(
                            mutationError
                        );

                    }


                    /*
                    =============================
                    Optional Error Propagation
                    =============================

                    Default behavior preserves
                    the previous hook behavior.

                    throwOnError allows callers
                    to handle the error through
                    try/catch.

                    =============================
                    */

                    if (throwOnError) {

                        throw mutationError;

                    }


                    return undefined;
                }

                })();

                inFlightRef.current = operation;

                try {

                    return await operation;

                } finally {

                    if (inFlightRef.current === operation) {

                        inFlightRef.current = null;

                    }

                }

            },
            [
                queryClient,
                throwOnError
            ]
        );


    /*
    =====================================
    Reset Mutation State
    =====================================
    */

    const reset =
        useCallback(() => {

            if (
                !mountedRef.current
            ) {

                return;

            }

            setData(null);
            setLoading(false);
            setError(null);

        }, []);


    /*
    =====================================
    Return Mutation State
    =====================================
    */

    return {

        mutate,

        data,

        loading,

        error,

        isLoading:
            loading,

        isError:
            Boolean(error),

        isSuccess:
            !loading &&
            !error &&
            data !== null,

        reset

    };
};


export default useMutation;
