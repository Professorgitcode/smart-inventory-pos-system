import { useState, useEffect, useCallback } from "react";

import useAsync from "../ui/useAsync";

import { ForecastRepository } from "../../repositories";

const useForecasting = () => {

    /*
    =====================================
    Async State
    =====================================
    */

    const {

        loading,

        error,

        execute

    } = useAsync();

    /*
    =====================================
    State
    =====================================
    */

    const [forecast, setForecast] = useState([]);

    const [accuracy, setAccuracy] = useState(null);

    const [modelInfo, setModelInfo] = useState(null);

    /*
    =====================================
    Load Methods
    =====================================
    */

    const loadForecast = useCallback(async () => {

        const result = await execute(() =>
            ForecastRepository.getForecast()
        );

        if (result) {

            setForecast(result);

        }

    }, [execute]);

    const loadAccuracy = useCallback(async () => {

        const result = await execute(() =>
            ForecastRepository.getAccuracy()
        );

        if (result) {

            setAccuracy(result);

        }

    }, [execute]);

    const loadModelInfo = useCallback(async () => {

        const result = await execute(() =>
            ForecastRepository.getModelInfo()
        );

        if (result) {

            setModelInfo(result);

        }

    }, [execute]);

    /*
    =====================================
    Business Methods
    =====================================
    */

    const refresh = useCallback(async () => {

        await Promise.all([

            loadForecast(),

            loadAccuracy(),

            loadModelInfo()

        ]);

    }, [

        loadForecast,

        loadAccuracy,

        loadModelInfo

    ]);

    /*
    =====================================
    Effects
    =====================================
    */

    useEffect(() => {

        refresh();

    }, [refresh]);

    /*
    =====================================
    Public API
    =====================================
    */

    return {

        data: {

            forecast,

            accuracy,

            modelInfo

        },

        loading,

        error,

        actions: {

            refresh,

            loadForecast,

            loadAccuracy,

            loadModelInfo

        }

    };

};

export default useForecasting;