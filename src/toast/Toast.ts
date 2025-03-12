import toast from "react-hot-toast";

const styleToast = {
  duration: 2000,
  style: {
    fontFamily: "Merienda",
    backgroundColor: "#5f747077",
  },
};

export const newTask = () => toast.success("Add New Task", styleToast);
export const deleteTask = () => toast.success("Delete Task", styleToast);
export const updateTask = () => toast.success("Update Task", styleToast);
export const newColumn = () => toast.success("Add New Column", styleToast);
export const updateColumn = () => toast.success("Update Column", styleToast);
export const deleteColumn = () => toast.success("Delete Column", styleToast);
export const changeStatus = () =>
  toast.success("The task status has been updated", styleToast);
