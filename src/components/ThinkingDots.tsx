/** Three Foggy (grey) dots that pulse one after another while the assistant is thinking. */
export default function ThinkingDots() {
  return (
    <div role="status" aria-live="polite" className="flex items-center gap-1.5 py-1" data-testid="thinking-dots">
      <span className="sr-only">Planning your trip…</span>
      {[0, 200, 400].map((delay) => (
        <span
          key={delay}
          aria-hidden
          className="h-2 w-2 animate-dot rounded-full bg-foggy"
          style={{ animationDelay: `${delay}ms` }}
        />
      ))}
    </div>
  );
}
