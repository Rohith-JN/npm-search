import { useState } from 'react';
import { BsGithub } from 'react-icons/bs';
import { GoSearch } from 'react-icons/go';
import { FaQuestion } from 'react-icons/fa';
import { DarkModeSwitch } from 'react-toggle-dark-mode';
import { useRouter } from "next/router"
import { useTheme } from 'next-themes'
import { useEffect } from 'react';

const SideBar = () => {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false);
  const [darkMode, setDarkMode] = useState(theme === 'light' ? true : false);
  const router = useRouter()

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
    <div className="bg-gray-200 dark:bg-gray-800 fixed top-0 left-0 h-screen w-20 flex flex-col
                  shadow-lg pt-3 md:hidden">
      <a href="https://github.com/Rohith-JN/npm_search"><div className="sidebar-icon group">
        <BsGithub size="28" />
        <span className="sidebar-tooltip group-hover:scale-100">
          View on Github
        </span>
      </div></a>
      <SideBarIcon icon={<GoSearch size="26" onClick={() => router.push("/")} />} text='Quick search' />
      <SideBarIcon icon={<DarkModeSwitch
        checked={darkMode}
        onChange={toggleDarkMode}
        size={30}
        moonColor="#fff"
        sunColor="#fff"
      />} text={`Toggle ${theme} mode`} />
      <SideBarIcon icon={<FaQuestion size="22" onClick={() => router.push("/FAQ")} />} text='FAQs' />
    </div>
  );
};

const SideBarIcon = ({ icon, text }: { icon: any, text: string }) => (
  <div className="sidebar-icon group">
    {icon}
    <span className="sidebar-tooltip group-hover:scale-100">
      {text}
    </span>
  </div>
);

export default SideBar;