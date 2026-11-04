export function Input({ id, label, error, ...props }) {
    return (
        <div className="field">
            <label htmlFor={id}>{label}</label>
            <input
                id={id}
                aria-invalid={Boolean(error)}
                aria-describedby={error ? `${id}-error` : undefined}
                {...props}
            />
            {error && (
                <span id={`${id}-error`} role="alert" className="field-error">
                    {error}
                </span>
            )}
        </div>
    );
}