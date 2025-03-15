import dynamic from "next/dynamic";

const KanbanBoard = dynamic(() => import("./kanban-board"), {
  ssr: false,
});

export default function ClientKanbanBoard() {
  return <KanbanBoard />;
}
