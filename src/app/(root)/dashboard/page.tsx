"use client";

import CurrentTimer from "@/components/main/current-timer";

import React, { useEffect, useState } from "react";

export const FlippingTimer = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (value: number) => value.toString().padStart(2, "0");

  const hours = formatTime(time.getHours());
  const minutes = formatTime(time.getMinutes());
  const seconds = formatTime(time.getSeconds());

  const TimeUnit = ({ value }: { value: string }) => (
    <div className="relative h-24 w-16 overflow-hidden rounded-lg bg-gray-900 font-mono text-4xl text-white shadow-lg">
      <div className="absolute inset-0 flex items-center justify-center bg-gray-800">
        {value}
      </div>
      <div className="flip-animation absolute inset-0 flex items-center justify-center bg-gray-900">
        {value}
      </div>
    </div>
  );

  return (
    <div className="flex h-screen items-center justify-center space-x-4">
      <TimeUnit value={hours} />
      <span className="text-4xl text-white">:</span>
      <TimeUnit value={minutes} />
      <span className="text-4xl text-white">:</span>
      <TimeUnit value={seconds} />
      <style jsx>{`
        @keyframes flip {
          0% {
            transform: rotateX(0);
          }
          50% {
            transform: rotateX(-90deg);
          }
          100% {
            transform: rotateX(0);
          }
        }
        .flip-animation {
          animation: flip 1s ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default function Dashboard({ data }: any) {
  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome to your dashboard</p>
      {/* <CurrentTimer /> */}
      {/* <FlippingTimer /> */}
    </div>
  );
}
