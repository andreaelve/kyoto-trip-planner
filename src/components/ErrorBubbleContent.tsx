/**
 * What sits inside the assistant bubble when a reply can't be read.
 * Follows the Airbnb Design Systems "Assistant Bubble Error Message Guidelines":
 * - Lead line of 8 words or fewer, in the guest's terms, never blaming the guest.
 * - One supporting sentence that says what happens next.
 * - No banned words (error, failed, invalid, null, undefined, timeout, status codes, "Oops"), no "!".
 * - Exactly one primary action: "Try again", sentence case, directly below the message, inside the bubble.
 * - 44px tap target and a visible keyboard focus ring.
 *
 * The bubble around it (shape, neutral colours, live region) is drawn by TripPlannerChat.
 */
export const ERROR_COPY = {
  lead: "I couldn't put your plan together just now.",
  support: "Try again and I'll plan the same trip for you.",
  action: "Try again",
} as const;

export default function ErrorBubbleContent({
  onRetry,
  disabled,
}: {
  onRetry: () => void;
  disabled: boolean;
}) {
  return (
    <>
      <p className="font-semibold">{ERROR_COPY.lead}</p>
      <p className="mt-1">{ERROR_COPY.support}</p>
      <button
        type="button"
        onClick={onRetry}
        disabled={disabled}
        className="mt-3 min-h-[44px] rounded-full bg-rausch px-4 py-2.5 text-sm font-bold text-white transition hover:brightness-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-40"
      >
        {ERROR_COPY.action}
      </button>
    </>
  );
}
