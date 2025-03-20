"use client";

import CurrentTimer from "../../../components/main/current-timer";

export default function Dashboard({ data }: any) {
  return (
    <div>
      {/* <h1>Dashboard</h1>
      <p>Welcome to your dashboard</p> */}
      <CurrentTimer />
    </div>
  );
}
