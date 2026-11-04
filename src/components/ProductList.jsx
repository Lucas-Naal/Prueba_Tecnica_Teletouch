import { useState, useEffect, useMemo } from "react";
import { useProducts } from "../hooks/useProducts";
import { useFilteredProducts } from "../hooks/useFilteredProducts";
import { ProductCard } from "./ProductCard";
import { ProductModal } from "./ProductModal";
import { CategoryFilter } from "./CategoryFilter";

export function ProductList() {
    const { products, isLoading, error } = useProducts();
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [debouncedQuery, setDebouncedQuery] = useState("");

    const { filteredProducts, categories, selectedCategory, setSelectedCategory } =
        useFilteredProducts(products);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedQuery(searchQuery);
        }, 300);
        return () => clearTimeout(timer);
    }, [searchQuery]);

    const finalProducts = useMemo(() => {
        if (!debouncedQuery.trim()) return filteredProducts;
        const query = debouncedQuery.toLowerCase().trim();
        return filteredProducts.filter((p) =>
            p.title.toLowerCase().includes(query)
        );
    }, [filteredProducts, debouncedQuery]);

    if (isLoading) {
        return (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {[...Array(8)].map((_, i) => (
                    <div key={i} className="bg-white rounded-2xl border border-slate-200 overflow-hidden animate-pulse">
                        <div className="bg-slate-200 aspect-square w-full" />
                        <div className="p-4 space-y-3">
                            <div className="h-3 bg-slate-200 rounded w-1/3" />
                            <div className="h-4 bg-slate-200 rounded w-3/4" />
                            <div className="h-6 bg-slate-200 rounded w-1/4 mt-4" />
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center p-12 bg-red-50 border border-red-100 rounded-2xl text-center">
                <p className="text-red-600 font-medium mb-4">No pudimos cargar los productos.</p>
                <button
                    onClick={() => window.location.reload()}
                    className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
                >
                    Reintentar
                </button>
            </div>
        );
    }

    if (products.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center p-12 bg-slate-50 border border-dashed border-slate-300 rounded-2xl text-center text-slate-500">
                <p>No hay productos disponibles en este momento.</p>
            </div>
        );
    }

    return (
        <div>
            <div className="mb-6">
                <div className="relative max-w-md">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                    </svg>
                    <input
                        type="text"
                        placeholder="Buscar producto por nombre..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all dark:bg-slate-800 dark:border-slate-700 dark:text-white dark:placeholder-slate-500"
                    />
                </div>
            </div>

            <div className="mb-8">
                <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-3 dark:text-slate-400">
                    Filtrar por categoría
                </h2>
                <CategoryFilter
                    categories={categories}
                    selected={selectedCategory}
                    onSelect={setSelectedCategory}
                />
            </div>

            <p className="text-sm text-slate-500 mb-4 dark:text-slate-400">
                Mostrando <span className="font-semibold text-slate-800 dark:text-white">{finalProducts.length}</span> productos
                {selectedCategory !== "all" && (
                    <> en <span className="font-semibold text-teal-700 capitalize dark:text-teal-400">{selectedCategory}</span></>
                )}
                {debouncedQuery && (
                    <> para "<span className="font-semibold text-slate-800 dark:text-white">{debouncedQuery}</span>"</>
                )}
            </p>

            {finalProducts.length === 0 ? (
                <div className="flex flex-col items-center justify-center p-12 bg-slate-50 border border-dashed border-slate-300 rounded-2xl text-center text-slate-500 dark:bg-slate-800/50 dark:border-slate-700">
                    <p>No se encontraron productos con esos filtros.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {finalProducts.map((product) => (
                        <ProductCard
                            key={product.id}
                            product={product}
                            onClick={setSelectedProduct}
                        />
                    ))}
                </div>
            )}

            {selectedProduct && (
                <ProductModal
                    product={selectedProduct}
                    onClose={() => setSelectedProduct(null)}
                />
            )}
        </div>
    );
}