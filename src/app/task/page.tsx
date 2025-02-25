"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ColorCircle from "../../components/ColorCircle";
import Button from "@/components/Button/Button";
import Heading from "@/components/Heading/Heading";
import Image from "next/image";

import "./task.css";

const colors = [
  "#FF3830",
  "#FF9500",
  "#FFCC00",
  "#34C759",
  "#007AFF",
  "#5856D6",
  "#AF52DE",
  "#FF2D55",
  "#A2845E",
];

interface TaskPageProps {
  taskId?: string;
}

const UpsertTaskPage: React.FC<TaskPageProps> = ({ taskId }) => {

  const router = useRouter();
  const [taskColor, setTaskColor] = useState<string>(colors[0]);
  const [taskMessage, setTaskMessage] = useState<string>("");

  useEffect(() => {
    if (taskId) {
      const fetchData = async () => {
        try {
          const response = await fetch(`http://localhost:4000/tasks/${taskId}`);
          if (!response.ok) throw new Error("Failed to fetch data");
          const task: TaskProps = await response.json();
          console.log(task);
          setTaskColor(task.color);
          setTaskMessage(task.message);
        } catch (error) {
          console.log(error);
        }
      };
      fetchData();
    }
  }, [taskId]);

  // Correcting the parameter type to string
  const onColorSelected = (color: string) => {
    setTaskColor(color);
    console.log(color);
  };

  const updateTask = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await fetch(`http://localhost:4000/tasks/${taskId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: taskId,
          color: taskColor,
          message: taskMessage,
        }),
      });

      if (!response.ok) throw new Error("Failed to submit data");
      const result = await response.json();
      router.push("/");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const addTask = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:4000/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          color: taskColor,
          message: taskMessage,
        }),
      });

      if (!response.ok) throw new Error("Failed to submit data");
      const result = await response.json();
      router.push("/");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="w-full">
      <Heading />
      <div className="flex flex-col items-center justify-center">
        <div className="w-[736px] mt-[91px]">
          <a href="/">
            <Image
              className="dark:invert"
              src={"/images/arrow-long-left.svg"}
              alt="Back"
              width={24}
              height={24}
            />
          </a>
          <div className="mt-[53px]"></div>
          <div className="flex flex-col">
            <label>Title</label>
            <input
              type="text"
              className="task-input"
              value={taskMessage}
              onChange={(e) => setTaskMessage(e.target.value)}
              placeholder="Ex. Brush your teeth"
            />
          </div>
          <div>
            <div className="pt-[24px]"></div>
            <label>Color</label>
            <ul className="flex flex-row">
              {colors.map((color, index) => (
                <button key={index} onClick={() => onColorSelected(color)}>
                  <ColorCircle color={color} />
                </button>
              ))}
            </ul>
          </div>
          {taskId ? (
            <Button
              text="Save"
              icon={"/images/check.svg"}
              onClick={updateTask}
            />
          ) : (
            <Button
              text="Add Task"
              icon={"/images/plus-circle.svg"}
              onClick={addTask}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default UpsertTaskPage;
