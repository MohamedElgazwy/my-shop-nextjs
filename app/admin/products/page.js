"use client";

import { useProducts } from "../../context/ProductsContext";
import { useState } from "react";

export default function AdminProductsPage() {
  const { products, addProduct, updateProduct, deleteProduct } = useProducts();

  const [form, setForm] = useState({
    title: "",
    price: "",
    image: "",
  });

  const [editingId, setEditingId] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.title || !form.price) return;

    if (editingId) {
      updateProduct(editingId, form);
      setEditingId(null);
    } else {
      addProduct(form);
    }

    setForm({ title: "", price: "", image: "" });
  };

  const startEdit = (product) => {
    setEditingId(product.id);
    setForm({
      title: product.title,
      price: product.price,
      image: product.image || "",
    });
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Admin Products</h1>

      {/* ===== Add / Edit Form ===== */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow mb-8 space-y-4 max-w-xl"
      >
        <input
          placeholder="Product Title"
          className="w-full border p-3 rounded"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />

        <input
          type="number"
          placeholder="Price"
          className="w-full border p-3 rounded"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
        />

        <input
          placeholder="Image URL"
          className="w-full border p-3 rounded"
          value={form.image}
          onChange={(e) => setForm({ ...form, image: e.target.value })}
        />

        <button className="bg-blue-600 text-white px-4 py-2 rounded">
          {editingId ? "Update Product" : "Add Product"}
        </button>
      </form>

      {/* ===== Products Table ===== */}
      <div className="bg-white rounded-xl shadow overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-3">Title</th>
              <th className="p-3">Price</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.length === 0 ? (
              <tr>
                <td colSpan="3" className="p-4 text-center text-gray-500">
                  No products yet
                </td>
              </tr>
            ) : (
              products.map((product) => (
                <tr key={product.id} className="border-t">
                  <td className="p-3">{product.title}</td>
                  <td className="p-3">${product.price}</td>
                  <td className="p-3 space-x-2">
                    <button
                      onClick={() => startEdit(product)}
                      className="bg-yellow-400 px-3 py-1 rounded"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteProduct(product.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
