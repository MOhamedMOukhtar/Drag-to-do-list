import { createContext, useState } from "react";
import { Id, TasksContextTypes, TasksType } from "../type";

import { changeStatus, deleteTask, updateTask } from "../toast/Toast";

let initialTasks: TasksType[] = [];

const tasksFromLocalStorage = localStorage.getItem("tasks");

if (tasksFromLocalStorage) {
  const localTasks = JSON.parse(tasksFromLocalStorage);

  initialTasks = localTasks.map((task: TasksType) => ({
    ...task,
    newTask: false,
  }));
}

const TasksContext = createContext<TasksContextTypes | undefined>(undefined);

function TasksProvider({ children }: React.PropsWithChildren) {
  const [tasks, setTasks] = useState<TasksType[]>(initialTasks);

  /* Save Tasks on LocalStorage */
  localStorage.setItem("tasks", JSON.stringify(tasks));

  /* Delete Tasks if it's Column delete */
  function handleTasksLocalStorage(id: Id) {
    setTasks(() => tasks.filter((task) => task.columnId !== id));
  }

  /* Check if there Empty Task's Title */
  function handelEmptyTask() {
    setTasks((tasks) => tasks.filter((task) => task.title !== ""));
  }

  /* Add New Task */
  function handelAddTasks(id: Id) {
    const TASK: TasksType = {
      id: Date.now().toString().slice(-5),
      title: `New Task`,
      columnId: id,
      newTask: true,
    };
    setTasks([...tasks, TASK]);
  }

  /* Handel Delete Task */
  function handleDeleteTask(id: Id): void {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
    deleteTask();
  }

  /* Update New Task Title */
  function handelNewTask(id: Id, title: string) {
    title = title.trim();

    const newTasks = tasks.map((task) => {
      if (task.id !== id) return task;
      return { ...task, title, newTask: !task.newTask };
    });
    setTasks(newTasks);
    handelEmptyTask();
  }

  /* Update Task Title and status */
  function handleUpdateTask(id: Id, title: string, columnId: Id | undefined) {
    title = title.trim();
    const newTasks = tasks.map((task) => {
      if (task.id !== id) return task;
      return {
        ...task,
        title,
      };
    });

    setTasks(newTasks);
    handelEmptyTask();

    tasks.map((task) => {
      if (task.id === id) {
        if (task.title !== title) updateTask();
      }
    });

    if (columnId) {
      const targetTask = tasks.find((task) => task.id === id);
      if (targetTask?.columnId === columnId) return;
      changeStatus();
      setTasks((prevTasks) => {
        const updatedTask = prevTasks.find((task) => task.id === id);
        if (!updatedTask) return prevTasks;

        const filteredTasks = prevTasks.filter((task) => task.id !== id);

        return [...filteredTasks, { ...updatedTask, columnId: columnId }];
      });
    }
  }

  return (
    <TasksContext.Provider
      value={{
        tasks,
        setTasks,
        handelAddTasks,
        handleDeleteTask,
        handelNewTask,
        handelEmptyTask,
        handleUpdateTask,
        handleTasksLocalStorage,
      }}
    >
      {children}
    </TasksContext.Provider>
  );
}

export { TasksContext, TasksProvider };
