import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Task } from "@/types";
import TasksTable from "./tasks-table";
import { useMemo } from "react";

type Props = {
  tasks: Task[];
};

const ProjectTasksTable = ({ tasks }: Props) => {
  const groupedTasks = useMemo(getGroupedTasks, [tasks]);

  const items = [
    {
      id: "1",
      title: "To Do",
      content: <TasksTable tasks={groupedTasks["TODO"]} />,
    },
    {
      id: "2",
      title: "In Progress",
      content: <TasksTable tasks={groupedTasks["IN_PROGRESS"]} />,
    },
    {
      id: "3",
      title: "Completed",
      content: <TasksTable tasks={groupedTasks["DONE"]} />,
    },
  ];

  function getGroupedTasks() {
    return tasks.reduce(
      (acc, task) => {
        if (!acc[task.status]) {
          acc[task.status] = [];
        } else {
          acc[task.status].push(task);
        }
        return acc;
      },
      {} as { [key: string]: Array<Task> },
    );
  }

  console.log("groupedTasks", groupedTasks);

  return (
    <div className="space-y-4">
      {/* <h2 className="text-xl font-bold">List</h2> */}
      <Accordion type="multiple" className="w-full">
        {items.map((item) => (
          <AccordionItem
            value={item.id}
            key={item.id}
            className="py-2"
            data-state="open"
          >
            <AccordionTrigger className="justify-start gap-3 py-2 text-[15px] leading-6 hover:no-underline [&>svg]:-order-1">
              <span className="inline-block w-full rounded bg-background-quaternary px-4 py-1.5">
                {item.title}
              </span>
            </AccordionTrigger>
            <AccordionContent className="pb-2 ps-7 text-muted-foreground">
              {item.content}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default ProjectTasksTable;
