'use client';

import { MouseEventHandler } from "react";
import Image from 'next/image';

import './Button.css';

interface ButtonProps {
    text: string;
    icon?: string;
    color?: string;
    width?: number,
    disabled?: boolean;
    onClick: MouseEventHandler<HTMLButtonElement>;
  }

const Button : React.FC<ButtonProps> = ({ text, icon, color = '#1E6F9F', width = 500, disabled, onClick}) => {
  return (
    <button 
        disabled={disabled}
        onClick={onClick}
        className="button"
        style={{ backgroundColor: color }}>
        <span className="flex flex-row justify-center">
            <p className="button-text">{text}</p>
            {icon && <Image src={icon} alt='' width={16} height={16}/>}
        </span>
    </button>
  );
};

export default Button;
