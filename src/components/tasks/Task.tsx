import { useContext, useState } from "react";
import { BsTrash } from "react-icons/bs";
import { CiEdit } from "react-icons/ci";
import { TasksContextTypes, TasksType } from "../../type";
import { TasksContext } from "../../context/TasksContext";
import { useSweetEdit } from "../../hook/useSweetEdit";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export default function Task({ task }: { task: TasksType }) {
  const [valueInput, setValueInput] = useState<string>(task.title);
  const { handleEditTask } = useSweetEdit();
  const { handleDeleteTask, handelNewTask, handelEmptyTask } = useContext(
    TasksContext,
  ) as TasksContextTypes;

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id, data: { type: "Task", task } });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  if (isDragging) {
    return (
      <div
        style={style}
        ref={setNodeRef}
        className="min-h-10 rounded-[5px] border-2 border-[#2d3a3767] bg-[#718783] opacity-30"
      />
    );
  }

  const toggleNewTask = (e: React.SyntheticEvent) => {
    e.preventDefault();
    handelEmptyTask();
    handelNewTask(task.id, valueInput);
  };

  if (task.newTask) {
    return (
      <div className="flex min-h-10 cursor-grab items-center rounded-[5px] border border-[#51635f] bg-[#51635f] text-right">
        <form onSubmit={toggleNewTask}>
          <input
            className="h-fit rounded border-none bg-transparent indent-[5px] text-[#ecede8] focus:outline-none"
            value={valueInput}
            onChange={(e) => setValueInput(e.target.value)}
            onBlur={toggleNewTask}
            autoFocus
          />
        </form>
      </div>
    );
  }

  return (
    <div
      style={style}
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      className="group relative flex min-h-10 cursor-pointer items-center justify-between rounded-[5px] border border-[#5f7470] bg-[#718783] p-[5px] indent-[5px] text-ColorGround transition-all duration-[.3s] ease-out hover:border-[#718783] hover:bg-[#5f7470]"
    >
      <p className="whitespace-pre-wrap">{task.title}</p>
      <div className="absolute right-1 top-[8px] flex rounded-[4px] border border-[#728884] bg-[#718783] opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-100">
        <button
          onClick={() => {
            handleEditTask(task);
          }}
          className="rounded border-r border-[#728884] px-[6px] py-[2px] transition-colors duration-300 ease-in-out hover:bg-[#525c5a88]"
        >
          <CiEdit />
        </button>
        <button
          onClick={() => handleDeleteTask(task.id)}
          className="rounded px-[6px] py-[2px] transition-colors duration-300 ease-in-out hover:bg-[#525c5a88]"
        >
          <BsTrash />
        </button>
      </div>
    </div>
  );
}
