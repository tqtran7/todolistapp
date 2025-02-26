'use client';

import { useParams  } from 'next/navigation';
import TaskPage from "@/components/TaskEditor/TaskEditor";

const EditTaskPage : React.FC = () => {
  const { id } = useParams();
  const taskId: string | undefined = id as string | undefined;  
  return <TaskPage taskId={taskId}/>;
};

export default EditTaskPage;
