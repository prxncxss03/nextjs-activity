import { Checkbox } from "@/components/ui/checkbox";

const TodoCheckbox = ({ todo, index, toggleComplete }) => {
  return (
    <div className="flex items-center">
      <Checkbox
        id={`task-${index}`}
        checked={todo.isCompleted}
        onCheckedChange={() => toggleComplete(index)}
      />
      <label
        htmlFor={`task-${index}`}
        className={`text-sm px-2 peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${
          todo.isCompleted ? 'line-through' : ''
        }`}
      >
        {todo.name}
      </label>
    </div>
  );
};

export default TodoCheckbox;
