import React, { FC } from 'react';

interface SummaryProps {
  heading: string;
  version: number;
  description: string;
  license: string;
  npm: string;
  github: string;
}

const Summary: FC<SummaryProps> = ({
  heading,
  version,
  description,
  license,
  npm,
  github,
}) => {

  return (
    <div className="w-full h-full flex flex-col gap-3">
      <div className="flex flex-row items-end gap-3">
        <h1 className='text-4xl font-normal'>{heading}</h1>
        <p className='text-xl text-gray-400'>v{version}</p>
      </div>
      <div className="flex flex-row items-end gap-3 slg:flex-col slg:items-start">
        <p className="text-gray-400">{description}</p>
        <div className="flex flex-row gap-3">
        <p className='text-gray-400'>{license}</p>
        <div className="h-6 w-0.5 bg-gray-400"></div>
        <a href={npm}>
          <p className='text-gray-400 hover:text-blue-500 cursor-pointer'>NPM</p>
        </a>
        <div className="h-6 w-0.5 bg-gray-400"></div>
        <a href={github}>
          <p className='text-gray-400 hover:text-blue-500 cursor-pointer'>Github</p>
        </a>
        </div>
      </div>
    </div>
  );
}

export default Summary;
