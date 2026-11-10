import type { CardItem } from "@/lib/types";
import ExperienceCard from "./ExperienceCard";
import FoodCard from "./FoodCard";
import StayCard from "./StayCard";

const ORDER: CardItem["cardType"][] = ["stay", "experience", "food"];

/** Draws each item with its own component, always in the order stay, experience, food. */
export default function CardList({ cards }: { cards: CardItem[] }) {
  const sorted = [...cards].sort((a, b) => ORDER.indexOf(a.cardType) - ORDER.indexOf(b.cardType));

  return (
    <div className="space-y-3">
      {sorted.map((card) => {
        switch (card.cardType) {
          case "stay":
            return <StayCard key="stay" stay={card.details} />;
          case "experience":
            return <ExperienceCard key="experience" experience={card.details} />;
          case "food":
            return <FoodCard key="food" food={card.details} />;
        }
      })}
    </div>
  );
}
