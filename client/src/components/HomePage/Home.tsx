import React, { FC } from 'react';
import Search from './Search';

interface HomeProps {
  setInput: any;
}

const Home: FC<HomeProps> = ({ setInput }) => {

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
          Examples: react, redux, vue, nodemon
        </p>
      </div>
    </div>
  );
}
export default Home;
