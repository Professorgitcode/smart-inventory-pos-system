import { useState, useEffect, useCallback } from "react";

import useAsync from "../ui/useAsync";

import { SupplierRepository } from "../../repositories";

const useSuppliers = () => {

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

    const [suppliers, setSuppliers] = useState([]);

    const [analytics, setAnalytics] = useState(null);

    const [selectedSupplier, setSelectedSupplier] = useState(null);

    /*
    =====================================
    Load Methods
    =====================================
    */

    const loadSuppliers = useCallback(async () => {

        const result = await execute(() =>
            SupplierRepository.getAll()
        );

        if (result) {

            setSuppliers(result);

        }

    }, [execute]);

    const loadAnalytics = useCallback(async () => {

        const result = await execute(() =>
            SupplierRepository.getAnalytics()
        );

        if (result) {

            setAnalytics(result);

        }

    }, [execute]);

    const loadSupplier = useCallback(async (id) => {

        const result = await execute(() =>
            SupplierRepository.getById(id)
        );

        if (result) {

            setSelectedSupplier(result);

        }

    }, [execute]);

    /*
    =====================================
    CRUD Methods
    =====================================
    */

    const createSupplier = useCallback(async (supplier) => {

        const result = await execute(() =>
            SupplierRepository.create(supplier)
        );

        if (result) {

            await loadSuppliers();

        }

    }, [execute, loadSuppliers]);

    const updateSupplier = useCallback(async (id, supplier) => {

        const result = await execute(() =>
            SupplierRepository.update(id, supplier)
        );

        if (result) {

            await loadSuppliers();

        }

    }, [execute, loadSuppliers]);

    const deleteSupplier = useCallback(async (id) => {

        const result = await execute(() =>
            SupplierRepository.delete(id)
        );

        if (result !== null) {

            await loadSuppliers();

        }

    }, [execute, loadSuppliers]);

    /*
    =====================================
    Business Methods
    =====================================
    */

    const refresh = useCallback(async () => {

        await Promise.all([

            loadSuppliers(),

            loadAnalytics()

        ]);

    }, [

        loadSuppliers,

        loadAnalytics

    ]);

    const clearSelection = useCallback(() => {

        setSelectedSupplier(null);

    }, []);

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

            suppliers,

            analytics,

            selectedSupplier

        },

        loading,

        error,

        actions: {

            refresh,

            loadSupplier,

            createSupplier,

            updateSupplier,

            deleteSupplier,

            clearSelection

        }

    };

};

export default useSuppliers;