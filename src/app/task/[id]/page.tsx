'use client';

import { useParams  } from 'next/navigation';
import UpsertTaskPage from "../page";

const EditTaskPage : React.FC = () => {
  const { id } = useParams();
  const taskId: string | undefined = id as string | undefined;  
  return <UpsertTaskPage taskId={taskId}/>;
};

export default EditTaskPage;
