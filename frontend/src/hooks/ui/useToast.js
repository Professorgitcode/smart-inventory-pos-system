import {
    useState,
    useCallback,
    useRef,
    useEffect
} from "react";

const DEFAULT_STATE = {

    isVisible: false,

    header: "",

    message: "",

    type: "info"

};

const useToast = () => {

    const [
        toast,
        setToast
    ] = useState(DEFAULT_STATE);

    const timerRef =
        useRef(null);

    // ====================================
    // CLEAR TIMER
    // ====================================

    const clearTimer = useCallback(() => {

        if (timerRef.current) {

            clearTimeout(
                timerRef.current
            );

            timerRef.current = null;

        }

    }, []);

    // ====================================
    // CLEANUP
    // ====================================

    useEffect(() => {

        return () => {
            clearTimer();
        };

    }, [clearTimer]);

    // ====================================
    // SHOW
    // ====================================

    const show = useCallback(
        (
            header,
            message,
            type = "info"
        ) => {

            clearTimer();

            setToast({
                isVisible: false,
                header,
                message,
                type
            });

            timerRef.current =
                setTimeout(() => {

                    setToast({
                        isVisible: true,
                        header,
                        message,
                        type
                    });

                    timerRef.current = null;

                }, 10);

        },
        [clearTimer]
    );

    // ====================================
    // HELPERS
    // ====================================

    const success = useCallback(
        (header, message) =>
            show(
                header,
                message,
                "success"
            ),
        [show]
    );

    const error = useCallback(
        (header, message) =>
            show(
                header,
                message,
                "error"
            ),
        [show]
    );

    const warning = useCallback(
        (header, message) =>
            show(
                header,
                message,
                "warning"
            ),
        [show]
    );

    const info = useCallback(
        (header, message) =>
            show(
                header,
                message,
                "info"
            ),
        [show]
    );

    // ====================================
    // HIDE
    // ====================================

    const hide = useCallback(() => {

        clearTimer();

        setToast(
            previous => ({
                ...previous,
                isVisible: false
            })
        );

    }, [clearTimer]);

    // ====================================
    // RESET
    // ====================================

    const reset = useCallback(() => {

        clearTimer();

        setToast(
            DEFAULT_STATE
        );

    }, [clearTimer]);

    return {

        toast,

        show,

        success,

        error,

        warning,

        info,

        hide,

        reset

    };
};

export default useToast;