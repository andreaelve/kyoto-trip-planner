import ImagePlaceholder from "@/components/ImagePlaceholder";
import { dayLabel, hours } from "@/lib/format";
import type { Experience } from "@/lib/types";

/**
 * Experience card
 * - Image box: tall strip down the left side
 * - Biggest text: the activity name
 * - Accent: Babu (teal) day/time label
 */
export default function ExperienceCard({ experience }: { experience: Experience }) {
  const soldOut = experience.availability === "Sold out";

  return (
    <article
      data-card="experience"
      className="flex overflow-hidden rounded-2xl border border-black/10 bg-white shadow-sm"
    >
      <ImagePlaceholder className="w-1/3 shrink-0 self-stretch" label="Experience photo" />
      <div className="min-w-0 flex-1 space-y-2 p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-foggy">
          Experience · {experience.category}
        </p>
        <h3 className="text-xl font-bold leading-snug text-hof">{experience.title}</h3>
        <p className="text-sm text-foggy">
          {hours(experience.durationHours)} · Hosted by {experience.hostFirstName}
        </p>
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-md bg-babu px-2 py-0.5 text-xs font-bold uppercase tracking-wide text-white">
            {dayLabel(experience.date)} · {experience.startTime}
          </span>
          <span
            className={`rounded-md border px-2 py-0.5 text-xs font-semibold ${
              soldOut ? "border-foggy text-foggy" : "border-babu text-babu"
            }`}
          >
            {experience.availability}
          </span>
        </div>
        <p className="text-sm text-hof">
          <span className="font-semibold text-babu">Meet: </span>
          {experience.meetingPoint}
        </p>
        <p className="text-sm text-hof">
          ${experience.pricePerGuestUsd} / guest · ${experience.totalFor2Usd} for 2 ·{" "}
          <span aria-hidden>★</span> {experience.rating.toFixed(2)}
        </p>
      </div>
    </article>
  );
}
