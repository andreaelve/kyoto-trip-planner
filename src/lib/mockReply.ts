import { EXPERIENCES, FOOD, STAYS } from "./mockData";
import type { CardItem } from "./types";

/** How long the fake assistant "thinks" before answering. */
const FAKE_LATENCY_MS = 1400;

function pickRandom<T>(rows: T[]): T {
  return rows[Math.floor(Math.random() * rows.length)];
}

/**
 * Stands in for the real assistant. Picks one random row from each sheet
 * on every request and returns the cards in the fixed order: stay, experience, food.
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars -- the real assistant will read the request
export async function getMockReply(request: string): Promise<CardItem[]> {
  await new Promise((resolve) => setTimeout(resolve, FAKE_LATENCY_MS));
  return [
    { cardType: "stay", details: pickRandom(STAYS) },
    { cardType: "experience", details: pickRandom(EXPERIENCES) },
    { cardType: "food", details: pickRandom(FOOD) },
  ];
}
