import { useContext } from "react";
import Swal from "sweetalert2";
import { Id, TasksContextTypes, ToDoContextType } from "../type";
import { TasksContext } from "../context/TasksContext";
import { ToDoContext } from "../context/ToDoContext";
import { deleteColumn } from "../toast/Toast";

/* Ask if the Column wants to Delete has Tasks */
export function useSwalConfirm() {
  const { tasks, handleTasksLocalStorage } = useContext(
    TasksContext,
  ) as TasksContextTypes;
  const { onDeleteColumn } = useContext(ToDoContext) as ToDoContextType;

  function askForDelete(id: Id) {
    const check = tasks.some((task) => task.columnId === id);

    if (check) {
      Swal.fire({
        title: "Are you sure?",
        text: "This column is not empty!",
        icon: "question",
        showCloseButton: true,
        showCancelButton: true,
        color: "#E0E2DB",
        background: "#5f7470cc",
        confirmButtonText: "Yes, delete it!",
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
          icon: "swal-icon",
          title: "swal-title",
          htmlContainer: "swal-text",
          actions: "swal-actions",
        },
      }).then((result) => {
        if (result.isConfirmed) {
          handleTasksLocalStorage(id);
          onDeleteColumn(id);
          deleteColumn();
        }
      });
    } else {
      onDeleteColumn(id);
      deleteColumn();
    }
  }

  return { askForDelete };
}
