import { useState, useCallback } from "react";
import { authService } from "../services/authService";
import { validateLoginForm } from "../utils/validators";

const INITIAL_FORM = { email: "", password: "" };

export function useLogin({ onSuccess } = {}) {
    const [form, setForm] = useState(INITIAL_FORM);
    const [errors, setErrors] = useState({});
    const [serverError, setServerError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = useCallback((field, value) => {
        setForm((prev) => ({ ...prev, [field]: value }));
        setErrors((prev) => ({ ...prev, [field]: undefined }));
        setServerError(null);
    }, []);

    const handleSubmit = useCallback(
        async (event) => {
            event.preventDefault();
            if (isLoading) return;

            const validationErrors = validateLoginForm(form);
            if (Object.keys(validationErrors).length > 0) {
                setErrors(validationErrors);
                return;
            }

            setIsLoading(true);
            setServerError(null);

            try {
                const data = await authService.login(form);
                onSuccess?.(data);
            } catch (err) {
                setServerError(err.message ?? "Error inesperado");
            } finally {
                setIsLoading(false);
            }
        },
        [form, isLoading, onSuccess]
    );

    return {
        form,
        errors,
        serverError,
        isLoading,
        handleChange,
        handleSubmit,
    };
}