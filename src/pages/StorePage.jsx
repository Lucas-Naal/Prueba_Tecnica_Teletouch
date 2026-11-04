import { useNavigate } from "react-router-dom";
import { ProductList } from "../components/ProductList";
import { DarkModeToggle } from "../components/DarkModeToggle";

export function StorePage({ userRole, onLogout }) {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
            <header className="bg-white border-b border-slate-200 sticky top-0 z-10 dark:bg-slate-800 dark:border-slate-700">
                <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                    <h1 className="text-xl font-bold text-slate-800 dark:text-white">Tienda Liverpool</h1>
                    <div className="flex items-center gap-3">
                        <DarkModeToggle />
                        {userRole === "admin" && (
                            <button
                                onClick={() => navigate("/admin")}
                                className="bg-teal-700 hover:bg-teal-800 text-white px-4 py-2 rounded-lg font-semibold text-sm transition-colors"
                            >
                                ⚙️ Administrar
                            </button>
                        )}
                        <button
                            onClick={onLogout}
                            className="text-slate-500 hover:text-slate-800 font-medium text-sm px-4 py-2 transition-colors dark:text-slate-400 dark:hover:text-white"
                        >
                            Cerrar Sesión
                        </button>
                    </div>
                </div>
            </header>
            <main className="max-w-7xl mx-auto px-6 py-8">
                <ProductList />
            </main>
        </div>
    );
}