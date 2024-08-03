import React from "react";

interface TodoItemProps {
  id: number;
  title: string;
  completed: boolean;
  onToggle: (id: number) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({
  id,
  title,
  completed,
  onToggle,
}) => {
  return (
    <li className="flex items-center bg-gray-100 p-3 rounded-md">
      <input
        type="checkbox"
        checked={completed}
        onChange={() => onToggle(id)}
        className="mr-3 h-5 w-5 text-blue-500 focus:ring-blue-400"
      />
      <span
        className={`flex-grow ${
          completed ? "line-through text-gray-500" : "text-gray-800"
        }`}
      >
        {title}
      </span>
    </li>
  );
};

export default TodoItem;
