import { useState, useCallback } from "react";

const useModal = () => {

    const [isOpen, setIsOpen] = useState(false);

    const [data, setData] = useState(null);

    /*
    =====================================
    Open Modal
    =====================================
    */

    const open = useCallback((payload = null) => {

        setData(payload);

        setIsOpen(true);

    }, []);

    /*
    =====================================
    Close Modal
    =====================================
    */

    const close = useCallback(() => {

        setIsOpen(false);

    }, []);

    /*
    =====================================
    Reset Modal
    =====================================
    */

    const reset = useCallback(() => {

        setData(null);

        setIsOpen(false);

    }, []);

    /*
    =====================================
    Update Payload
    =====================================
    */

    const update = useCallback((payload) => {

        setData(payload);

    }, []);

    /*
    =====================================
    Toggle
    =====================================
    */

    const toggle = useCallback(() => {

        setIsOpen(previous => !previous);

    }, []);

    /*
    =====================================
    Public API
    =====================================
    */

    return {

        isOpen,

        data,

        open,

        close,

        reset,

        update,

        toggle

    };

};

export default useModal;