"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { Product } from "../types";

interface ProductInput {
  title: string;
  price: number | string;
  image: string;
}

interface ProductsContextType {
  products: Product[];
  loading: boolean;
  addProduct: (product: ProductInput) => void;
  updateProduct: (id: number, updatedProduct: ProductInput) => void;
  deleteProduct: (id: number) => void;
}

const ProductsContext = createContext<ProductsContextType | undefined>(undefined);

export function ProductsProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch("https://fakestoreapi.com/products");
      const data = (await res.json()) as Product[];
      setProducts(data);
      setLoading(false);
    };

    void fetchProducts();
  }, []);

  const addProduct = (product: ProductInput) => {
    setProducts((prev) => [
      {
        id: Date.now(),
        title: product.title,
        price: Number(product.price),
        image: product.image,
      },
      ...prev,
    ]);
  };

  const updateProduct = (id: number, updatedProduct: ProductInput) => {
    setProducts((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, ...updatedProduct, price: Number(updatedProduct.price) } : p,
      ),
    );
  };

  const deleteProduct = (id: number) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <ProductsContext.Provider
      value={{
        products,
        loading,
        addProduct,
        updateProduct,
        deleteProduct,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
}

export function useProducts() {
  const context = useContext(ProductsContext);
  if (!context) {
    throw new Error("useProducts must be used inside ProductsProvider");
  }
  return context;
}
