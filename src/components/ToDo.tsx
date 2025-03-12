import { BsCheckAll } from "react-icons/bs";
import { Toaster } from "react-hot-toast";
import { TasksProvider } from "../context/TasksContext";
import { ToDoProvider } from "../context/ToDoContext";
import Columns from "./columns/Columns";

export default function ToDo() {
  return (
    <div className="flex min-h-screen w-full flex-col justify-between overflow-hidden bg-gradient-to-b from-mainBackgroundColor from-50% to-secondBackgroundColor">
      <div
        id="container"
        className="mx-0 mt-0 overflow-hidden sm:mx-4 sm:mt-3 md:mx-10 md:mt-5 lg:mx-24 xl:mx-36"
      >
        <div className="flex flex-col gap-1 border-b-2 border-primaryColor pb-1">
          <header className="flex items-center gap-2">
            <BsCheckAll size="50px" />
            <h1 className="text-2xl sm:text-3xl">Task List</h1>
          </header>
          <p className="indent-[60px] text-xs sm:text-sm">
            To Do List with Drag and Drop
          </p>
        </div>
        <ToDoProvider>
          <TasksProvider>
            <Columns />
          </TasksProvider>
        </ToDoProvider>
        <Toaster />
      </div>
      <footer className="bg-secondColor p-2 text-center text-ColorGround">
        Made by Mohamed Mokhtar
      </footer>
    </div>
  );
}
