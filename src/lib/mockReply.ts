import { EXPERIENCES, FOOD, STAYS } from "./mockData";
import type { CardItem } from "./types";

/** How long the fake assistant "thinks" before answering. */
const FAKE_LATENCY_MS = 1400;

/** Typing this anywhere in a message makes that request fail, once per page load. */
export const FAIL_TAG = "#fail";

/** Module state, so it resets when the page reloads. */
let failSwitchSpent = false;

function pickRandom<T>(rows: T[]): T {
  return rows[Math.floor(Math.random() * rows.length)];
}

/**
 * Stands in for the real assistant and returns the raw response body, as a server would.
 * Picks one random row from each sheet on every request, in the fixed order: stay, experience, food.
 *
 * Fail switch: the first request in a page load that contains FAIL_TAG gets a broken body
 * (cut off after the first item), so it cannot be read. Every later request works,
 * including "Try again", which resends the same text.
 */
export async function getMockReply(request: string): Promise<string> {
  await new Promise((resolve) => setTimeout(resolve, FAKE_LATENCY_MS));

  const cards: CardItem[] = [
    { cardType: "stay", details: pickRandom(STAYS) },
    { cardType: "experience", details: pickRandom(EXPERIENCES) },
    { cardType: "food", details: pickRandom(FOOD) },
  ];
  const body = JSON.stringify(cards);

  if (request.toLowerCase().includes(FAIL_TAG) && !failSwitchSpent) {
    failSwitchSpent = true;
    const firstItem = JSON.stringify(cards[0]);
    return body.slice(0, firstItem.length + 1 + 12); // "[{...},{"card" – broken mid-item
  }

  return body;
}
