import { useEffect, useState } from "react";
import { Product } from "../types/product";
import {
  getProductById,
  getProductSpecifications,
  getProductImages,
  getProductVariants,
} from "../services/productService";

export const useProductDetail = (id: number | string | undefined) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError(null);
        const productId = Number(id);
        const [productData, specsData, imagesData, variantsData] = await Promise.all([
          getProductById(productId),
          getProductSpecifications(productId).catch(() => []),
          getProductImages(productId).catch(() => []),
          getProductVariants(productId).catch(() => []),
        ]);

        setProduct({
          ...productData,
          specifications: specsData,
          images: imagesData,
          variants: variantsData,
        });
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Failed to load product detail";
        setError(errorMessage);
        console.error("useProductDetail error:", err);
      } finally {
        setLoading(false);
      }
    };

    void fetchProduct();
  }, [id]);

  return { product, loading, error };
};

