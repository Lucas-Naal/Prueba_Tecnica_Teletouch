import { useEffect } from "react";

export function ProductModal({ product, onClose }) {
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === "Escape") onClose();
        };
        document.addEventListener("keydown", handleKeyDown);
        document.body.style.overflow = "hidden";
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
            document.body.style.overflow = "unset";
        };
    }, [onClose]);

    if (!product) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200"
            onClick={onClose}
            role="dialog"
            aria-modal="true"
        >
            <div
                className="bg-white rounded-3xl shadow-2xl w-full max-w-3xl overflow-hidden relative animate-in zoom-in-95 duration-200 dark:bg-slate-800"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors dark:bg-slate-700 dark:hover:bg-slate-600 dark:text-slate-300"
                    aria-label="Cerrar"
                >
                    ✕
                </button>

                <div className="grid grid-cols-1 md:grid-cols-2">
                    <div className="bg-slate-50 aspect-square md:aspect-auto md:h-full p-8 flex items-center justify-center dark:bg-slate-900">
                        <img
                            src={product.thumbnail}
                            alt={product.title}
                            className="w-full h-full object-contain mix-blend-multiply dark:mix-blend-normal"
                        />
                    </div>

                    <div className="p-8 flex flex-col justify-center">
                        <span className="text-xs font-bold text-teal-600 uppercase tracking-wider mb-2 dark:text-teal-400">
                            {product.category}
                        </span>
                        <h2 className="text-2xl font-bold text-slate-800 mb-2 leading-tight dark:text-white">
                            {product.title}
                        </h2>
                        <p className="text-slate-500 text-sm mb-6 leading-relaxed dark:text-slate-400">
                            {product.description}
                        </p>

                        <div className="flex items-center gap-4 mb-6">
                            <span className="text-3xl font-extrabold text-slate-800 dark:text-white">
                                ${product.price.toFixed(2)}
                            </span>
                            <span className="bg-amber-100 text-amber-800 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 dark:bg-amber-900/40 dark:text-amber-300">
                                ⭐ {product.rating.toFixed(1)} / 5
                            </span>
                        </div>

                        <div className="mb-6">
                            {product.stock > 0 ? (
                                <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-lg dark:bg-emerald-900/30 dark:text-emerald-400">
                                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                                    En stock ({product.stock})
                                </span>
                            ) : (
                                <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-red-600 bg-red-50 px-3 py-1.5 rounded-lg dark:bg-red-900/30 dark:text-red-400">
                                    <span className="w-2 h-2 rounded-full bg-red-500"></span>
                                    Agotado
                                </span>
                            )}
                        </div>

                        <button className="w-full bg-teal-700 hover:bg-teal-800 text-white font-bold py-3 rounded-xl transition-colors shadow-lg shadow-teal-700/20">
                            Añadir al carrito
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}