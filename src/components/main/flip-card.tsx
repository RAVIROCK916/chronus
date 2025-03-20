import { useEffect, useRef } from "react";

import { flip } from "@/utils/flip";

type Props = {
  dataAttribute: string;
};

export default function FlipCard({ dataAttribute }: Props) {
  const flipCardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const flipCard = document.querySelector(".flip-card");

    if (!flipCard) return;

    // Clean up function to remove elements when component unmounts
    return () => {
      const topFlip = flipCard.querySelector(".top-flip");
      const bottomFlip = flipCard.querySelector(".bottom-flip");

      if (topFlip) topFlip.remove();
      if (bottomFlip) bottomFlip.remove();
    };
  }, []);

  return (
    <div className="flip-card" ref={flipCardRef} {...{ [dataAttribute]: "" }}>
      <div className="top">9</div>
      <div className="bottom">9</div>
    </div>
  );
}
