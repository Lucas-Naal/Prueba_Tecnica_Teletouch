export function ImagePanel({ imageUrl, alt = "" }) {
  return (
    <div
      className="w-full h-full bg-cover bg-center absolute inset-0"
      style={{ backgroundImage: `url(${imageUrl})` }}
      role="img"
      aria-label={alt}
    >
      <div className="absolute inset-0 bg-gradient-to-tr from-teal-900/20 to-black/20" />
    </div>
  );
}