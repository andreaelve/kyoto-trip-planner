// Shapes of the three itinerary cards. One type per card component.

export type Stay = {
  optionId: string;
  listingTitle: string;
  propertyType: string;
  neighbourhood: string;
  nights: number;
  pricePerNightUsd: number;
  /** Shown exactly as the workbook gives it. */
  totalUsd: number;
  guestRating: number;
  reviewCount: number;
  hostFirstName: string;
  highlight: string;
  checkIn: string; // YYYY-MM-DD
  checkOut: string; // YYYY-MM-DD
};

export type Experience = {
  optionId: string;
  title: string;
  category: string;
  hostFirstName: string;
  date: string; // YYYY-MM-DD
  startTime: string; // HH:MM
  durationHours: number;
  pricePerGuestUsd: number;
  totalFor2Usd: number;
  rating: number;
  meetingPoint: string;
  availability: "Spots open" | "Sold out";
};

export type Food = {
  optionId: string;
  placeName: string;
  cuisine: string;
  neighbourhood: string;
  meal: string;
  priceLevel: "$" | "$$" | "$$$";
  estCostFor2Usd: number;
  walkFromStayMin: number;
  bookingNote: string;
};

/** One item in a mock reply. `cardType` tells the chat which card to draw. */
export type CardItem =
  | { cardType: "stay"; details: Stay }
  | { cardType: "experience"; details: Experience }
  | { cardType: "food"; details: Food };

export type ChatMessage =
  | { id: string; role: "user"; text: string }
  | { id: string; role: "assistant"; status: "thinking" }
  | { id: string; role: "assistant"; status: "done"; text: string; cards?: CardItem[] }
  /** The reply could not be read. `request` is resent by Try again; `retried` greys the button out after use. */
  | { id: string; role: "assistant"; status: "error"; request: string; retried: boolean };
