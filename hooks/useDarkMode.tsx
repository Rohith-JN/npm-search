import { useState, useEffect } from 'react';
import useStorage from './useStorage';

const useDarkMode = () => {
    const { getItem, setItem, removeItem } = useStorage();
    const [theme, setTheme]: any = useState(getItem('theme'));
    const colorTheme = theme === 'dark' ? 'light' : 'dark';

    useEffect(() => {
        const root = window.document.documentElement;
        root.classList.remove(colorTheme);
        root.classList.add(theme);

        setItem('theme', theme);
    }, [theme, colorTheme, setItem]);

    return [colorTheme, setTheme];
}

export default useDarkMode