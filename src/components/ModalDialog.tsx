'use client';

import { ReactNode, SetStateAction, useState } from "react";
import EditTaskPage from '../app/task/[id]/page';

interface ModalProps {
    isOpen: boolean;
    children: ReactNode;
}

const ModalDialog : React.FC<ModalProps> = ({ isOpen, children }) => {

  if (!isOpen) return null;

  return (
    <div className="inset-0 flex items-center justify-center bg-black bg-opacity-50">
      {children}
    </div>
  );
};

export default ModalDialog;
