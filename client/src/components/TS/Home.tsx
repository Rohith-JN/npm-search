import e from 'express';
import React, { FC } from 'react';
import Search from './Search';

interface HomeProps {
  setInput: any;
}

const Home: FC<HomeProps> = ({ setInput }) => {
  const handleClick = (value: string, e: any) => {
    e.preventDefault();
    setInput(value)
  }

  return (
    <div className="bg-gray-900 w-full h-screen flex pl-32 pt-11" id="Home">
      <div className="flex flex-col gap-0 w-full">
        <h1 className="text-slate-300 font-thin text-4xl">npm search</h1>
        <p className='text-slate-400 text-3xl font-normal mt-6 tracking-wide'>
          Search and view package stats to find the right one for your project
        </p>
        <div className="flex flex-col items-center justify-center w-4/5 border border-transparent rounded-md mt-6 mb-2">
          <Search setInput={setInput} />
        </div>
        <p className="text-slate-400 text-lg tracking-widest mt-2">
          Examples:
          {example('react', handleClick('react', e))},
          {example('angular', handleClick('angular', e))},
          {example('vue', handleClick('vue', e))},
          {example('nodemon', handleClick('nodemon', e))}
        </p>
        <div className='absolute flex w-3/4 bottom-2 flex-col'>
          <hr className='h-0.2 w-full' style={{
            color: 'black',
          }}></hr>
          <p className='text-slate-400 text-xl font-normal tracking-wide mt-3 mb-3'>Made by <a className='hover:underline' href="https://github.com/Rohith-JN">Rohith JN</a></p>
        </div>
      </div>
    </div>
  );
}

const example = (example: string, func: any) => {
  return (
    <span className='cursor-pointer hover:underline' onClick={func}>{example}</span>
  )
}

export default Home;
