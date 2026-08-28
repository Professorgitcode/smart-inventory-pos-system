import { useState, useEffect, useCallback } from "react";

import useAsync from "../ui/useAsync";

import { InventoryRepository } from "../../repositories";

const useInventory = () => {

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

    const [items, setItems] = useState([]);

    const [selectedItem, setSelectedItem] = useState(null);

    /*
    =====================================
    Load Methods
    =====================================
    */

    const loadInventory = useCallback(async () => {

        const result = await execute(() =>
            InventoryRepository.getAll()
        );

        if (result) {

            setItems(result);

        }

    }, [execute]);

    const loadItem = useCallback(async (id) => {

        const result = await execute(() =>
            InventoryRepository.getById(id)
        );

        if (result) {

            setSelectedItem(result);

        }

    }, [execute]);

    /*
    =====================================
    CRUD Methods
    =====================================
    */

    const createItem = useCallback(async (item) => {

        const result = await execute(() =>
            InventoryRepository.create(item)
        );

        if (result) {

            await loadInventory();

        }

    }, [execute, loadInventory]);

    const updateItem = useCallback(async (id, item) => {

        const result = await execute(() =>
            InventoryRepository.update(id, item)
        );

        if (result) {

            await loadInventory();

        }

    }, [execute, loadInventory]);

    const deleteItem = useCallback(async (id) => {

        const result = await execute(() =>
            InventoryRepository.delete(id)
        );

        if (result !== null) {

            await loadInventory();

        }

    }, [execute, loadInventory]);

    /*
    =====================================
    Business Methods
    =====================================
    */

    const refresh = useCallback(() => {

        loadInventory();

    }, [loadInventory]);

    const clearSelection = useCallback(() => {

        setSelectedItem(null);

    }, []);

    /*
    =====================================
    Effects
    =====================================
    */

    useEffect(() => {

        loadInventory();

    }, [loadInventory]);

    /*
    =====================================
    Public API
    =====================================
    */

    return {

        data: {

            items,

            selectedItem

        },

        loading,

        error,

        actions: {

            refresh,

            loadItem,

            createItem,

            updateItem,

            deleteItem,

            clearSelection

        }

    };

};

export default useInventory;