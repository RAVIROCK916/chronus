import { flipAllCards } from "@/utils/flip";
import FlipCard from "./flip-card";

import { useEffect, useState } from "react";

export default function CurrentTimer() {
  const [isAM, setIsAM] = useState(true);
  // Update time every second
  useEffect(() => {
    const currentDate = new Date().setHours(0, 0, 0);
    let previousTime: number;
    const timer = setInterval(() => {
      const newDate = new Date();
      const timeBetween = Math.floor((newDate.getTime() - currentDate) / 1000);
      const hours = Math.floor(timeBetween / 3600) % 12;
      if (hours >= 12) {
        setIsAM(false);
      }
      flipAllCards(timeBetween);

      previousTime = timeBetween;
    }, 250);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex gap-2">
      <div className="inline-flex gap-6">
        <div className="container-segment">
          <FlipCard dataAttribute="data-hours-tens" />
          <FlipCard dataAttribute="data-hours-ones" />
        </div>
        <div className="container-segment">
          <FlipCard dataAttribute="data-minutes-tens" />
          <FlipCard dataAttribute="data-minutes-ones" />
        </div>
        <div className="container-segment">
          <FlipCard dataAttribute="data-seconds-tens" />
          <FlipCard dataAttribute="data-seconds-ones" />
        </div>
      </div>
      <div>{isAM ? <p>AM</p> : <p>PM</p>}</div>
    </div>
  );
}
