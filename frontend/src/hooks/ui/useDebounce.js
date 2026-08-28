import { useState, useEffect } from "react";

const useDebounce = (
    value,
    delay = 500
) => {

    const [debouncedValue, setDebouncedValue] =
        useState(value);

    /*
    =====================================
    Debounce Effect
    =====================================
    */

    useEffect(() => {

        const timer = setTimeout(() => {

            setDebouncedValue(value);

        }, delay);

        return () => {

            clearTimeout(timer);

        };

    }, [value, delay]);

    /*
    =====================================
    Public API
    =====================================
    */

    return debouncedValue;

};

export default useDebounce;