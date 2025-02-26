'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import TaskItem from '@/components/TaskItem/TaskItem';
import Button from '@/components/Button/Button';
import Heading from '@/components/Heading/Heading';
import Counter from '@/components/Counter/Counter';
import { deleteTask, fetchTasks } from '@/apis/task';
import Modal from '@/components/Modal/Modal';
import Link from 'next/link';
import { TaskProps } from '@/interfaces/Task';

export default function Home() {
  const [tasks, setTasks] = useState<TaskProps[]>([]);
  const [completed, setCompleted] = useState<number>(0);

  // TODO: use a loader so user has a better experience
  // const [loading, setLoading] = useState<boolean>(true);
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [selectedTask, setSelectedTask] = useState<TaskProps>();

  // fetch all tasks on mount
  useEffect(() => {
    const fetchData = async () => {
      const results = await fetchTasks();
      console.log(results);
      setTasks(results); 
      // finally { setLoading(false); }
    };

    fetchData();
  }, []);

  // update completed counter whenever tasks changes
  useEffect(() => {
    const completedTasks = tasks.filter(task => task.completed);
    setCompleted(completedTasks.length);
  }, [tasks]);

  // update the tasks once it has been updated
  const onTaskUpdated = (updatedTask: TaskProps) => {
    setTasks(prevTasks => 
      prevTasks.map(task =>
        task.id === updatedTask.id ? { ...task, ...updatedTask } : task
      )
    );
  };

  // save the user selected task
  const onTaskSelected = (task: TaskProps) => {
    setModalIsOpen(true);
    setSelectedTask(task);
  };

  // delete the task user confirmed
  const onTaskDeleted = async () => {
    setModalIsOpen(false);
    if (selectedTask) {
      const response = await deleteTask(selectedTask.id);
      if (response) {
        setTasks((prevTasks) => prevTasks.filter((task) => task.id !== selectedTask.id));
      }
    }
  };

  const completedCount = completed === 0 ? '0' : `${completed.toString()} of ${tasks.length}`;

  return (
    <div className='w-full'>
      <Heading />
      
      <div className='flex flex-col items-center justify-center'>
        <div className='w-[736px]' style={{ transform: 'translateY(-26px)' }}>
          <Link href='/task'>
            <Button
              text='Create Task'
              icon={'/images/circle-plus.svg'}
              onClick={() => ''}
            />
          </Link>
          <div className='flex flex-row justify-between w-full mt-[66px]'>
            <Counter label={'Tasks'} count={tasks.length.toString()} className='text-nooro-blue'/>
            <Counter label={'Completed'} count={completedCount} className='text-nooro-purple'/>
          </div>
          {tasks.length === 0 ? (
            <div className='flex flex-col items-center justify-center'>
              <hr className='w-full border-t border-gray-600 my-4 mb-[62px]' />
              <Image src={'/images/Clipboard.png'} alt='clipboard' width={56} height={56}/>
              <span className='text-[#808080]'>
                <p className='font-bold mt-[16px]'>You don&apos;t have any tasks registered yet.</p>
                <p className='font-light mt-[22px]'>Create tasks and organize your to-do items.</p>
              </span>
            </div>
          ) : (
            <ul className='w-full mt-[24px]'>
              {tasks.map((task) => (
                <TaskItem key={task.id} task={task} onDeleted={onTaskSelected} onUpdated={onTaskUpdated} />
              ))}
            </ul>
          )}
        </div>
      </div>
      
      <Modal isOpen={modalIsOpen}>
          <p>Are you sure you want to delete this task?</p>
          <div className='flex flex-row gap-6 mt-6'>
            <Button
              text='Cancel'
              color='#626262'
              onClick={() => setModalIsOpen(false)}
            />
            <Button
              text='Confirm'
              color='#1E6F9F'
              onClick={onTaskDeleted}
            />
          </div>
      </Modal>
    </div>
  );
}
