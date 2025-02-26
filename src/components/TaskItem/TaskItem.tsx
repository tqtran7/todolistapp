
import { useRouter } from 'next/navigation';
import { updateTask } from '@/apis/task';

import "./TaskItem.css";
import Image from 'next/image';

interface TaskItemProps {
  task: TaskProps;
  onUpdated: (task: TaskProps) => void;
  onDeleted: (task: TaskProps) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onDeleted, onUpdated }) => {
  
  const router = useRouter();
  const { id, color, message, completed } = task;

  const onClick = () => {
    router.push(`/task/${id}`);
  };

  const onToggleComplete = async (event: React.FormEvent) => {
    event.preventDefault();
    event.stopPropagation();
    const response = await updateTask(id, { color, message, completed: !completed });
    if (response) {
      onUpdated({ ...task, completed: !completed });
    } 
  };

  const onDeleteTask = async (event: React.FormEvent) => {
    event.preventDefault();
    event.stopPropagation();
    onDeleted({ ...task });
  };

  return (
    <li className="flex flex-row w-full justify-between items-start task-item" onClick={onClick}>
      {/* <p>{id} </p> */}
      {/* <ColorCircle color={color} /> */}
      <button className='flex items-center justify-center' onClick={onToggleComplete}>
        {task.completed ?
          <Image src={'/images/circle-check.svg'} alt='' width={24} height={24}/> :
          <Image src={'/images/circle-empty.svg'} alt='' width={24} height={24}/>
        }
      </button>
      <p className={task.completed ? "task-message-completed" : "task-message"}>
        {message}
      </p>
      <button onClick={onDeleteTask} className="text-nooro-gray" style={{ width: '24px', height: '24px' }}>
        <Image src={'/images/trash.svg'} alt='' width={24} height={24}/>
      </button>
    </li>
  );
};

export default TaskItem;
