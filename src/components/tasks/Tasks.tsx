import { SortableContext } from "@dnd-kit/sortable";
import { TasksProps } from "../../type";
import Task from "./Task";
import { useMemo } from "react";

export default function Tasks({ tasks }: TasksProps) {
  const tasksId = useMemo(() => tasks.map((task) => task.id), [tasks]);

  return (
    <div className="tasks flex flex-grow flex-col gap-2 p-2 text-base">
      <SortableContext items={tasksId}>
        {tasks.map((task) => (
          <Task key={task.id} task={task} />
        ))}
      </SortableContext>
    </div>
  );
}
