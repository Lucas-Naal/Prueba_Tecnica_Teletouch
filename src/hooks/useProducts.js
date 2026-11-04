import { useState, useEffect } from "react";
import { productService } from "../services/productService";

export function useProducts() {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let isMounted = true;

        const fetchProducts = async () => {
            try {
                setIsLoading(true);
                setError(null);

                const data = await productService.getProducts();

                if (isMounted) setProducts(data);
            } catch (err) {
                if (isMounted) setError(err.message);
            } finally {
                if (isMounted) setIsLoading(false);
            }
        };

        fetchProducts();

        return () => {
            isMounted = false;
        };
    }, []);

    return { products, isLoading, error };
}