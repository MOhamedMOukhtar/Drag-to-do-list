export type Id = string | number;
export type SetterIdUndefined = React.Dispatch<
  React.SetStateAction<Id | undefined>
>;

export type ColumnsType = {
  id: Id;
  title: string;
  editMode: boolean;
};
export type TasksType = {
  id: Id;
  title: string;
  columnId: Id;
  newTask: boolean;
};

/* For Context */
export interface ToDoContextType {
  columns: ColumnsType[];
  setColumns: React.Dispatch<React.SetStateAction<ColumnsType[]>>;
  isSmallScreen: boolean;
  onAddColumn: () => void;
  onDeleteColumn: (id: Id) => void;
  updateColumnTitle: (id: Id, title: string) => void;
}

export interface TasksContextTypes {
  tasks: TasksType[];
  setTasks: React.Dispatch<React.SetStateAction<TasksType[]>>;
  handelAddTasks: (id: Id) => void;
  handleDeleteTask: (id: Id) => void;
  handelNewTask: (id: Id, title: string) => void;
  handleUpdateTask: (id: Id, title: string, columnId: Id | undefined) => void;
  handelEmptyTask: () => void;
  handleTasksLocalStorage: (id: Id) => void;
}

export interface DropdownProps {
  task: TasksType;
  columns: ColumnsType[];
  setNewColumnId: SetterIdUndefined;
}

export interface ColumnProps {
  column: ColumnsType;
}

export interface TasksProps {
  tasks: TasksType[];
}
