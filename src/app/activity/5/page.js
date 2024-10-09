"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import DeleteAlertDialog from "@/components/DeleteAlertDialog";
import { toggleComplete } from "@/utils/todo";

import React, { useState } from "react";

const Activity5 = () => {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);

  const addTask = () => {
    if (!todo) return;
    setTodos([
      ...todos,
      {
        name: todo,
        isCompleted: false,
      },
    ]);
    setTodo("");
  };

  const toggleCompletionOfTask = (indexOfCheckbox) => {
    const updatedTodos = toggleComplete(todos, indexOfCheckbox);
    setTodos(updatedTodos);
  }

  const deleteTask = (indexOfDelete) => {
    const updatedTodo = todos.filter((_, index) => indexOfDelete !== index);
    setTodos(updatedTodo);
  };

  return (
    <div className="flex flex-col justify-center items-center h-full ">
      <h1>Add your Task</h1>
      <Input
        type="text"
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
      />
      <Button onClick={addTask}>Add Task</Button>

      <div className="flex flex-col">
        {todos.map((todo, index) => {
          return (
            <div key={index}>
              <Checkbox
                id={index}
                checked={todo.isCompleted}
                onCheckedChange={() => toggleCompletionOfTask(index)
                }
              />
              <label
                htmlFor="tasks"
                className={`text-sm px-2 peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${
                  todo.isCompleted ? "line-through" : ""
                }`}
              >
                {todo.text}
              </label>
              <DeleteAlertDialog
                taskName={todo.text}
                onConfirm={() => deleteTask(index)}
                onCancel={() => {}}
              />
            </div>
          );
        })}
      </div>

      
    </div>
  );
};
export default Activity5;
