"use client";
import {
  getAllTasks,
  getAllCompletedTasks,
  createTask,
  deleteTask,
  updateNameOfTask,
  updateTaskCompletion,
} from "./action";
import { verify } from "../3/action";
import React, { useEffect, useState } from "react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import TodoCheckbox from "@/components/TodoCheckbox";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

import DeleteAlertDialog from "@/components/DeleteAlertDialog";

import { toggleComplete } from "@/utils/todo";

const Activity8 = () => {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [editingTaskId, setEditingTaskId] = useState(null);

  useEffect(() => {
    verify();
  }, []);

  useEffect(() => {
    console.log("useEffect inside");
    const fetchTasks = async () => {
      console.log("fetchTasks");
      const data = await getAllTasks();
      console.log("data", data);
      setTasks(data);
    };
    fetchTasks();
  }, []);

  useEffect(() => {
    const fetchCompletedTasks = async () => {
      const data = await getAllCompletedTasks();
      setCompletedTasks(data);
    };
    fetchCompletedTasks();
  }, []);

  const createTodoTask = async (name) => {
    const newTask = await createTask(name);
    setTasks([...newTask, ...tasks]);
  };

  const updateTaskName = async (id, name) => {
    const updatedTask = await updateNameOfTask(id, name);
    const updatedTasks = tasks.map((task) => {
      if (task.id === id) {
        return updatedTask[0];
      }
      return task;
    });
    setTasks(updatedTasks);
    setEditingTaskId(null);
  };

  const deleteTodoTask = async (id) => {
    const isDeleted = await deleteTask(id);
    if (isDeleted) {
      const updatedTasks = tasks.filter((task) => task.id !== id);
      setTasks(updatedTasks);
    }
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
      // remove the item from completed tasks and add it to tasks
      const temporaryCompletedTasks = [...completedTasks];
      temporaryCompletedTasks.pop(indexOfCheckbox);
      setCompletedTasks(temporaryCompletedTasks);
      setTasks([...tasks, updatedCompletedTasks[indexOfCheckbox]]);
      return;
    } else {
      const updatedTasks = toggleComplete(tasks, indexOfCheckbox);
      await updateTaskCompletion(
        tasks[indexOfCheckbox].id,
        updatedTasks[indexOfCheckbox].isCompleted
      );
      const temporaryTasks = [...tasks];
      temporaryTasks.pop(indexOfCheckbox);
      setTasks(temporaryTasks);
      setCompletedTasks([...completedTasks, updatedTasks[indexOfCheckbox]]);
    }
  };

  return (
    <div>
      <h1>Activity 8</h1>

      <div className="flex flex-wrap justify-center items-center w-full">
        <h1>Add your Task</h1>
        <Input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <Button onClick={() => createTodoTask(task)}>Add Task</Button>

        <h1>Tasks</h1>
        <div>
          {tasks && tasks.map((task, index) => (
            <div key={index} className="flex items-center">
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
                <div>
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
                  <Button onClick={() => setEditingTaskId(null)}>Cancel</Button>
                </div>
              ) : null}

              {!editingTaskId && (
                <Button onClick={() => setEditingTaskId(task.id)}>
                  Update
                </Button>
              )}

              <DeleteAlertDialog
                taskName={task.name}
                onCancel={() => {}}
                onConfirm={() => deleteTodoTask(task.id)}
              />
            </div>
          ))}
          <Separator />
          <Collapsible>
            <CollapsibleTrigger>Completed Tasks</CollapsibleTrigger>
            <CollapsibleContent>
              {completedTasks.map((task, index) => (
                <div key={index} className="flex items-center">
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
                    onCancel={() => {}}
                    onConfirm={() => deleteTodoTask(task.id)}
                  />
                </div>
              ))}
            </CollapsibleContent>
          </Collapsible>
        </div>
      </div>
    </div>
  );
};

export default Activity8;
