"use client";

import React, { useEffect, useState } from "react";
import TaskItem from "@/components/TaskItem/TaskItem";
import Button from "@/components/Button/Button";
import Heading from "@/components/Heading/Heading";

export default function Home() {
  const [tasks, setTasks] = useState<TaskProps[]>([]);
  const [completed, setCompleted] = useState<Number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:4000/tasks");
      if (!response.ok) throw new Error("Failed to fetch data");
      const result: TaskProps[] = await response.json();
      setTasks(result);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const completedTasks = tasks.filter(task => task.completed);
    setCompleted(completedTasks.length);
  }, [tasks]);

  const onTaskUpdated = (updatedTask: TaskProps) => {
    setTasks(prevTasks => 
      prevTasks.map(task =>
        task.id === updatedTask.id ? { ...task, ...updatedTask } : task
      )
    );
  };

  const onTaskDeleted = () => {
    fetchData();
  };

  return (
    <div className="w-full">
      <Heading />
      <div className="flex flex-col items-center justify-center">
        <div className="w-[736px]" style={{ transform: "translateY(-26px)" }}>
          <a href="/task">
            <Button
              text="Create Task"
              icon={"/images/plus-circle.svg"}
              onClick={() => ''}
            />
          </a>
          <div className="flex flex-row justify-between w-full mt-[66px]">
            <p className="text-nooro-blue">Tasks {tasks.length}</p>
            <p className="text-nooro-purple">
              Completed {completed.toString()} of {tasks.length}
            </p>
          </div>
          {tasks.length === 0 ? (
            <div>
              <hr className="w-full border-t border-gray-600 my-4" />
              <pre className="text-[#808080]">
                You don't have any tasks registered yet. Create tasks and
                organize your to-do items.
              </pre>
            </div>
          ) : (
            <ul className="w-full mt-[24px]">
              {tasks.map((task) => (
                <TaskItem key={task.id} task={task} onDeleted={onTaskDeleted} onUpdated={onTaskUpdated} />
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
