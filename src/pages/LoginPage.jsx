import { LoginForm } from "../components/LoginForm";
import { ImagePanel } from "../components/ImagePanel";
import { DarkModeToggle } from "../components/DarkModeToggle";

export function LoginPage({ onLogin }) {
    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4 dark:bg-slate-900">
            <div className="fixed top-4 right-4 z-10">
                <DarkModeToggle />
            </div>
            <main className="flex flex-col md:flex-row w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden min-h-[600px] dark:bg-slate-800">
                <section className="flex-1 p-8 md:p-12 flex flex-col justify-between bg-white dark:bg-slate-800">
                    <div className="flex items-center gap-2 text-xl font-bold text-slate-800 dark:text-white">
                        <span className="text-2xl">🐺</span> Prueba Técnica
                    </div>
                    <div className="w-full max-w-sm mx-auto my-auto">
                        <LoginForm onSuccess={onLogin} />
                    </div>
                    <p className="text-xs text-slate-400 max-w-sm mx-auto w-full mt-6 dark:text-slate-500">
                        Al registrarte, aceptas nuestros términos y declaras haber leído nuestra política de datos.
                    </p>
                </section>
                <section className="hidden md:block flex-1 relative">
                    <ImagePanel
                        imageUrl="https://images.pexels.com/photos/10011944/pexels-photo-10011944.jpeg"
                        alt="Pájaro verde"
                    />
                </section>
            </main>
        </div>
    );
}