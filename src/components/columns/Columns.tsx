import { arrayMove, SortableContext } from "@dnd-kit/sortable";
import { useContext, useMemo, useState } from "react";
import { BiCommentAdd } from "react-icons/bi";
import { createPortal } from "react-dom";
import { TasksContext } from "../../context/TasksContext";
import { ToDoContext } from "../../context/ToDoContext";
import { newColumn } from "../../toast/Toast";
import Task from "../tasks/Task";
import Column from "./Column";
import {
  ColumnsType,
  TasksContextTypes,
  TasksType,
  ToDoContextType,
} from "../../type";
import {
  DndContext,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";

export default function Columns() {
  const { setTasks } = useContext(TasksContext) as TasksContextTypes;
  const { columns, setColumns, onAddColumn } = useContext(
    ToDoContext,
  ) as ToDoContextType;
  const columnsId = useMemo(() => columns.map((col) => col.id), [columns]);
  const [activeColumn, setActiveColumn] = useState<ColumnsType | null>(null);
  const [activeTask, setActiveTask] = useState<TasksType | null>(null);

  /* handel drag start */
  function onDragStart(event: DragStartEvent) {
    if (event.active.data.current?.type === "Column") {
      setActiveColumn(event.active.data.current.column);
      return;
    }
    if (event.active.data.current?.type === "Task") {
      setActiveTask(event.active.data.current.task);
      return;
    }
  }

  /* handel drag end */
  function onDragEnd() {
    setActiveColumn(null);
    setActiveTask(null);
  }

  /* handle drag over */
  function onDragOver(event: DragOverEvent) {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const isActiveATask = active.data.current?.type === "Task";
    const isOverATask = over.data.current?.type === "Task";
    const isActiveAColumn = active.data.current?.type === "Column";
    const isOverAColumn = over.data.current?.type === "Column";

    /* Prevent dragging a column over a task */
    if (isActiveAColumn && isOverATask) return;

    /* Prevent dragging a task over a column if the column is being dragged */
    if (isActiveATask && isOverAColumn && isActiveAColumn) return;

    /* Handle task dragging over another task */
    if (isActiveATask && isOverATask) {
      setTasks((tasks) => {
        const activeIndex = tasks.findIndex((t) => t.id === activeId);
        const overIndex = tasks.findIndex((t) => t.id === overId);

        tasks[activeIndex].columnId = tasks[overIndex].columnId;

        return arrayMove(tasks, activeIndex, overIndex);
      });
    }

    /* Handle task dragging over a column */
    if (isActiveATask && isOverAColumn) {
      setTasks((tasks) => {
        const activeIndex = tasks.findIndex((t) => t.id === activeId);

        tasks[activeIndex].columnId = overId;

        return arrayMove(tasks, activeIndex, activeIndex);
      });
    }

    /* Handle column dragging over another column */
    if (isActiveAColumn && isOverAColumn) {
      setColumns((columns) => {
        const activeIndex = columns.findIndex((col) => col.id === activeId);
        const overIndex = columns.findIndex((col) => col.id === overId);

        return arrayMove(columns, activeIndex, overIndex);
      });
    }
  }

  /* sensors */
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 1,
      },
    }),
  );

  return (
    <DndContext
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onDragOver={onDragOver}
      sensors={sensors}
    >
      <div className="custom-scrollbar flex flex-col items-center justify-start gap-8 overflow-auto p-3 pb-10 pt-4 shadow-custom sm:h-[calc(100vh-160px)] sm:flex-row sm:items-start">
        <SortableContext items={columnsId}>
          {columns.map((col) => (
            <Column key={col.id} column={col} />
          ))}
        </SortableContext>
        <button
          onClick={() => (onAddColumn(), newColumn())}
          className="btn-hover relative text-sm text-primaryColor"
        >
          <BiCommentAdd size={30} />
        </button>
      </div>
      {createPortal(
        <DragOverlay>
          {activeColumn && <Column column={activeColumn} />}
          {activeTask && <Task task={activeTask} />}
        </DragOverlay>,
        document.body,
      )}
    </DndContext>
  );
}
