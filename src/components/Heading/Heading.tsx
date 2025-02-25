
import Image from 'next/image';

import './Heading.css';

const Heading: React.FC = () => {
  return (
    <div className="flex flex-row items-center justify-center heading">
      <Image src={'/images/rocket.svg'} alt='' width={22} height={36}/> 
      <span className='flex flex-row ml-[12px] heading-text'>
        <p className='text-nooro-blue'>Todo</p>
        <p className='text-nooro-purple'>App</p>
      </span>
    </div>
  );
};

export default Heading;
