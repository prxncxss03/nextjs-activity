"use client";

import React, { useEffect, useState } from "react";
import {
  getAllTasks,
  getAllCompletedTasks,
  createTask,
  deleteTask,
  updateNameOfTask,
  updateTaskCompletion,
} from "./action";

import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { CaretSortIcon } from "@radix-ui/react-icons";

import TodoCheckbox from "@/components/TodoCheckbox";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

import DeleteAlertDialog from "@/components/DeleteAlertDialog";
import { toggleComplete } from "@/utils/todo";

const Activity8 = () => {
  const { toast } = useToast();

  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [editingTaskId, setEditingTaskId] = useState(null);

  useEffect(() => {
    fetchTasks();
    fetchCompletedTasks();
  }, []);

  const fetchTasks = async () => {
    const data = await getAllTasks();
    setTasks(data);
  };

  const fetchCompletedTasks = async () => {
    const data = await getAllCompletedTasks();
    setCompletedTasks(data);
  };

  const createTodoTask = async (name) => {
    if (!name) return;
    const newTask = await createTask(name);
    setTasks([...newTask, ...tasks]);
    setTask("");
    toast({
      description: "Task created successfully",
    });
  };

  const updateTaskName = async (id, name) => {
    const updatedTask = await updateNameOfTask(id, name);
    const updatedTasks = tasks.map((task) =>
      task.id === id ? updatedTask[0] : task
    );
    setTasks(updatedTasks);
    setEditingTaskId(null);
    toast({
      description: "Task updated successfully",
    });
  };

  const deleteTodoTask = async (id, isCompleted) => {
    const isDeleted = await deleteTask(id);
    if (isDeleted && !isCompleted) {
      setTasks(tasks.filter((task) => task.id !== id));
    } else if (isDeleted && isCompleted) {
      setCompletedTasks(completedTasks.filter((task) => task.id !== id));
    }
    toast({
      description: "Task deleted successfully",
    });
  };

  const toggleCompletionOfTask = async (indexOfCheckbox, isFromCompleted) => {
    if (isFromCompleted) {
      const updatedCompletedTasks = toggleComplete(
        completedTasks,
        indexOfCheckbox
      );
      await updateTaskCompletion(
        completedTasks[indexOfCheckbox].id,
        updatedCompletedTasks[indexOfCheckbox].isCompleted
      );
      setCompletedTasks(
        completedTasks.filter((_, index) => index !== indexOfCheckbox)
      );
      setTasks([...tasks, updatedCompletedTasks[indexOfCheckbox]]);
    } else {
      const updatedTasks = toggleComplete(tasks, indexOfCheckbox);
      await updateTaskCompletion(
        tasks[indexOfCheckbox].id,
        updatedTasks[indexOfCheckbox].isCompleted
      );
      setTasks(tasks.filter((_, index) => index !== indexOfCheckbox));
      setCompletedTasks([...completedTasks, updatedTasks[indexOfCheckbox]]);
    }
  };

  return (
    <div className="h-full bg-gray-50 p-6 flex flex-col items-center">
      <h1 className="text-3xl font-semibold mb-6">Task Manager v2</h1>

      {/* Task Input Section */}
      <div className="flex flex-col md:flex-row items-center w-full max-w-lg space-y-3 md:space-y-0 md:space-x-4 mb-6">
        <Input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Enter your task..."
          className="w-full"
        />
        <Button onClick={() => createTodoTask(task)} className="md:w-auto">
          Add Task
        </Button>
      </div>

      {/* Tasks Section */}
      <div className="w-full max-w-lg">
        <h2 className="text-xl font-semibold mb-3">Tasks</h2>
        <div className="space-y-3">
          {tasks.length > 0 ? (
            tasks.map((task, index) => (
              <div
                key={index}
                className="flex items-center justify-between bg-white p-3 rounded-md shadow-md"
              >
                {editingTaskId !== task.id ? (
                  <TodoCheckbox
                    todo={{
                      name: task.name,
                      isCompleted: task.isCompleted,
                    }}
                    index={index}
                    toggleComplete={() => toggleCompletionOfTask(index, false)}
                  />
                ) : null}

                {/* Input field for editing task name */}
                {editingTaskId === task.id ? (
                  <div className="flex space-x-2 w-full">
                    <Input
                      type="text"
                      value={task.name}
                      onChange={(e) => {
                        const updatedTasks = [...tasks];
                        updatedTasks[index].name = e.target.value;
                        setTasks(updatedTasks);
                      }}
                    />
                    <Button onClick={() => updateTaskName(task.id, task.name)}>
                      Save
                    </Button>
                    <Button
                      variant="secondary"
                      onClick={() => setEditingTaskId(null)}
                    >
                      Cancel
                    </Button>
                  </div>
                ) : null}

                {!editingTaskId && (
                  <div className="flex space-x-2">
                    <Button
                      variant="ghost"
                      className="text-orange-500"
                      onClick={() => setEditingTaskId(task.id)}
                    >
                      Update
                    </Button>
                    <DeleteAlertDialog
                      taskName={task.name}
                      onConfirm={() => deleteTodoTask(task.id, false)}
                    />
                  </div>
                )}
              </div>
            ))
          ) : (
            <p className="text-gray-500">
              No tasks available. Start by adding one!
            </p>
          )}
        </div>

        {/* Completed Tasks Section */}
        <Separator className="my-6" />
        <Collapsible>
          <CollapsibleTrigger className="text-xl flex font-semibold items-center w-full justify-between">
            Completed Tasks
            <CaretSortIcon className="h-6 w-6" />
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-3 mt-4">
            {completedTasks.length > 0 ? (
              completedTasks.map((task, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between bg-gray-100 p-3 rounded-md shadow-md"
                >
                  <TodoCheckbox
                    todo={{
                      name: task.name,
                      isCompleted: task.isCompleted,
                    }}
                    index={index}
                    toggleComplete={() => toggleCompletionOfTask(index, true)}
                  />
                  <DeleteAlertDialog
                    taskName={task.name}
                    onConfirm={() => deleteTodoTask(task.id, true)}
                  />
                </div>
              ))
            ) : (
              <p className="text-gray-500">No completed tasks</p>
            )}
          </CollapsibleContent>
        </Collapsible>
      </div>
    </div>
  );
};

export default Activity8;
