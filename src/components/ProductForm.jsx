import { useState } from "react";

export function ProductForm({ initialData, onSubmit, onCancel, isMutating }) {
    const [form, setForm] = useState({
        title: initialData?.title || "",
        price: initialData?.price || "",
        category: initialData?.category || "",
        description: initialData?.description || "",
    });

    const handleChange = (field, value) => {
        setForm((prev) => ({ ...prev, [field]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({
            ...form,
            price: Number(form.price),
            thumbnail: initialData?.thumbnail || "https://dummyjson.com/icon/placeholder/150",
        });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100 pb-2 dark:text-slate-500 dark:border-slate-700">
                    Información Básica
                </h3>

                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5 dark:text-slate-300">
                        Título del Producto
                    </label>
                    <input
                        type="text"
                        value={form.title}
                        onChange={(e) => handleChange("title", e.target.value)}
                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white transition-all text-sm dark:bg-slate-900 dark:border-slate-700 dark:text-white dark:placeholder-slate-500 dark:focus:bg-slate-900"
                        placeholder="Ej: iPhone 15 Pro Max"
                        required
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1.5 dark:text-slate-300">
                            Precio ($)
                        </label>
                        <input
                            type="number"
                            step="0.01"
                            value={form.price}
                            onChange={(e) => handleChange("price", e.target.value)}
                            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white transition-all text-sm dark:bg-slate-900 dark:border-slate-700 dark:text-white dark:placeholder-slate-500 dark:focus:bg-slate-900"
                            placeholder="999.99"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1.5 dark:text-slate-300">
                            Categoría
                        </label>
                        <input
                            type="text"
                            value={form.category}
                            onChange={(e) => handleChange("category", e.target.value)}
                            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white transition-all text-sm dark:bg-slate-900 dark:border-slate-700 dark:text-white dark:placeholder-slate-500 dark:focus:bg-slate-900"
                            placeholder="smartphones"
                            required
                        />
                    </div>
                </div>
            </div>

            <div className="space-y-4">
                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100 pb-2 dark:text-slate-500 dark:border-slate-700">
                    Detalles Adicionales
                </h3>
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5 dark:text-slate-300">
                        Descripción
                    </label>
                    <textarea
                        value={form.description}
                        onChange={(e) => handleChange("description", e.target.value)}
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white transition-all text-sm resize-none dark:bg-slate-900 dark:border-slate-700 dark:text-white dark:placeholder-slate-500 dark:focus:bg-slate-900"
                        rows={4}
                        placeholder="Describe las características del producto..."
                        required
                    />
                </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-700">
                <button
                    type="button"
                    onClick={onCancel}
                    className="px-5 py-2.5 text-sm font-semibold text-slate-600 bg-white border border-slate-200 hover:bg-slate-50 rounded-xl transition dark:bg-slate-700 dark:text-slate-200 dark:border-slate-600 dark:hover:bg-slate-600"
                >
                    Cancelar
                </button>
                <button
                    type="submit"
                    disabled={isMutating}
                    className="px-6 py-2.5 text-sm font-semibold text-white bg-teal-700 hover:bg-teal-800 rounded-xl transition shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isMutating ? "Guardando..." : initialData ? "Guardar Cambios" : "Crear Producto"}
                </button>
            </div>
        </form>
    );
}