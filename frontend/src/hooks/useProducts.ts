import { useEffect, useState } from "react";
import { Product } from "../types/product";
import { getProducts, getProductsByCategory } from "../services/productService";

interface UseProductsOptions {
  categoryId?: number;
}

export const useProducts = (options?: UseProductsOptions) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        
        let data: Product[];
        if (options?.categoryId) {
          data = await getProductsByCategory(options.categoryId);
        } else {
          data = await getProducts();
        }
        
        setProducts(data);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Failed to load products";
        setError(errorMessage);
        console.error("useProducts error:", err);
      } finally {
        setLoading(false);
      }
    };

    void fetchProducts();
  }, [options?.categoryId]);

  return { products, loading, error };
};
