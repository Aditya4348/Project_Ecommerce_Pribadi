import api from "@/services/api";
import { Product } from "@/types";
import { useQuery } from "@tanstack/react-query";
import React, { createContext, useContext, ReactNode, useState } from "react";

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
  
  const [minPrice, setMinPrice] = useState<number | null>(null);
  const [maxPrice, setMaxPrice] = useState<number | null>(null);

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
