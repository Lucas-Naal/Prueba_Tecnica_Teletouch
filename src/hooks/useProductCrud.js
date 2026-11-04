import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { productService } from "../services/productService";

export function useProductCrud() {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isMutating, setIsMutating] = useState(false);

    useEffect(() => {
        const load = async () => {
            try {
                setIsLoading(true);
                const data = await productService.getProducts();
                setProducts(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };
        load();
    }, []);

    const createProduct = async (productData) => {
        setIsMutating(true);
        try {
            const newProduct = await productService.createProduct(productData);
            setProducts((prev) => [newProduct, ...prev]);
            Swal.fire({
                icon: "success",
                title: "¡Creado!",
                text: "El producto se ha creado correctamente.",
                timer: 2000,
                showConfirmButton: false,
            });
        } catch (err) {
            Swal.fire({ icon: "error", title: "Error", text: err.message });
        } finally {
            setIsMutating(false);
        }
    };

    const updateProduct = async (id, productData) => {
        setIsMutating(true);
        try {
            await productService.updateProduct(id, productData);
            setProducts((prev) =>
                prev.map((p) => (p.id === id ? { ...p, ...productData } : p))
            );
            Swal.fire({
                icon: "success",
                title: "¡Actualizado!",
                text: "Los cambios se guardaron correctamente.",
                timer: 2000,
                showConfirmButton: false,
            });
        } catch (err) {
            Swal.fire({ icon: "error", title: "Error", text: err.message });
        } finally {
            setIsMutating(false);
        }
    };

    const deleteProduct = async (id, skipConfirm = false) => {
        if (!skipConfirm) {
            const product = products.find((p) => p.id === id);
            const productName = product ? product.title : "este producto";

            const result = await Swal.fire({
                title: "¿Eliminar producto?",
                html: `Estás a punto de eliminar <strong>${productName}</strong>.<br/>Esta acción no se puede deshacer.`,
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "Sí, eliminar",
                cancelButtonText: "Cancelar",
                confirmButtonColor: "#dc2626",
                cancelButtonColor: "#64748b",
            });

            if (!result.isConfirmed) return;
        }

        setIsMutating(true);
        try {
            await productService.deleteProduct(id);
            setProducts((prev) => prev.filter((p) => p.id !== id));

            if (!skipConfirm) {
                Swal.fire({
                    icon: "success",
                    title: "Eliminado",
                    text: "El producto fue eliminado correctamente.",
                    timer: 1500,
                    showConfirmButton: false,
                });
            }
        } catch (err) {
            Swal.fire({ icon: "error", title: "Error", text: err.message });
        } finally {
            setIsMutating(false);
        }
    };

    return { products, isLoading, error, isMutating, createProduct, updateProduct, deleteProduct };
}