import { useContext, useState } from "react";
import { BsTrash } from "react-icons/bs";
import { FaPlus } from "react-icons/fa";
import { ColumnProps, TasksContextTypes, ToDoContextType } from "../../type";
import { useSwalConfirm } from "../../hook/useSwalConfirm";
import { TasksContext } from "../../context/TasksContext";
import { newTask, updateColumn } from "../../toast/Toast";
import { ToDoContext } from "../../context/ToDoContext";
import Tasks from "../tasks/Tasks";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export default function Column({ column }: ColumnProps) {
  const { id, title, editMode } = column;
  const [colValue, setColValue] = useState<string>("");
  const { askForDelete } = useSwalConfirm();

  const { tasks, handelAddTasks } = useContext(
    TasksContext,
  ) as TasksContextTypes;
  const { updateColumnTitle, isSmallScreen } = useContext(
    ToDoContext,
  ) as ToDoContextType;

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: column.id,
    data: { type: "Column", column },
    disabled: isSmallScreen,
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  if (isDragging)
    return (
      <div
        style={style}
        ref={setNodeRef}
        className="flex min-h-80 w-64 flex-col rounded-md border-2 border-primaryColor bg-[#5f7470] pb-2 indent-[5px] text-ColorGround opacity-30 xs:min-w-80 sm:min-w-64 lg:min-w-72 xl:min-w-80"
      ></div>
    );

  return (
    <div
      style={style}
      ref={setNodeRef}
      className="flex min-h-80 w-64 flex-col rounded-md bg-[#5f7470] pb-2 indent-[5px] text-ColorGround xs:min-w-80 sm:min-w-64 lg:min-w-72 xl:min-w-80"
    >
      {!editMode && (
        <div
          {...attributes}
          {...listeners}
          className="group relative cursor-grab border-b-[1px] border-ColorGround pb-1 pr-4 pt-2"
        >
          <h1
            className="overflow-hidden text-ellipsis text-nowrap hover:text-wrap"
            onClick={() => {
              updateColumnTitle(id, colValue);
              setColValue(title);
            }}
          >
            {title}
          </h1>

          <button
            onClick={() => {
              askForDelete(id);
            }}
            className="absolute right-0 top-2 p-1 opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-100"
          >
            <BsTrash />
          </button>
        </div>
      )}
      {editMode && (
        <input
          className="rounded-t-md border-b-[1px] border-ColorGround bg-[#51635f] pb-1 pl-[5px] pt-2 caret-ColorGround outline-none"
          value={colValue}
          onChange={(e) => setColValue(e.target.value)}
          autoFocus
          onBlur={() => {
            updateColumnTitle(id, colValue);
            if (colValue.trim() !== title) updateColumn();
          }}
          onKeyDown={(e) => {
            if (e.key !== "Enter") return;
            if (colValue.trim() !== title) updateColumn();
            updateColumnTitle(id, colValue);
          }}
        />
      )}
      <Tasks tasks={tasks.filter((task) => task.columnId === id)} />
      <button
        onClick={() => (handelAddTasks(id), newTask())}
        className="flex items-center pl-1 indent-[2px] text-sm"
      >
        <FaPlus /> New Task
      </button>
    </div>
  );
}
