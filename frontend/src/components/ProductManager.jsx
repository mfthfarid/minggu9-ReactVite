import React, { useState } from "react";
import { useProducts } from "../hooks/useProducts";
import ProductForm from "./ProductForm";
import ProductList from "./ProductList";
import "./ProductManager.css";

const ProductManager = () => {
  const {
    products,
    loading,
    error,
    fetchProducts,
    createProduct,
    updateProduct,
    deleteProduct,
  } = useProducts();

  const [editingProduct, setEditingProduct] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  // ✅ Tambah Produk
  const handleCreateProduct = async (productData) => {
    try {
      const response = await createProduct(productData);
      setSuccessMessage(`✅ ${response.message}`);
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (error) {
      console.error(error);
    }
  };

  // ✅ Update Produk
  const handleUpdateProduct = async (productData) => {
    try {
      const response = await updateProduct(editingProduct.id, productData);
      setSuccessMessage(`✅ ${response.message}`);
      setEditingProduct(null);
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (error) {
      console.error(error);
    }
  };

  // ✅ Hapus Produk
  const handleDeleteProduct = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        const response = await deleteProduct(id);
        setSuccessMessage(`✅ ${response.message}`);
        setTimeout(() => setSuccessMessage(""), 3000);
      } catch (error) {
        console.error(error);
      }
    }
  };

  // ✅ Refresh Data
  const handleRefresh = () => {
    fetchProducts();
    setSuccessMessage("");
  };

  return (
    <div className="product-manager">
      <header>
        <h1>🛍️ Product Management</h1>
        <p>MySQL Database with React & Node.js</p>
      </header>

      {successMessage && (
        <div className="success-message">{successMessage}</div>
      )}

      <div className="manager-content">
        {/* Sidebar Form */}
        <aside className="sidebar">
          <ProductForm
            onSubmit={
              editingProduct ? handleUpdateProduct : handleCreateProduct
            }
            loading={loading}
            initialData={editingProduct}
            buttonText={editingProduct ? "Update Product" : "Add Product"}
          />

          {editingProduct && (
            <button
              onClick={() => setEditingProduct(null)}
              className="cancel-edit-btn"
            >
              Cancel Edit
            </button>
          )}
        </aside>

        {/* Daftar Produk */}
        <main className="main-content">
          <ProductList
            products={products}
            loading={loading}
            error={error}
            onRefresh={handleRefresh}
            onEdit={setEditingProduct}
            onDelete={handleDeleteProduct}
          />
        </main>
      </div>
    </div>
  );
};

export default ProductManager;
