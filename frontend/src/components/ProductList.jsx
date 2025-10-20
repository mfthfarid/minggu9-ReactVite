import React from "react";
import "./ProductList.css";

const ProductList = ({
  products,
  loading,
  error,
  onRefresh,
  onEdit,
  onDelete,
}) => {
  // Jika masih loading dan belum ada data
  if (loading && products.length === 0) {
    return (
      <div className="loading">
        <div className="spinner"></div>
        <p>Loading products...</p>
      </div>
    );
  }

  // Jika ada error
  if (error) {
    return (
      <div className="error">
        <p>❌ Error: {error}</p>
        <button onClick={onRefresh} className="retry-btn">
          🔄 Retry
        </button>
      </div>
    );
  }

  // Jika produk kosong
  if (products.length === 0) {
    return (
      <div className="empty-state">
        <p>📦 No products found</p>
        <p>Add your first product using the form!</p>
      </div>
    );
  }

  // Jika ada data produk
  return (
    <div className="product-list">
      <div className="list-header">
        <h3>Products ({products.length})</h3>
        <button onClick={onRefresh} className="refresh-btn">
          🔄 Refresh
        </button>
      </div>

      <div className="products-grid">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            {/* Header Card */}
            <div className="card-header">
              <span className="product-id">#{product.id}</span>
              <span className="product-category">{product.category}</span>
            </div>

            {/* Nama Produk */}
            <h4 className="product-name">{product.name}</h4>

            {/* Detail Produk */}
            <div className="product-details">
              <p className="product-price">
                Rp {product.price.toLocaleString()}
              </p>
              <p className="product-stock">
                Stock:{" "}
                <span
                  className={product.stock === 0 ? "out-of-stock" : "in-stock"}
                >
                  {product.stock}
                </span>
              </p>
            </div>

            {/* Footer Card */}
            <div className="card-footer">
              <span className="created-at">
                Added:{" "}
                {new Date(product.createdAt).toLocaleDateString("id-ID", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </span>
            </div>

            {/* Aksi */}
            <div className="card-actions">
              <button
                onClick={() => onEdit(product)}
                className="edit-btn"
                title="Edit product"
              >
                ✏️ Edit
              </button>
              <button
                onClick={() => onDelete(product.id)}
                className="delete-btn"
                title="Delete product"
                disabled={loading}
              >
                🗑️ Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
