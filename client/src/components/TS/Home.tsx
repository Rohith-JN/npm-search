import React, { FC } from 'react';
import Search from './Search';

interface HomeProps {
  setInput: any;
}

const Home: FC<HomeProps> = ({ setInput }) => {
  return (
    <div className="bg-gray-900 w-full h-screen flex justify-center items-center" id="Home">
      <div className="flex justify-center flex-col gap-2 font-bold items-center max-w-96 w-3/6">
        <h1 className="text-slate-300 font-sans text-5xl">NPM Search</h1>
        <div className="flex flex-col items-center justify-center bg-gray-800 w-3/4 px-3 border border-transparent rounded-md my-4">
          <Search setInput={setInput} />
        </div>
        <p className="text-slate-400">
          Examples: react, angular, vue, nodemon
        </p>
        <p className='text-slate-400'>
          Search and view package stats to find the right one for your project
        </p>
      </div>
    </div>
  );
}

export default Home;
