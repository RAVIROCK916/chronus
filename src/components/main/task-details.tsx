"use client";

import { Task } from "@/types";
import { Avatar } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { EditableText } from "@/components/shared/Editable-Text";
import TextEditor from "@/components/shared/text-editor";
import Tiptap from "./Tiptap";
import { useEffect, useState } from "react";
import { useDebounce } from "@/hooks/useDebounce";
import { UPDATE_TASK } from "@/lib/apollo/client/task";
import { useMutation } from "@apollo/client";

type TaskDetailsProps = {
  task: Task;
};

const EditableInput = EditableText(Input);
const EditableTextarea = EditableText(Textarea);

export default function TaskDetails({ task }: TaskDetailsProps) {
  const [description, setDescription] = useState(task.description || "");

  const debouncedDescription = useDebounce(description, 500);

  const [updateTask] = useMutation(UPDATE_TASK);

  useEffect(() => {
    if (debouncedDescription !== task.description) {
      console.log("Updating task description:", debouncedDescription);
      // Update the task description in the database or perform any other necessary actions
      updateTask({
        variables: {
          id: task.id,
          description: debouncedDescription,
        },
      });
    }
  }, [debouncedDescription]);

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <EditableInput
          value={task.title}
          taskId={task.id}
          fieldName="title"
          className="border-0 px-0 py-6 text-4xl shadow-none transition-colors hover:bg-background-tertiary focus-visible:ring-0"
        />
        {/* <EditableTextarea
          value={task.description || ""}
          taskId={task.id}
          fieldName="description"
          className="min-h-96 resize-none border-0 px-4 py-2 text-base text-text-tertiary transition-colors hover:bg-background-secondary focus-visible:ring-0"
          style={{ fieldSizing: "content" }}
        /> */}
        <div className="space-y-2">
          <p>Description</p>
          <Tiptap
            value={description}
            onChange={(val) => {
              setDescription(val);
            }}
          />
        </div>
      </div>
      {/* <Separator /> */}
      {/* <div className="space-y-2">
        <h6 className="text-sm">Comments</h6>
        <Textarea placeholder="Add a comment" className="h-28" />
        {task.comments && (
          <div className="space-y-4">
            {task.comments.map((comment) => (
              <div key={comment.id}>
                <div className="flex items-center gap-2">
                  <Avatar
                    className="h-6 w-6"
                    // src={comment.user.profile_picture || ""}
                  />
                  <div>
                    <p className="text-sm text-text-muted">
                      {comment.user.name}
                    </p>
                    <p className="text-sm text-text-muted">
                      {comment.created_at}
                    </p>
                  </div>
                </div>
                <p>{comment.content}</p>
              </div>
            ))}
          </div>
        )}
      </div> */}
    </div>
  );
}
