"use client";

import { Task } from "@/types";
import { Edit } from "lucide-react";
import { CiEdit } from "react-icons/ci";
import { Sheet, SheetTrigger } from "../ui/sheet";
import TaskSheet from "../shared/task-sheet";
import { useState } from "react";

type TaskDetailsProps = {
  task: Task;
};

export default function TaskDetails({ task }: TaskDetailsProps) {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  return (
    <div className="space-y-4">
      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <div className="group relative flex">
          <span className="absolute -left-12 bottom-1 hidden px-4 group-hover:flex">
            <SheetTrigger>
              <CiEdit className="size-5 cursor-pointer text-text-muted transition-colors duration-75 hover:text-primary" />
            </SheetTrigger>
          </span>
          <h2 className="text-4xl">{task.title}</h2>
        </div>
        <div className="group relative flex">
          <span className="absolute -left-12 bottom-1 hidden items-end px-4 group-hover:flex">
            <SheetTrigger>
              <CiEdit className="size-5 cursor-pointer text-text-muted transition-colors duration-75 hover:text-primary" />
            </SheetTrigger>
          </span>
          <p className="text-xl">{task.description}</p>
        </div>
        <TaskSheet task={task} onClose={() => setIsSheetOpen(false)} />
      </Sheet>
    </div>
  );
}
