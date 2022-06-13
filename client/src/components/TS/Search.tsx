import React, { FC, useState, useRef } from 'react';

interface SearchProps {
    setInput: any;
}

const Search: FC<SearchProps> = ({ setInput }) => {
    const [names, setNames] = useState([]);
    const inputRef = useRef<HTMLInputElement>(null);

    const submitHandler = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        if (inputRef.current.value) {
            setInput(inputRef.current.value);
            inputRef.current.value = '';
        }
    };

    const submit = (e: { preventDefault: () => void; }, value: string) => {
        e.preventDefault();
        if (value) {
            setInput(value);
        }
    };

    async function getNames(input: string) {
        const response = await fetch(`https://registry.npmjs.org/-/v1/search?text=${input}&size=5`)
        const data = await response.json();
        if (input.length > 0) {
            setNames(data.objects.map((item: { package: { name: any } }) => item.package.name));
        }
        else {
            setNames([]);
        }
    }
    return (
        <form onSubmit={submitHandler} className='w-full'>
            <div className="flex gap-2 w-full mt-4">
                <input type="search" ref={inputRef} autoComplete="off" className="w-full px-3 py-1.5 text-base font-normal text-white bg-transparent border-2 border-solid border-gray-300 rounded focus:border-blue-600 focus:outline-none" placeholder="Search a NPM package" aria-label="Search" aria-describedby="button-addon3" spellCheck='false' onChange={(e) => getNames(e.target.value)}></input>
                <button onClick={submitHandler} className="btn inline-block px-6 py-2 border-2 border-blue-600 text-blue-600 font-medium text-xs leading-tight uppercase rounded focus:outline-none focus:ring-0 transition duration-150 ease-in-out hover:bg-blue-600 hover:text-white" type="button" id="button-addon3">Search</button>
            </div>
            <div className="flex gap-2 w-full mb-4">
                <ul className='w-full'>
                    {names.map((name: string) => <li className='w-full px-3 py-1.5 mt-3 text-base font-normal text-white bg-transparent border-2 border-solid cursor-pointer border-blue-600 rounded hover:bg-blue-600 transition duration-150 ease-in-out' onClick={(e) => submit(e, name)} key={name}>{name}</li>)}
                </ul>
            </div>
        </form>
    )
}

export default Search