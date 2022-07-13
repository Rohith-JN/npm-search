import type { NextPage } from 'next'
import { useRef, useState, useEffect } from 'react';
import { useRouter } from 'next/router'
import Head from 'next/head';
import { DarkModeSwitch } from 'react-toggle-dark-mode';
import { useTheme } from 'next-themes'
import { submitExamples, submitHandler, getNames } from '../utils/utils';

const Home: NextPage = () => {
  const router = useRouter()
  const inputRef = useRef<HTMLInputElement>(null);
  const submit = (e: any) => {
    submitHandler(e, inputRef)
  }
  const [names, setNames] = useState([]);
  const [underline, setUnderline] = useState(false);
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false);
  const [darkMode, setDarkMode] = useState(theme === 'light' ? true : false);

  const toggleDarkMode = (checked: boolean) => {
    setTheme(theme === 'light' ? 'dark' : 'light')
    setDarkMode(checked);
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null
  }

  return (
    <div className="bg-white dark:bg-gray-900 w-full min-h-screen pb-10 flex pl-32 pt-11 md:pl-4 pr-2" id="Home">
      <Head>
        <title>npm search | Home</title>
      </Head>
      <div className="flex flex-col gap-0 w-full">
        <div className="flex flex-row items-center justify-between pr-3">
          <h1 className="dark:text-slate-300 font-thin text-4xl">npm search</h1>
          <DarkModeSwitch className='mmd:hidden'
            checked={darkMode}
            onChange={toggleDarkMode}
            size={30}
            moonColor="black"
            sunColor="#fff"
          />
        </div>
        <p className='dark:text-slate-400 text-3xl font-normal mt-6 tracking-wide xmd:text-2xl'>
          Search and view package stats to find the right one for your project. <span className="mmd:hidden text-blue-500 cursor-pointer hover:underline" onClick={() => router.push("/FAQ")}>FAQs</span>
        </p>
        <p className="dark:text-slate-400 text-lg tracking-widest mt-6">
          Examples: <span className='cursor-pointer text-blue-500 hover:underline' onClick={(e) => { submitExamples(e, e.currentTarget.innerText) }}>react</span>, <span className='cursor-pointer text-blue-500 hover:underline' onClick={(e) => { submitExamples(e, e.currentTarget.innerText) }}>redux</span>, <span className='cursor-pointer text-blue-500 hover:underline' onClick={(e) => { submitExamples(e, e.currentTarget.innerText) }}>vue</span>, <span className='cursor-pointer text-blue-500 hover:underline' onClick={(e) => { submitExamples(e, e.currentTarget.innerText) }}>next</span>
        </p>
        <div className="flex flex-col items-center justify-center w-4/5 border border-transparent rounded-md mt-2 mb-2 md:w-full md:pr-2">
          <form onSubmit={submit} className='w-full'>
            <div className="flex w-full flex-col border-2 rounded-lg pt-2 border-blue-500">
              <div className="flex flex-row gap-2">
                <input type="search" ref={inputRef} autoComplete="off" className="focus:border-gray-400 rounded-lg w-full px-3 pb-2 text-base font-normal dark:text-white dark:bg-transparent focus:outline-none" placeholder="Enter a NPM package" aria-label="Search" aria-describedby="button-addon3" spellCheck='false' onChange={(e) => getNames(e.target.value, setUnderline, setNames)}></input>
              </div>
              <div className={`w-full h-0.5 bg-blue-500 ${underline ? "flex" : "hidden"}`}></div>
              <ul className='w-full'>
                {names.map((name: string) =>
                  <li className='w-full px-3 py-3 hover:bg-blue-500 text-base font-normal dark:text-white text-black hover:text-white cursor-pointer transition duration-150 ease-in-out' onClick={(e) => submitExamples(e, name)} key={name}>{name}</li>
                )}
              </ul>
            </div>
          </form>
        </div>
        <p className='dark:text-slate-400 text-2xl mt-3'>Popular examples</p>
        <p className="text-blue-500 text-lg tracking-widest mt-4 cursor-pointer hover:underline" onClick={(e) => { submitExamples(e, e.currentTarget.innerText) }}>
          react vs svelte vs vue</p>
        <p className="text-blue-500 text-lg tracking-widest cursor-pointer hover:underline" onClick={(e) => { submitExamples(e, e.currentTarget.innerText) }}>redux vs recoil</p>
        <p className="text-blue-500 text-lg tracking-widest cursor-pointer hover:underline" onClick={(e) => { submitExamples(e, e.currentTarget.innerText) }}>react-bootstrap vs reactstrap</p>
        <p className="text-blue-500 text-lg tracking-widest cursor-pointer hover:underline" onClick={(e) => { submitExamples(e, e.currentTarget.innerText) }}>next vs nuxt</p>
      </div>
    </div>
  )
}

export default Home
