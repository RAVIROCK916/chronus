import { useEffect, useState } from "react";

import { Card, CardContent } from "@/components/ui/card";
import FlipUnit from "@/components/main/flip-unit";

export default function CurrentTimer() {
  const [currentTime, setCurrentTime] = useState(new Date());

  // Format time strings
  const hours = currentTime.getHours().toString().padStart(2, "0");
  const minutes = currentTime.getMinutes().toString().padStart(2, "0");
  const seconds = currentTime.getSeconds().toString().padStart(2, "0");

  console.log("hours", hours, "minutes", minutes, "seconds", seconds);

  // Format date strings
  const day = currentTime.getDate();
  const month = currentTime.toLocaleString("default", { month: "long" });
  const year = currentTime.getFullYear();

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div>
      <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-background to-muted p-4">
        <Card className="w-full max-w-md border-primary/20 bg-background/80 backdrop-blur">
          <CardContent className="p-6">
            <div className="text-center">
              <p className="mb-4 text-sm font-medium text-muted-foreground">
                {month} {day}, {year}
              </p>

              <div className="flex items-center justify-center gap-2">
                <FlipUnit unit="hours" value={hours} />
                <div className="text-4xl font-bold">:</div>
                <FlipUnit unit="minutes" value={minutes} />
                <div className="text-4xl font-bold">:</div>
                <FlipUnit unit="seconds" value={seconds} />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
