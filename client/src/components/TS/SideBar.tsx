import React from 'react';
import { BsGithub } from 'react-icons/bs';
import { GoSearch } from 'react-icons/go';
import { MdOutlineLightMode } from 'react-icons/md';
import { FaQuestion } from 'react-icons/fa';

const SideBar = () => {
  return (
    <div className="fixed top-0 left-0 h-screen w-20 flex flex-col
                  bg-white dark:bg-gray-800 shadow-lg pt-3">
        <SideBarIcon icon={<BsGithub size="28" />} text='View on Github' />
        <SideBarIcon icon={<GoSearch size="26" />} text = 'Quick search'/>
        <SideBarIcon icon={<MdOutlineLightMode size="30"/>} text = 'Toggle light mode' />
        <SideBarIcon icon={<FaQuestion size="22" />} text = 'FAQs' />
    </div>
  );
};

const SideBarIcon = ({ icon, text } : { icon: any, text: string }) => (
  <div className="sidebar-icon group">
    {icon}
    <span className="sidebar-tooltip group-hover:scale-100">
      {text}
    </span>
  </div>
);

export default SideBar;