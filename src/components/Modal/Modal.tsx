'use client';

import { ReactNode } from "react";

interface ModalProps {
    isOpen: boolean;
    children: ReactNode;
}

const ModalDialog : React.FC<ModalProps> = ({ isOpen, children }) => {

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-[#303030] p-6 rounded-lg shadow-lg w-full max-w-md">
      {children}
    </div>
    </div>
  );
};

export default ModalDialog;
