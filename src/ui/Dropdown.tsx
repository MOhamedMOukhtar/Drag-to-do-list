import { useEffect, useState } from "react";
import { DropdownProps } from "../type";

export function Dropdown({ columns, setNewColumnId, task }: DropdownProps) {
  const [dropdown, setDropdown] = useState<boolean>(false);
  const [changeState, setChangeState] = useState<string | undefined>(undefined);

  window.addEventListener("click", (e) => {
    const target = e.target as HTMLElement | null;

    if (target?.id !== "dropdown") {
      setDropdown(false);
    }
  });

  useEffect(() => {
    const columnTitle = columns.find((col) => col.id === task.columnId)?.title;
    setChangeState(columnTitle);
  }, [columns, task]);

  return (
    <div className="relative flex flex-col gap-1 xs:flex-row xs:gap-0">
      <h3 className="mr-1">Change State</h3>
      <div className="relative">
        <button
          id="dropdown"
          onClick={() => setDropdown((prev) => !prev)}
          className={`relative min-w-[120px] rounded-[4px] ${dropdown ? "bg-[#3e4e4b]" : "bg-primaryColor"} py-[2px] pl-2 pr-8 text-ColorGround transition duration-300 hover:bg-[#3e4e4b]`}
        >
          {changeState}
        </button>
        {dropdown && (
          <section className="custom--dropdown absolute left-0 z-10 text-nowrap rounded-b-[4px] bg-[#2d3a373f] text-ColorGround">
            {columns.map((col) => (
              <p
                key={col.id}
                onClick={() => {
                  setNewColumnId(col.id);
                  setDropdown(false);
                  setChangeState(col.title);
                }}
              >
                {col.title}
              </p>
            ))}
          </section>
        )}
      </div>
    </div>
  );
}
