'use client';

import './Bubble.css';

interface ButtonProps {
    text: string;
  }

const Button : React.FC<ButtonProps> = ({ text }) => {
  return (
    <span className='flex bubble h-[19px] justify-between items-start'>
      <span className='bubble-text'>{text}</span>
    </span>
  );
};

export default Button;
