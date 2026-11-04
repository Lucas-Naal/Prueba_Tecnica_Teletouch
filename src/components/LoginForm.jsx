import { useLogin } from "../hooks/useLogin";

export function LoginForm({ onSuccess }) {
    const { form, errors, serverError, isLoading, handleChange, handleSubmit } =
        useLogin({ onSuccess });

    return (
        <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
            <div>
                <h1 className="text-2xl font-bold text-slate-800 mb-1 dark:text-white">
                    ¡Bienvenido de nuevo!
                </h1>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                    Por favor, inicia sesión en tu cuenta.
                </p>
            </div>

            <div className="flex flex-col gap-1.5">
                <label htmlFor="username" className="text-xs font-semibold text-slate-600 uppercase tracking-wide dark:text-slate-400">
                    Usuario
                </label>
                <input
                    id="username"
                    type="text"
                    autoComplete="username"
                    placeholder="emilys"
                    value={form.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    className={`w-full px-4 py-2.5 bg-slate-50 border ${errors.email
                            ? "border-red-400 focus:ring-red-400"
                            : "border-slate-200 focus:ring-teal-500 dark:border-slate-700"
                        } rounded-xl focus:outline-none focus:ring-2 focus:bg-white transition-all text-sm text-slate-800 dark:bg-slate-900 dark:text-white dark:placeholder-slate-500 dark:focus:bg-slate-900`}
                />
                {errors.email && <span className="text-xs text-red-500 font-medium">{errors.email}</span>}
            </div>

            <div className="flex flex-col gap-1.5">
                <label htmlFor="password" className="text-xs font-semibold text-slate-600 uppercase tracking-wide dark:text-slate-400">
                    Contraseña
                </label>
                <input
                    id="password"
                    type="password"
                    autoComplete="current-password"
                    placeholder="••••••••"
                    value={form.password}
                    onChange={(e) => handleChange("password", e.target.value)}
                    className={`w-full px-4 py-2.5 bg-slate-50 border ${errors.password
                            ? "border-red-400 focus:ring-red-400"
                            : "border-slate-200 focus:ring-teal-500 dark:border-slate-700"
                        } rounded-xl focus:outline-none focus:ring-2 focus:bg-white transition-all text-sm text-slate-800 dark:bg-slate-900 dark:text-white dark:placeholder-slate-500 dark:focus:bg-slate-900`}
                />
                {errors.password && <span className="text-xs text-red-500 font-medium">{errors.password}</span>}
            </div>

            <div className="flex items-center justify-between text-sm mt-1">
                <label className="flex items-center gap-2 text-slate-500 cursor-pointer dark:text-slate-400">
                    <input
                        type="checkbox"
                        className="w-4 h-4 rounded border-slate-300 text-teal-700 focus:ring-teal-500 cursor-pointer"
                    />
                    Recuérdame
                </label>
                <a href="#" className="text-red-500 font-medium hover:underline text-xs">
                    ¿Olvidaste tu contraseña?
                </a>
            </div>

            {serverError && (
                <div className="bg-red-50 text-red-600 text-sm p-3 rounded-lg border border-red-100 dark:bg-red-900/20 dark:text-red-400 dark:border-red-900/30">
                    {serverError}
                </div>
            )}

            <div className="flex gap-3 mt-2">
                <button
                    type="submit"
                    disabled={isLoading}
                    className="flex-1 bg-teal-700 hover:bg-teal-800 text-white font-semibold py-2.5 rounded-xl transition-colors disabled:opacity-70 disabled:cursor-not-allowed text-sm"
                >
                    {isLoading ? "Cargando..." : "Iniciar sesión"}
                </button>
                <button
                    type="button"
                    className="flex-1 bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 font-semibold py-2.5 rounded-xl transition-colors text-sm dark:bg-slate-700 dark:text-slate-200 dark:border-slate-600 dark:hover:bg-slate-600"
                >
                    Crear cuenta
                </button>
            </div>
        </form>
    );
}