import { describe, it, expect } from "vitest";
import { validateLoginForm } from "./validators";

describe("validateLoginForm", () => {
    it("devuelve errores con datos inválidos", () => {
        expect(validateLoginForm({ email: "x", password: "1" })).toEqual({
            email: "Introduce un email válido",
            password: "La contraseña debe tener al menos 8 caracteres",
        });
    });

    it("no devuelve errores con datos válidos", () => {
        expect(
            validateLoginForm({ email: "a@b.com", password: "12345678" })
        ).toEqual({});
    });
});