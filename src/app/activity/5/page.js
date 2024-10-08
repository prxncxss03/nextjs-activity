"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

import React, { useState } from "react";

const Activity5 = () => {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);

  const addTask = () => {
    setTodos([
      ...todos,
      {
        text: todo,
        isCompleted: false,
      },
    ]);
    setTodo("");
  };

  const toggleComplete = (indexOf) => {
    const updatedTodo = todos.map((todo, ))
  }

  return (
    <div className="flex flex-col justify-center items-center h-full bg-gray-100">
      <h1>Add your Task</h1>
      <div className="flex flex-col">
        {todos.map((todo, index) => {
          return (
            <div key={index}>
              <Checkbox id={index} />
              <label
                htmlFor="terms"
                checked = {todo.isCompleted}
                onCheckedChange = {()=> toggleComplete(index)}
                className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${
                    todo.isCompleted ? "line-through" : ""
                }`}
              >
                {todo.text}
              </label>
            </div>
          );
        })}
      </div>
      <Input
        type="text"
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
      />
      <Button onClick={addTask}>Add Task</Button>
    </div>
  );
};
export default Activity5;
