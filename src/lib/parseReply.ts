import type { CardItem } from "./types";

const CARD_TYPES = ["stay", "experience", "food"] as const;

/**
 * Reads a response body into cards. Throws if the body does not parse, does not hold exactly
 * one stay, one experience and one food item, or has an unknown cardType.
 * The chat shows the friendly bubble whenever this throws.
 */
export function parseReply(body: string): CardItem[] {
  const data: unknown = JSON.parse(body);

  if (!Array.isArray(data) || data.length !== CARD_TYPES.length) {
    throw new Error(`Expected ${CARD_TYPES.length} cards`);
  }

  for (const item of data) {
    const ok =
      typeof item === "object" &&
      item !== null &&
      CARD_TYPES.includes((item as CardItem).cardType) &&
      typeof (item as CardItem).details === "object";
    if (!ok) throw new Error("Unknown or incomplete card");
  }

  const types = new Set(data.map((item: CardItem) => item.cardType));
  if (types.size !== CARD_TYPES.length) throw new Error("Each card type must appear once");

  return data as CardItem[];
}
