"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface FlipUnitProps {
  unit: string;
  value: string;
}

export default function FlipUnit({ unit, value }: FlipUnitProps) {
  const [currentValue, setCurrentValue] = useState(value);
  const [previousValue, setPreviousValue] = useState(value);
  const [isFlipping, setIsFlipping] = useState(false);

  useEffect(() => {
    // Only animate if the value has actually changed
    if (value !== currentValue) {
      setPreviousValue(currentValue);
      setCurrentValue(value);
      setIsFlipping(true);

      // Reset animation flag after animation completes
      const timer = setTimeout(() => {
        setIsFlipping(false);
      }, 600);

      return () => clearTimeout(timer);
    }
  }, [value, currentValue]);

  return (
    <div className="relative h-20 w-16 sm:h-24 sm:w-20">
      <div className="flip-card-container relative h-full w-full [perspective:1000px]">
        {/* Top half (static) */}
        <div className="absolute top-0 z-10 h-[49%] w-full overflow-hidden rounded-t-md bg-primary/10 shadow-sm">
          <div className="absolute bottom-0 flex h-[200%] w-full items-center justify-center">
            <span className="text-3xl font-bold tabular-nums sm:text-4xl">
              {currentValue}
            </span>
          </div>
        </div>

        {/* Bottom half (static) */}
        <div className="absolute bottom-0 z-10 h-[49%] w-full overflow-hidden rounded-b-md bg-primary/5 shadow-sm">
          <div className="absolute top-0 flex h-[200%] w-full items-center justify-center">
            <span className="text-3xl font-bold tabular-nums sm:text-4xl">
              {currentValue}
            </span>
          </div>
        </div>

        {/* Divider line */}
        <div className="absolute left-0 right-0 top-1/2 z-20 h-[1px] w-full -translate-y-[0.5px] bg-primary/20"></div>

        {/* Flipping card - only shown during animation */}
        {isFlipping && (
          <>
            {/* Top flap - flips down */}
            <div
              className={cn(
                "absolute top-0 z-30 h-[49%] w-full overflow-hidden rounded-t-md bg-primary/10 shadow-md",
                "[transform-origin:bottom] [transform-style:preserve-3d]",
                "animate-[flip-down_0.6s_cubic-bezier(0.4,0,0.2,1)_forwards]",
              )}
            >
              <div className="absolute bottom-0 flex h-[200%] w-full items-center justify-center">
                <span className="text-3xl font-bold tabular-nums sm:text-4xl">
                  {previousValue}
                </span>
              </div>
            </div>

            {/* Bottom flap - starts flipped up, then flips down */}
            <div
              className={cn(
                "absolute bottom-0 z-30 h-[49%] w-full overflow-hidden rounded-b-md bg-primary/5 shadow-md",
                "[transform-origin:top] [transform-style:preserve-3d] [transform:rotateX(-90deg)]",
                "animate-[flip-up_0.6s_cubic-bezier(0.4,0,0.2,1)_forwards]",
              )}
            >
              <div className="absolute top-0 flex h-[200%] w-full items-center justify-center">
                <span className="text-3xl font-bold tabular-nums sm:text-4xl">
                  {currentValue}
                </span>
              </div>
            </div>
          </>
        )}
      </div>

      <div className="absolute -bottom-6 left-0 right-0 text-center text-xs text-muted-foreground">
        {unit}
      </div>
    </div>
  );
}
