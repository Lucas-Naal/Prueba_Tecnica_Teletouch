import { useState, useMemo } from "react";

export function useFilteredProducts(products) {
    const [selectedCategory, setSelectedCategory] = useState("all");

    const categories = useMemo(() => {
        const unique = new Set(products.map((p) => p.category));
        return ["all", ...Array.from(unique)];
    }, [products]);

    const filteredProducts = useMemo(() => {
        if (selectedCategory === "all") return products;
        return products.filter((p) => p.category === selectedCategory);
    }, [products, selectedCategory]);

    return {
        filteredProducts,
        categories,
        selectedCategory,
        setSelectedCategory,
    };
}