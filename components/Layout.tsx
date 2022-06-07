import Main from '../pages/main';
import Navbar from './Navbar';
import Home from '../pages/index';
import React, { useState, useEffect, FC } from 'react';
import useStorage from '../hooks/useStorage';

interface LayoutProps {
    children: any;
}

const Layout: FC<LayoutProps> = () => {
    // const { getItem, setItem, removeItem } = useStorage();
    const [input, setInput] = useState('');

    //useEffect(() => {
    //    setInput(getItem('input'));
    //}, [getItem]);

    //useEffect(() => {
    //    setItem('input', input!);
    //}, [input, setItem]);

    return (
        <div className="App">
            <Navbar setInput={setInput} />
            <div className="sections">
                {input ? (
                    <Main input={input} />
                ) : (
                    <Home setInput={setInput} />
                )}
            </div>
        </div>
    );
}

export default Layout;
