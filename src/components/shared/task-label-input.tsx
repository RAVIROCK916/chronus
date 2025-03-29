"use client";

import { KeyboardEvent, useEffect, useId, useRef, useState } from "react";
import { Tag, TagInput } from "emblor";

import { Label } from "@/components/ui/label";
import { UPDATE_TASK_LABELS } from "@/lib/apollo/client/task";
import { useMutation } from "@apollo/client";

const labels = [
  {
    id: "1",
    text: "Sport",
  },
  {
    id: "2",
    text: "Coding",
  },
  {
    id: "3",
    text: "Travel",
  },
];

type TaskLabelInputProps = {
  taskId: string;
  taskLabels: string[];
};

export default function TaskLabelInput({
  taskId,
  taskLabels,
}: TaskLabelInputProps) {
  const id = useId();
  const [exampleLabels, setExampleLabels] = useState<Tag[]>(labels);
  const [activeTagIndex, setActiveTagIndex] = useState<number | null>(null);

  const isFirstRender = useRef(true);

  const [updateTaskLabels] = useMutation(UPDATE_TASK_LABELS);

  useEffect(() => {
    if (isFirstRender.current === true) {
      isFirstRender.current = false;
      return;
    }
    updateTaskLabels({
      variables: {
        id: taskId,
        labels: exampleLabels.map((label) => label.text),
      },
    });
  }, [exampleLabels]);

  return (
    <div className="*:not-first:mt-2">
      <Label htmlFor={id}>Labels</Label>
      <TagInput
        id={id}
        tags={exampleLabels}
        setTags={(newLabels) => {
          setExampleLabels(newLabels);
        }}
        placeholder="Add a label"
        styleClasses={{
          tagList: {
            container: "gap-1",
          },
          input:
            "rounded-md transition-[color,box-shadow] placeholder:text-muted-foreground/70 focus-visible:border-ring outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50",
          tag: {
            body: "relative h-7 bg-background border border-input hover:bg-background rounded-md font-medium text-xs ps-2 pe-7",
            closeButton:
              "absolute -inset-y-px -end-px p-0 rounded-s-none rounded-e-md flex size-7 transition-[color,box-shadow] outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] text-muted-foreground/80 hover:text-foreground",
          },
        }}
        activeTagIndex={activeTagIndex}
        setActiveTagIndex={setActiveTagIndex}
        inlineTags={false}
        inputFieldPosition="bottom"
      />
    </div>
  );
}
