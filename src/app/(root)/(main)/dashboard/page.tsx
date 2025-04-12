"use client";

import CurrentTimer from "@/components/main/current-timer";
import { GET_PROJECTS } from "@/lib/apollo/client/project";
import { useQuery } from "@apollo/client";

export default function Page() {
  const { data: projects } = useQuery(GET_PROJECTS);
  console.log("projects", projects);
  return (
    <div>
      <CurrentTimer />
    </div>
  );
}
