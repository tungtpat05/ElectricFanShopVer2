import { useEffect, useState } from "react";
import { Brand } from "../types/brand";
import { getBrands } from "../services/brandService";

export const useBrands = () => {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const data = await getBrands();
        setBrands(data);
      } catch (_err) {
        setError("Failed to load brands");
      } finally {
        setLoading(false);
      }
    };

    void fetchBrands();
  }, []);

  return { brands, loading, error };
};

