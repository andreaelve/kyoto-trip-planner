/** Grey box standing in for a photo (image rights for the prototype are not cleared). */
export default function ImagePlaceholder({ className = "", label = "Photo" }: { className?: string; label?: string }) {
  return (
    <div
      role="img"
      aria-label={`${label} placeholder`}
      className={`flex items-center justify-center bg-placeholder text-xs font-medium text-foggy ${className}`}
    >
      {label}
    </div>
  );
}
