import { SetStateAction, useContext, useRef, useState } from "react";
import withReactContent from "sweetalert2-react-content";
import { BsTrash } from "react-icons/bs";
import Swal from "sweetalert2";
import { Id, TasksContextTypes, TasksType, ToDoContextType } from "../type";
import { TasksContext } from "../context/TasksContext";
import { ToDoContext } from "../context/ToDoContext";
import { Dropdown } from "../ui/Dropdown";

const MySwal = withReactContent(Swal);

export function useSweetEdit() {
  const { columns } = useContext(ToDoContext) as ToDoContextType;
  const { handleUpdateTask, handleDeleteTask } = useContext(
    TasksContext,
  ) as TasksContextTypes;
  const [newColumnId, setNewColumnId] = useState<Id | undefined>(undefined);
  const newColumnIdRef = useRef<Id | undefined>(undefined); // Ref to track newColumnId

  const handleEditTask = async (task: TasksType) => {
    // Update the ref whenever newColumnId changes
    newColumnIdRef.current = newColumnId;

    const { value: text } = await MySwal.fire({
      title: (
        <div className="flex flex-col items-start justify-between gap-3 pr-5 text-start">
          <div className="flex items-center text-xs xs:text-base">
            <Dropdown
              columns={columns}
              task={task}
              setNewColumnId={(id: SetStateAction<Id | undefined>) => {
                // Handle both value and functional updater
                setNewColumnId(id);
                if (typeof id === "function") {
                  // If it's a functional updater, compute the new value
                  newColumnIdRef.current = id(newColumnIdRef.current);
                } else {
                  // If it's a value, use it directly
                  newColumnIdRef.current = id;
                }
              }}
            />
          </div>
        </div>
      ),
      footer: (
        <button
          onClick={() => {
            handleDeleteTask(task.id);
            Swal.close();
          }}
          className="absolute bottom-4 right-3 opacity-50 transition duration-300 hover:opacity-100"
        >
          <BsTrash size={25} />
        </button>
      ),
      input: "textarea",
      inputPlaceholder: "Type your task here...",
      inputValue: task.title,
      showCancelButton: true,
      showCloseButton: true,
      color: "#E0E2DB",
      background: "#5f7470cc",
      confirmButtonText: "Update",
      inputAttributes: {
        "aria-label": "Type your task here",
      },
      showClass: {
        popup: `
          animate__animated
          animate__fadeInDown
          animate__faster`,
      },
      hideClass: {
        popup: `
          animate__animated
          animate__fadeOutUp 
          animate__faster`,
      },
      customClass: {
        cancelButton: "cancel-button",
        confirmButton: "confirm-button",
        closeButton: "close-button",
        input: "custom-textarea",
        footer: "swal-footer",
      },
    });

    if (text) {
      // Use the ref value instead of the state value
      handleUpdateTask(task.id, text, newColumnIdRef.current);
    }

    // Reset newColumnId after the task is updated
    setNewColumnId(undefined);
    newColumnIdRef.current = undefined;
  };

  return { handleEditTask };
}
