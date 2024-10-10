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
  };

  const deleteTask = (indexOfDelete) => {
    const updatedTodo = todos.filter((_, index) => indexOfDelete !== index);
    setTodos(updatedTodo);
  };

  return (
    <div className="flex flex-col justify-center items-center h-full bg-gray-50 p-4">
      <h1 className="text-2xl font-semibold mb-4">Task Manager</h1>

      <div className="flex w-full max-w-lg items-center space-x-4 mb-6">
        <Input
          type="text"
          value={todo}
          placeholder="Enter your task..."
          onChange={(e) => setTodo(e.target.value)}
          className="flex-grow"
        />
        <Button onClick={addTask} className="px-4 py-2">
          Add Task
        </Button>
      </div>

      {todos.length === 0 ? (
        <p className="text-gray-500">
          No tasks available. Start by adding one!
        </p>
      ) : (
        <div className="w-full max-w-lg flex flex-col space-y-3">
          {todos.map((todo, index) => (
            <div
              key={index}
              className="flex items-center justify-between bg-white shadow p-3 rounded-md"
            >
              <div className="flex items-center space-x-3">
                <Checkbox
                  id={`checkbox-${index}`}
                  checked={todo.isCompleted}
                  onCheckedChange={() => toggleCompletionOfTask(index)}
                />
                <label
                  htmlFor={`checkbox-${index}`}
                  className={`text-base ${
                    todo.isCompleted ? "line-through text-gray-400" : ""
                  }`}
                >
                  {todo.name}
                </label>
              </div>

              <DeleteAlertDialog
                taskName={todo.name}
                onConfirm={() => deleteTask(index)}
                onCancel={() => {}}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Activity5;
