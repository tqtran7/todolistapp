"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ColorCircle from "../../components/ColorCircle/ColorCircle";
import Button from "@/components/Button/Button";
import Heading from "@/components/Heading/Heading";
import Image from "next/image";

import "./task.css";
import { addTask, fetchTask, updateTask } from "@/apis/task";

// TODO: colors should probably come from a database
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

// TODO: move to validators folder for reuse
// helper method to check title length
const isValidLength = (message: string, length: number) => message.replace(/\s/g, '').length >= length;

interface TaskPageProps {
  taskId?: string;
}

const UpsertTaskPage: React.FC<TaskPageProps> = ({ taskId }) => {

  const router = useRouter();
  const [taskColor, setTaskColor] = useState<string>(colors[0]);
  const [taskMessage, setTaskMessage] = useState<string>('');

  const isTitleValid = isValidLength(taskMessage, 3);

  // refetch the task
  // this ensures we edit the latest modified data
  useEffect(() => {
    if (taskId) {
      const fetchData = async () => {
        const task = await fetchTask(taskId);
        if (task) {
          setTaskColor(task.color);
          setTaskMessage(task.message);
        }
      };
      fetchData();
    }
  }, [taskId]);

  // confirm update is successful, then redirect
  const update = async (event: React.FormEvent) => {
    event.preventDefault();
    if (taskId) {
      const result = await updateTask(taskId, {
        id: taskId,
        color: taskColor,
        message: taskMessage,
      });
      if (result) {
        router.push("/");
      }
    }
  };

  // confirm add is successful, then redirect
  const add = async (event: React.FormEvent) => {
    event.preventDefault();
    const result = await addTask({
      color: taskColor,
      message: taskMessage,
    });
    if (result) {
      router.push("/");
    }
  };

  return (
    <div className="w-full">
      <Heading />
      <div className="flex flex-col items-center justify-center">
        <div className="w-[736px] mt-[91px]">
          <a href="/">
            <Image
              src={"/images/arrow-long-left.svg"}
              alt="Back"
              width={24}
              height={24}
            />
          </a>
          <div className="mt-[53px]"></div>
          <div className="flex flex-col">
            <label className="task-label text-nooro-blue">Title</label>
            <input
              type="text"
              className="placeholder-gray-500 task-input"
              value={taskMessage}
              onChange={(e) => setTaskMessage(e.target.value)}
              placeholder="Ex. Brush your teeth"
            />
          </div>
          <div>
            <div className="pt-[24px]"></div>
            <label className="task-label text-nooro-blue">Color</label>
            <ul className="flex flex-row gap-[16px] mt-[12px] mb-[48px]">
              {colors.map((color, index) => (
                <button key={index} onClick={() => setTaskColor(color)}>
                  <ColorCircle color={color} selected={taskColor === color} />
                </button>
              ))}
            </ul>
          </div>
          {taskId ? 
            <Button text="Save" icon={"/images/check.svg"} onClick={update} disabled={!isTitleValid} /> : 
            <Button text="Add Task" icon={"/images/circle-plus.svg"} onClick={add} disabled={!isTitleValid} />
          }
        </div>
      </div>
    </div>
  );
};

export default UpsertTaskPage;
