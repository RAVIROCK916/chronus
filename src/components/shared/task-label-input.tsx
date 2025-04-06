"use client";

import { KeyboardEvent, useEffect, useId, useRef, useState } from "react";
import { TagInput } from "emblor";

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
  labels: string[];
  onChange: (labels: string[]) => void;
};

export default function TaskLabelInput({
  labels,
  onChange,
}: TaskLabelInputProps) {
  const id = useId();
  const [activeTagIndex, setActiveTagIndex] = useState<number | null>(null);
  const [inputLabels, setInputLabels] = useState(
    labels.map((label) => ({ id: Math.random().toString(), text: label })),
  );

  return (
    <div className="*:not-first:mt-2 space-y-2">
      <Label htmlFor={id}>
        Labels <span className="text-xs text-text-muted">(optional)</span>
      </Label>
      <TagInput
        id={id}
        tags={inputLabels}
        setTags={(newLabels) => {
          if (typeof newLabels === "function") {
            const updatedLabels = newLabels(inputLabels);
            onChange(updatedLabels.map((label) => label.text));
          } else {
            onChange(newLabels.map((label) => label.text));
          }
          setInputLabels(newLabels);
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
