import { createContext, useEffect, useState } from "react";
import { ColumnsType, Id, ToDoContextType } from "../type";

const ToDoContext = createContext<ToDoContextType | undefined>(undefined);

const INITIAL_COLUMN: ColumnsType[] = [
  { id: 71585, title: "To Do", editMode: false },
  { id: 86642, title: "In Progress", editMode: false },
  { id: 94946, title: "Done", editMode: false },
];

let localColumns: ColumnsType[] = [];

const tasksFromLocalStorage = localStorage.getItem("columns");

if (tasksFromLocalStorage) {
  const columns = JSON.parse(tasksFromLocalStorage);
  if (columns.length) localColumns = columns;
  else {
    localColumns = INITIAL_COLUMN;
    localStorage.removeItem("tasks");
  }
}

if (localColumns.length === 0) {
  localColumns = INITIAL_COLUMN;
}

function ToDoProvider({ children }: React.PropsWithChildren) {
  const [columns, setColumns] = useState<ColumnsType[]>(localColumns);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  localStorage.setItem("columns", JSON.stringify(columns));

  /* update column title */
  function updateColumnTitle(id: Id, title: string) {
    title = title.trim();
    const updateTitle = columns.map((col) => {
      if (col.id !== id) return col;
      if (title) return { ...col, title, editMode: !col.editMode };
      else return { ...col, title: col.title, editMode: !col.editMode };
    });

    setColumns(updateTitle);
  }

  /* add new column */
  function handelAddColumn() {
    const COLUMN = {
      id: Number(Date.now().toString().slice(-5)),
      title: "New Column",
      editMode: false,
    };

    setColumns([...columns, COLUMN]);
  }

  /* delete column */
  function handelDeleteColumn(id: Id): void {
    const updateColumn = columns.filter((col) => col.id !== id);
    setColumns(updateColumn);
  }

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 640);
    };

    // Check screen size on mount and on resize
    handleResize();
    window.addEventListener("resize", handleResize);

    // Cleanup event listener
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <ToDoContext.Provider
      value={{
        columns,
        setColumns,
        isSmallScreen,
        onAddColumn: handelAddColumn,
        onDeleteColumn: handelDeleteColumn,
        updateColumnTitle: updateColumnTitle,
      }}
    >
      {children}
    </ToDoContext.Provider>
  );
}

export { ToDoContext, ToDoProvider };
