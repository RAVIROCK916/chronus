import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Task } from "@/types";
import { MdOutlineDescription } from "react-icons/md";
import TextEditor from "./text-editor";
import TaskStatusSelect from "./task-status-select";
import TaskPrioritySelect from "./task-priority-select";
import TaskLabelInput from "./task-label-input";
import { useMutation } from "@apollo/client";
import { CREATE_TASK, UPDATE_TASK } from "@/lib/apollo/client/task";
import { useState, useEffect } from "react";
import DatePicker from "./date-picker";

type TaskSheetProps = {
  task?: {
    id?: string;
    title?: string;
    description?: string;
    status?: string;
    priority?: string;
    labels?: string[];
    dueDate?: string;
  };
  projectId?: string;
  onClose: () => void;
  onSuccess?: () => void;
};

export default function TaskSheet({
  task,
  projectId,
  onClose,
  onSuccess,
}: TaskSheetProps) {
  const isEditMode = !!task?.id;

  const title = task?.title || "";
  const description = task?.description;
  const status = task?.status || "TODO";
  const priority = task?.priority || "LOW";
  const labels = task?.labels;
  const dueDate = task?.dueDate || null;

  // Initialize state with task data or empty values
  const [formData, setFormData] = useState<{
    title: string;
    description?: string;
    status: string;
    priority: string;
    labels?: string[];
    dueDate: string | null;
  }>({
    title,
    description,
    status,
    priority,
    labels,
    dueDate,
  });

  // Update form data when task changes
  useEffect(() => {
    if (task) {
      setFormData({
        title,
        description,
        status,
        priority,
        labels,
        dueDate,
      });
    }
  }, [task]);

  // Create task mutation
  const [createTask, { loading: createLoading }] = useMutation(CREATE_TASK, {
    onCompleted: () => {
      onSuccess?.();
      onClose();
    },
  });

  // Update task mutation
  const [updateTask, { loading: updateLoading }] = useMutation(UPDATE_TASK, {
    onCompleted: () => {
      onSuccess?.();
      onClose();
    },
  });

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = () => {
    console.log(formData);
    if (isEditMode && task) {
      updateTask({
        variables: {
          id: task.id,
          title: formData.title,
          description: formData.description,
          status: formData.status,
          priority: formData.priority,
          labels: formData.labels,
          dueDate: formData.dueDate,
        },
      });
    } else if (projectId) {
      createTask({
        variables: {
          title: formData.title,
          description: formData.description,
          status: formData.status,
          priority: formData.priority,
          labels: formData.labels,
          projectId: projectId,
          dueDate: formData.dueDate,
        },
      });
    }
  };

  return (
    <SheetContent
      className="min-w-[500px] p-0"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Header */}
      <SheetHeader className="px-6 py-4">
        <SheetTitle className="text-sm font-medium">
          {isEditMode ? "Edit Task" : "New Task"}
        </SheetTitle>
      </SheetHeader>
      <Separator />
      <div className="space-y-4 px-6 py-4">
        {/* Task Name */}
        <div className="space-y-1">
          <Label className="text-sm text-text-muted">Name</Label>
          <Input
            value={formData.title}
            onChange={(e) => handleInputChange("title", e.target.value)}
            placeholder="Task name"
          />
        </div>
        <div className="flex items-center justify-center gap-4">
          <div className="flex-1 space-y-1">
            <Label className="text-sm text-text-muted">Status</Label>
            <TaskStatusSelect
              id={task?.id}
              taskStatus={formData.status}
              onChange={(status) => handleInputChange("status", status)}
            />
          </div>
          <div className="flex-1 space-y-1">
            <Label className="text-sm text-text-muted">Priority</Label>
            <TaskPrioritySelect
              id={task?.id}
              taskPriority={formData.priority}
              onChange={(priority) => handleInputChange("priority", priority)}
            />
          </div>
        </div>
        <div className="space-y-1">
          <Label className="text-text-muted">Labels</Label>
          <TaskLabelInput
            labels={formData.labels || []}
            onChange={(labels) => handleInputChange("labels", labels)}
          />
        </div>
        {/* Due Date */}
        <div className="flex flex-col space-y-2">
          <Label className="text-text-muted">Due Date</Label>
          <DatePicker />
        </div>
        {/* Task Description */}
        <div className="space-y-1">
          <Label className="text-text-muted">Description</Label>
          <TextEditor
            initialValue={formData.description}
            onChange={(content) => handleInputChange("description", content)}
          />
        </div>
      </div>
      {/* Footer */}
      <SheetFooter className="px-6 py-4">
        <Button variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          disabled={createLoading || updateLoading || !formData.title}
        >
          {isEditMode ? "Update" : "Create"}
        </Button>
      </SheetFooter>
    </SheetContent>
  );
}
