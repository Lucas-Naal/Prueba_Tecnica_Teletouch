
export const isValidEmail = (username) => username.trim().length >= 3;

export const isValidPassword = (password) => password.length >= 8;

export const validateLoginForm = ({ email, password }) => {
    const errors = {};

    if (!isValidEmail(email)) {
        errors.email = "El usuario debe tener al menos 3 caracteres";
    }
    if (!isValidPassword(password)) {
        errors.password = "La contraseña debe tener al menos 8 caracteres";
    }

    return errors;
};