import { useState, useCallback } from "react";

const DEFAULT_STATE = {

    isVisible: false,

    header: "",

    message: "",

    type: "info"

};

const useToast = () => {

    const [toast, setToast] = useState(DEFAULT_STATE);

    /*
    =====================================
    Show Toast
    =====================================
    */

    const show = useCallback(

        (
            header,
            message,
            type = "info"
        ) => {

            setToast({

                isVisible: false,

                header,

                message,

                type

            });

            setTimeout(() => {

                setToast({

                    isVisible: true,

                    header,

                    message,

                    type

                });

            }, 10);

        },

        []

    );

    /*
    =====================================
    Toast Helpers
    =====================================
    */

    const success = useCallback(

        (header, message) => {

            show(header, message, "success");

        },

        [show]

    );

    const error = useCallback(

        (header, message) => {

            show(header, message, "error");

        },

        [show]

    );

    const warning = useCallback(

        (header, message) => {

            show(header, message, "warning");

        },

        [show]

    );

    const info = useCallback(

        (header, message) => {

            show(header, message, "info");

        },

        [show]

    );

    /*
    =====================================
    Hide Toast
    =====================================
    */

    const hide = useCallback(() => {

        setToast((previous) => ({

            ...previous,

            isVisible: false

        }));

    }, []);

    /*
    =====================================
    Reset
    =====================================
    */

    const reset = useCallback(() => {

        setToast(DEFAULT_STATE);

    }, []);

    /*
    =====================================
    Public API
    =====================================
    */

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