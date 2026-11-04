export function CategoryFilter({ categories, selected, onSelect }) {
    return (
        <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
                <button
                    key={cat}
                    onClick={() => onSelect(cat)}
                    className={`px-4 py-1.5 rounded-full text-sm font-medium capitalize transition-all ${selected === cat
                            ? "bg-teal-700 text-white shadow-sm"
                            : "bg-white text-slate-600 border border-slate-200 hover:border-teal-300 hover:text-teal-700 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700 dark:hover:border-teal-500 dark:hover:text-teal-400"
                        }`}
                >
                    {cat === "all" ? "Todos" : cat}
                </button>
            ))}
        </div>
    );
}