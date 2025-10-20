import React, { useState } from "react";
import "./ProductForm.css";

const ProductForm = ({ onSubmit, loading }) => {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "",
    stock: "",
  });

  const [errors, setErrors] = useState({});

  const categories = [
    "Electronics",
    "Fashion",
    "Home",
    "Sports",
    "Books",
    "Other",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Hapus error ketika user mengetik ulang
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Product name is required";
    }

    if (!formData.price || formData.price <= 0) {
      newErrors.price = "Valid price is required";
    }

    if (!formData.category) {
      newErrors.category = "Category is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      await onSubmit({
        name: formData.name.trim(),
        price: parseInt(formData.price),
        category: formData.category,
        stock: parseInt(formData.stock) || 0,
      });

      // Reset form setelah berhasil submit
      setFormData({
        name: "",
        price: "",
        category: "",
        stock: "",
      });
      setErrors({});
    } catch (error) {
      // Error ditangani oleh parent component
      console.error(error);
    }
  };

  return (
    <div className="product-form">
      <h3>➕ Add New Product</h3>
      <form onSubmit={handleSubmit}>
        {/* Product Name */}
        <div className="form-group">
          <label>Product Name *</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter product name"
            className={errors.name ? "error" : ""}
            disabled={loading}
          />
          {errors.name && <span className="errortext">{errors.name}</span>}
        </div>

        {/* Price */}
        <div className="form-group">
          <label>Price (IDR) *</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="Enter price"
            min="1"
            className={errors.price ? "error" : ""}
            disabled={loading}
          />
          {errors.price && <span className="errortext">{errors.price}</span>}
        </div>

        {/* Category */}
        <div className="form-group">
          <label>Category *</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className={errors.category ? "error" : ""}
            disabled={loading}
          >
            <option value="">Select category</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          {errors.category && (
            <span className="errortext">{errors.category}</span>
          )}
        </div>

        {/* Stock */}
        <div className="form-group">
          <label>Stock Quantity</label>
          <input
            type="number"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
            placeholder="Enter stock quantity"
            min="0"
            disabled={loading}
          />
        </div>

        {/* Submit Button */}
        <button type="submit" disabled={loading} className="submit-btn">
          {loading ? "Adding..." : "Add Product"}
        </button>
      </form>
    </div>
  );
};

export default ProductForm;
