import React, { FC, useRef } from 'react';

interface SearchProps {
    setInput: any;
}

const Search: FC<SearchProps> = ({ setInput }) => {
    const inputRef = useRef<HTMLInputElement>(null);

    const submitHandler = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        if (inputRef.current.value) {
            setInput(inputRef.current.value);
            inputRef.current.value = '';
        }
    };

    return (
        <form onSubmit={submitHandler} className='w-full'>
            <div className="flex gap-2 w-full">
                <input type="search" ref={inputRef} autoComplete="off" className="focus:border-gray-400 w-full px-3 py-1.5 text-base font-normal dark:text-white dark:bg-transparent border-2 border-solid dark:border-gray-300 rounded dark:focus:border-blue-600 focus:outline-none" placeholder="Search a NPM package" aria-label="Search" aria-describedby="button-addon3" spellCheck='false'></input>
                <button onClick={submitHandler} className="btn tracking-wide inline-block px-6 py-2 border-2 dark:border-blue-600 dark:text-blue-600 hover:bg-gray-400 border-gray-400 font-medium text-s leading-tight focus:bg-gray-400 rounded focus:outline-none focus:ring-0 transition duration-150 ease-in-out dark:hover:bg-blue-600 dark:hover:text-white hover:text-white focus:text-white" type="button" id="button-addon3">Search</button>
            </div>
        </form>
    )
}

export default Search