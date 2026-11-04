import { useNavigate } from "react-router-dom";
import { AdminDashboard } from "../components/AdminDashboard";
import { DarkModeToggle } from "../components/DarkModeToggle";

export function AdminPage() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
            <header className="bg-white border-b border-slate-200 sticky top-0 z-10 dark:bg-slate-800 dark:border-slate-700">
                <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                    <h1 className="text-xl font-bold text-slate-800 dark:text-white">Panel de Administración</h1>
                    <div className="flex items-center gap-3">
                        <DarkModeToggle />
                        <button
                            onClick={() => navigate("/products")}
                            className="text-slate-500 hover:text-slate-800 font-medium text-sm flex items-center gap-2 dark:text-slate-400 dark:hover:text-white"
                        >
                            ← Volver a la tienda
                        </button>
                    </div>
                </div>
            </header>
            <main className="max-w-7xl mx-auto px-6 py-8">
                <AdminDashboard />
            </main>
        </div>
    );
}