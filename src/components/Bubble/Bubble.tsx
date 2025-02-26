'use client';

import './Bubble.css';

interface ButtonProps {
    text: string;
  }

const Button : React.FC<ButtonProps> = ({ text }) => {
  return (
    <span className='bubble'>
      <span className='bubble-text'>{text}</span>
    </span>
  );
};

export default Button;
