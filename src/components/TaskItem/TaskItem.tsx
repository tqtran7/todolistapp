
import { useRouter, useSearchParams } from 'next/navigation';
import Image from "next/image";

import "./TaskItem.css";

interface TaskItemProps {
  task: TaskProps;
  onUpdated: (task: TaskProps) => void;
  onDeleted: () => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onDeleted, onUpdated }) => {
  
  const router = useRouter();
  const searchParams = useSearchParams();
  const taskId = searchParams.get('id');
  const { id, color, message, completed } = task;

  const onClick = () => {
    router.push(`/task/${id}`);
  };

  const onToggleComplete = async (event: React.FormEvent) => {
    event.preventDefault();
    event.stopPropagation();
    try {
      
      const response = await fetch(`http://localhost:4000/tasks/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ color, message, completed: !completed })
      });

      if (!response.ok) throw new Error("Failed to submit data");
      
      // update successful
      const updatedTask = { ...task, completed: !completed };
      onUpdated(updatedTask);

    } catch (error) {
      console.error("Error:", error);
    }
  };

  const onDeleteTask = async (event: React.FormEvent) => {
    event.preventDefault();
    event.stopPropagation();
    try {
      const response = await fetch(`http://localhost:4000/tasks/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) throw new Error("Failed to submit data");
      const result = await response.json();
    } catch (error) {
      console.error("Error:", error);
    } finally {
      onDeleted();
    }
  };

  return (
    <li className="flex flex-row w-full justify-between task-item" onClick={onClick}>
      {/* <p>{id} </p> */}
      {/* <ColorCircle color={color} /> */}
      <button onClick={onToggleComplete}>
        {task.completed ? (
          <div className="text-nooro-purple">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-6"
            >
              <path
                fillRule="evenodd"
                d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        ) : (
          <div className="text-nooro-blue">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="size-6"
            >
              <circle cx="12" cy="12" r="9" />
            </svg>
          </div>
        )}
      </button>
      <p className={task.completed ? "task-message-completed" : "task-message"}>
        {message}
      </p>
      <button onClick={onDeleteTask} className="text-nooro-gray" style={{ width: '24px', height: '24px' }}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
        </svg>
      </button>
    </li>
  );
};

export default TaskItem;
