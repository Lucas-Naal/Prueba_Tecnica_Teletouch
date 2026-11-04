export function ProductCard({ product, onClick }) {
    return (
        <article
            className="group bg-white rounded-2xl border border-slate-200 overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-teal-500 dark:bg-slate-800 dark:border-slate-700"
            onClick={() => onClick(product)}
            tabIndex={0}
            onKeyDown={(e) => e.key === "Enter" && onClick(product)}
            role="button"
        >
            <div className="relative aspect-square bg-slate-50 overflow-hidden dark:bg-slate-900">
                <img
                    src={product.thumbnail}
                    alt={product.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="text-white font-semibold text-sm bg-white/20 px-4 py-2 rounded-full backdrop-blur-sm">
                        Ver detalles
                    </span>
                </div>
            </div>

            <div className="p-4 flex flex-col gap-1">
                <span className="text-[10px] uppercase tracking-wider font-bold text-slate-400 dark:text-slate-500">
                    {product.category}
                </span>
                <h3 className="font-semibold text-slate-800 text-sm truncate dark:text-white">
                    {product.title}
                </h3>
                <p className="text-lg font-bold text-teal-700 mt-2 dark:text-teal-400">
                    ${product.price.toFixed(2)}
                </p>
            </div>
        </article>
    );
}