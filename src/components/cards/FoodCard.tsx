import ImagePlaceholder from "@/components/ImagePlaceholder";
import type { Food } from "@/lib/types";

/**
 * Food card
 * - Image box: small round thumbnail at the top right
 * - Biggest text: the restaurant name
 * - Accent: Arches (orange) pill for the meal type and price level
 */
export default function FoodCard({ food }: { food: Food }) {
  return (
    <article
      data-card="food"
      className="rounded-2xl border border-black/10 bg-white p-4 shadow-sm"
    >
      <div className="flex items-start gap-3">
        <div className="min-w-0 flex-1 space-y-1.5">
          <p className="text-xs font-semibold uppercase tracking-wide text-foggy">Food</p>
          <h3 className="text-xl font-bold leading-snug text-hof">{food.placeName}</h3>
          <span className="inline-block rounded-full bg-arches px-3 py-0.5 text-xs font-bold text-white">
            {food.meal} · {food.priceLevel}
          </span>
        </div>
        <ImagePlaceholder className="h-14 w-14 shrink-0 rounded-full text-[10px]" label="Photo" />
      </div>
      <p className="mt-2 text-sm text-foggy">
        {food.cuisine} · {food.neighbourhood} · {food.walkFromStayMin} min walk from your stay
      </p>
      <p className="mt-1 text-sm text-hof">About ${food.estCostFor2Usd} for 2</p>
      <p className="mt-1 text-sm italic text-hof">{food.bookingNote}</p>
    </article>
  );
}
