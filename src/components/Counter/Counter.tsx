'use client';

import Bubble from '../Bubble/Bubble';
import './Counter.css';

interface ButtonProps {
  label: string;  
  count: string;
  className?: string;
}

const Button : React.FC<ButtonProps> = ({ label, count, className = '' }) => {
  return (
    <p className={`flex flex-row items-center justify-center gap-2 h-[19px] ${className}`}>
      <span className='counter-text'>{label}</span> 
      <Bubble text={count} />
    </p>
  );
};

export default Button;
