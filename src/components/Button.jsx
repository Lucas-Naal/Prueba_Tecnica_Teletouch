export function Button({ children, isLoading, className = "", ...props }) {
    return (
        <button className={`btn ${className}`} disabled={isLoading} {...props}>
            {isLoading ? "Loading..." : children}
        </button>
    );
}