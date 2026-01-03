import api from "@/services/api";
import { Product } from "@/types";
import { useMutation, useQuery } from "@tanstack/react-query";
import React, { createContext, useContext, ReactNode, useState } from "react";
import toast from "react-hot-toast";
import { useAuth } from "./AuthContext";
import { useNavigate } from "react-router-dom";

interface ProductContextType {
  products: Product[];
  loading: boolean;
  error: string | null;
  fetchProducts: () => Promise<void>;
  category: string;
  sort: string;
  setCategory: (val: string) => void;
  setSort: (val: string) => void;
  minPrice: number | null;
  maxPrice: number | null;
  setMinPrice: (val: number | null) => void;
  setMaxPrice: (val: number | null) => void;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("featured");
  const { user } = useAuth();

  const [minPrice, setMinPrice] = useState<number | null>(null);
  const [maxPrice, setMaxPrice] = useState<number | null>(null);

  const navigate = useNavigate();

  const {
    data: products,
    isLoading,
    error,
    refetch,
  } = useQuery<Product[]>({
    queryKey: ["products", category, sort, minPrice, maxPrice],
    queryFn: async () => {
      const response = await api.get("/products", {
        params: {
          category,
          sort,
          min_price: minPrice,
          max_price: maxPrice,
        },
      });

      return response.data.products.data;
    },
    staleTime: 1000 * 60 * 15,
    retry: 1,
  });

  const { mutateAsync: toggleFavorite, isPending: isTogglingFavorite } =
    useMutation({
      mutationFn: async (productSlug: string) => {
        const response = await api.post(`/products/${productSlug}/favorite`);
        return response.data;
      },
      onSuccess: ({ product }) => {
        refetch();
        toast(`Produk ${product.name} berhasil ditambahkan ke favorite`);
      },
      onError: (error) => {
        if (!user) {
          toast.error("Mohon login terlebih dahulu");
          navigate("/login");
          return;
        } else {
          toast("terjadi kesalahan saat menambahkan ke favorite");
        }
      },
    });

  const value = {
    products: products ?? [],
    loading: isLoading,
    error: error ? (error as Error).message : null,
    refetchProducts: refetch, // ✅ ini baru benar
    category,
    sort,
    setCategory,
    setSort,
    minPrice,
    maxPrice,
    setMinPrice,
    setMaxPrice,

    // Favorite togle
    toggleFavorite,
    isTogglingFavorite,
  };

  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  );
};

export const useProduct = () => {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error("useProduct must be used within a ProductProvider");
  }
  return context;
};
