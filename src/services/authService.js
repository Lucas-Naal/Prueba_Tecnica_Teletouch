const API_URL = "https://dummyjson.com";

export class AuthError extends Error {
    constructor(message, status) {
        super(message);
        this.name = "AuthError";
        this.status = status;
    }
}

export const authService = {
    async login({ email, password }) { 
        const response = await fetch(`${API_URL}/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                username: email, 
                password: password,
                expiresInMins: 30
            }),
        });

        if (!response.ok) {
            const data = await response.json().catch(() => ({}));
            throw new AuthError(
                data.message ?? "Credenciales inválidas",
                response.status
            );
        }

        return response.json();
    },
};