import React, { useState, useRef, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { UPDATE_TASK } from "@/lib/apollo/client/task";

export const EditableText = (Component: React.ComponentType<any>) => {
  return function EditableWrapper({
    value,
    taskId,
    fieldName,
    className,
    style,
    ...props
  }: {
    value: string;
    taskId: string;
    fieldName: "title" | "description";
    className?: string;
    style?: Record<string, string>;
    [key: string]: any;
  }) {
    const [isEditing, setIsEditing] = useState(false);
    const [text, setText] = useState(value);
    const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);

    const [updateTask, { loading }] = useMutation(UPDATE_TASK);

    useEffect(() => {
      if (isEditing && inputRef.current) {
        inputRef.current.focus();
      }
    }, [isEditing]);

    const handleClick = () => {
      setIsEditing(true);
    };

    const handleChange = (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
      setText(e.target.value);
    };

    const handleBlur = async () => {
      setIsEditing(false);

      if (text !== value) {
        try {
          const variables = {
            id: taskId,
            [fieldName]: text,
          };

          await updateTask({ variables });
        } catch (error) {
          console.error("Failed to update task:", error);
          setText(value); // Revert to original value on error
        }
      }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === "Enter" && fieldName === "title") {
        e.preventDefault();
        inputRef.current?.blur();
      } else if (e.key === "Escape") {
        setText(value);
        setIsEditing(false);
      }
    };

    return (
      <div onClick={!isEditing ? handleClick : undefined}>
        <Component
          ref={inputRef}
          value={text}
          onChange={handleChange}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          className={`${className} ${isEditing ? "bg-background-tertiary" : ""}`}
          style={style}
          readOnly={!isEditing}
          {...props}
        />
      </div>
    );
  };
};
