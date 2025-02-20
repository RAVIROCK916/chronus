"use client";

import { gql, useMutation } from "@apollo/client";

import AddButton from "@/components/shared/add-button";
import BreadCrumb from "@/components/shared/breadcrumb";
import KanbanBoard from "@/components/main/kanban-board";

export default function ProjectPage({ params }: { params: { name: string } }) {
  const { name } = params;
  const [addTask] = useMutation(gql`
    mutation AddTask($projectId: ID!, $name: String!) {
      addTask(projectId: $projectId, name: $name) {
        id
        name
      }
    }
  `);
  return (
    <div className="space-y-4">
      <BreadCrumb />
      <div>
        <AddButton text="Add task" />
      </div>
      <KanbanBoard />
    </div>
  );
}
