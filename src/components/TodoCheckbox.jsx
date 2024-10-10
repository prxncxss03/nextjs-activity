import { Checkbox } from "@/components/ui/checkbox";

const TodoCheckbox = ({ todo, index, toggleComplete }) => {
  return (
    <div className="flex items-center">
      <Checkbox
        id={`task-${index}`}
        checked={todo.isCompleted}
        onCheckedChange={() => toggleComplete(index)}
        className="cursor-pointer"
      />
      <label
        htmlFor={`task-${index}`}
        className={`text-sm px-2 peer-disabled:cursor-not-allowed peer-disabled:opacity-70 transition-all ${
          todo.isCompleted ? "line-through text-gray-400" : "text-gray-800"
        }`}
      >
        {todo.name}
      </label>
    </div>
  );
};

export default TodoCheckbox;
