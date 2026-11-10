import ImagePlaceholder from "@/components/ImagePlaceholder";
import { STAY_DATES } from "@/lib/mockData";
import { stayRange } from "@/lib/format";
import type { Stay } from "@/lib/types";

/**
 * Stay card
 * - Image box: wide banner across the top
 * - Biggest text: the travel dates
 * - Accent: Rausch (coral-pink) top border and price line
 */
export default function StayCard({ stay }: { stay: Stay }) {
  // The weekend is fixed: always 11–13 Apr 2025, whatever the row says.
  const dates = stayRange(STAY_DATES.checkIn, STAY_DATES.checkOut);

  return (
    <article
      data-card="stay"
      className="overflow-hidden rounded-2xl border border-black/10 border-t-4 border-t-rausch bg-white shadow-sm"
    >
      <ImagePlaceholder className="aspect-[16/9] w-full" label="Listing photo" />
      <div className="space-y-1.5 p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-foggy">Stay · 2 nights</p>
        <h3 className="text-2xl font-bold leading-tight text-hof">{dates}</h3>
        <p className="text-base font-semibold text-hof">{stay.listingTitle}</p>
        <p className="text-sm text-foggy">
          {stay.propertyType} · {stay.neighbourhood}, Kyoto · Host {stay.hostFirstName}
        </p>
        <p className="text-sm font-semibold text-rausch">
          ${stay.pricePerNightUsd} USD / night · ${stay.totalUsd} total
        </p>
        <p className="text-sm text-hof">
          <span aria-hidden>★</span> {stay.guestRating.toFixed(2)}{" "}
          <span className="text-foggy">({stay.reviewCount} reviews)</span>
        </p>
        <p className="text-sm text-hof">{stay.highlight}</p>
      </div>
    </article>
  );
}
