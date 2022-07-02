import type { NextPage } from 'next'
import { useRef } from 'react';
import { useRouter } from 'next/router'
import Head from 'next/head';

const Home: NextPage = () => {
  const router = useRouter()
  const inputRef = useRef<HTMLInputElement>(null);

  const submitHandler = (e: { preventDefault: () => void; }) => {
    let arr = inputRef.current!.value.split(' ');
    arr = arr.filter(e => e !== 'vs');
    arr = arr.filter(function (value, index, array) {
      return array.indexOf(value) === index;
    });
    e.preventDefault();
    if (inputRef.current!.value && arr.length === 1) {
      router.push({ pathname: `/package/${inputRef.current!.value}`, query: { input: inputRef.current!.value } },)
      inputRef.current!.value = '';
    }
    else if (inputRef.current!.value && arr.length > 1) {
      router.push({ pathname: `/packages/${arr}`, query: { input: inputRef.current!.value } },)
      inputRef.current!.value = '';
    }
  };

  return (
    <div className="bg-white dark:bg-gray-900 w-full h-screen flex pl-32 pt-11" id="Home">
      <Head>
        <title>npm search | Home</title>
      </Head>
      <div className="flex flex-col gap-0 w-full">
        <h1 className="dark:text-slate-300 font-thin text-4xl">npm search</h1>
        <p className='dark:text-slate-400 text-3xl font-normal mt-6 tracking-wide'>
          Search and view package stats to find the right one for your project
        </p>
        <p className="dark:text-slate-400 text-lg tracking-widest mt-6">
          Examples: react, redux, vue, nodemon
        </p>
        <div className="flex flex-col items-center justify-center w-4/5 border border-transparent rounded-md mt-2  mb-2">
          <form onSubmit={submitHandler} className='w-full'>
            <div className="flex gap-2 w-full">
              <input type="search" ref={inputRef} autoComplete="off" className="focus:border-gray-400 w-full px-3 py-1.5 text-base font-normal dark:text-white dark:bg-transparent border-2 border-solid dark:border-gray-300 rounded dark:focus:border-blue-600 focus:outline-none" placeholder="Search a NPM package" aria-label="Search" aria-describedby="button-addon3" spellCheck='false'></input>
              <button onClick={submitHandler} className="btn tracking-wide inline-block px-6 py-2 border-2 dark:border-blue-600 dark:text-blue-600 hover:bg-gray-400 border-gray-400 font-medium text-s leading-tight rounded focus:outline-none focus:ring-0 transition duration-150 ease-in-out dark:hover:bg-blue-600 dark:hover:text-white hover:text-white" type="button" id="button-addon3">Search</button>
            </div>
          </form>
        </div>
        <p className='dark:text-slate-400 text-2xl mt-3'>Popular examples</p>
        <p className="dark:text-slate-400 text-lg tracking-widest mt-4">
          react vs svelte vs vue<br></br>
          react vs vue<br></br>
          redux vs recoil<br></br>
          react vs svelte vs vue vs solid-js<br></br>
          react vs svelte vs vue vs solid-js vs next
        </p>
      </div>
    </div>
  )
}

export default Home
