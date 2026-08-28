import React, { useEffect, useState } from "react";

import SupplierService from "../services/suppliers/SupplierService";

import SupplierHeader from "../components/supplier/SupplierHeader";
import SupplierKPIs from "../components/supplier/SupplierKPIs";
import SupplierAnalytics from "../components/supplier/SupplierAnalytics";
import SupplierTable from "../components/supplier/SupplierTable";
import SupplierInsights from "../components/supplier/SupplierInsights";
import AddSupplierModal from "../components/supplier/AddSupplierModal";

import Toast from "../components/common/Toast";

const pageStyle = {
  padding: "32px",
  background:
    "linear-gradient(135deg, #eef6fb 0%, #dbeafe 100%)",
  minHeight: "100vh"
};

const SupplierIntelligence = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [analytics, setAnalytics] = useState(null);

  const [loading, setLoading] =
    useState(true);

  const [search, setSearch] =
    useState("");

  const [showModal, setShowModal] =
    useState(false);

  const [toast, setToast] =
    useState({
      isVisible: false,
      header: "",
      message: "",
      type: "info"
    });

  const showToast = (
    header,
    message,
    type = "info"
  ) => {
    setToast({
      isVisible: true,
      header,
      message,
      type
    });
  };

  const loadData = async () => {
    try {
      setLoading(true);

      const [
        suppliersData,
        analyticsData
      ] = await Promise.all([
        SupplierService.getSuppliers(),
        SupplierService.getAnalytics()
      ]);

      setSuppliers(suppliersData);
      setAnalytics(analyticsData);
    } catch {
      showToast(
        "Server Error",
        "Failed to load supplier data",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleAddSupplier =
    async (supplier) => {
      try {
        await SupplierService.createSupplier(supplier);

        showToast(
          "Success",
          "Supplier created successfully",
          "success"
        );

        setShowModal(false);

        await loadData();
      } catch {
        showToast(
          "Server Error",
          "Failed to create supplier",
          "error"
        );
      }
    };

  const handleDeleteSupplier =
    async (id) => {
      const confirmDelete =
        window.confirm(
          "Delete this supplier?"
        );

      if (!confirmDelete) return;

      try {
        await SupplierService.deleteSupplier(id);

        showToast(
          "Delete Confirmation",
          "Supplier deleted successfully",
          "info"
        );

        await loadData();
      } catch {
        showToast(
          "Server Error",
          "Failed to delete supplier",
          "error"
        );
      }
    };

  const filteredSuppliers =
    suppliers.filter((supplier) =>
      supplier.supplierName
        .toLowerCase()
        .includes(
          search.toLowerCase()
        )
    );

  return (
    <div style={pageStyle}>
     <SupplierHeader
  onAddSupplier={() =>
    setShowModal(true)
  }
/>

      <SupplierKPIs analytics={analytics} />

      <SupplierAnalytics analytics={analytics} />

      <SupplierTable
        suppliers={filteredSuppliers}
        search={search}
        setSearch={setSearch}
        onDelete={
          handleDeleteSupplier
        }
      />

      <SupplierInsights
  suppliers={suppliers}
/>


      <AddSupplierModal
        isOpen={showModal}
        onClose={() =>
          setShowModal(false)
        }
        onSave={
          handleAddSupplier
        }
      />

      <Toast
        header={toast.header}
        message={toast.message}
        type={toast.type}
        isVisible={
          toast.isVisible
        }
        onClose={() =>
          setToast({
            ...toast,
            isVisible: false
          })
        }
      />
    </div>
  );
};

export default SupplierIntelligence;