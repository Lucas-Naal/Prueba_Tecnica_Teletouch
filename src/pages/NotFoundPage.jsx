import { useNavigate } from "react-router-dom";

export function NotFoundPage() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 px-4 text-center">
            <h1 className="text-7xl font-extrabold text-slate-800">404</h1>
            <p className="text-slate-500 mt-2 mb-8">La página que buscas no existe.</p>
            <button
                onClick={() => navigate("/products")}
                className="bg-teal-700 hover:bg-teal-800 text-white px-6 py-2.5 rounded-xl font-semibold transition-colors"
            >
                Volver a la tienda
            </button>
        </div>
    );
}