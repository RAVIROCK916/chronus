"use client";

import { Task } from "@/types";
import { useState } from "react";
import { Avatar } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

type TaskDetailsProps = {
  task: Task;
};

export default function TaskDetails({ task }: TaskDetailsProps) {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <Input
          value={task.title}
          className="border-0 p-0 text-4xl shadow-none focus-visible:ring-0"
        />
        <Textarea
          value={task.description}
          className="min-h-48 resize-none border-0 p-0 text-base focus-visible:ring-0"
        />
      </div>
      {/* <Separator /> */}
      <div className="space-y-2">
        <h6 className="text-sm text-text-muted">Comments</h6>
        <Input placeholder="Add a comment" />
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
      </div>
    </div>
  );
}
