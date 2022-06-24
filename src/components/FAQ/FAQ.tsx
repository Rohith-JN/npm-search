import { FC } from 'react';

const FAQ: FC = () => {
    return (
        <div className="flex flex-col h-screen w-full gap-5 items-center dark:bg-gray-900 bg-white pl-32 pt-16" id="FAQ">
            <div className="flex flex-col w-full items-start">
                <h1 className="text-black dark:text-white text-6xl">FAQ</h1>
            </div>
            <div className="flex flex-col w-full gap-2 items-start">
                <h2 className="text-black dark:text-white text-3xl">Where the downloads come from?</h2>
                <p className="text-black dark:text-white text-2xl opacity-50">The npm package download data comes from npm's <a href="https://github.com/npm/download-counts">download counts</a> api and package details come from <a href="https://api-docs.npms.io/">npms.io</a></p>
            </div>
            <div className="flex flex-col w-full gap-2 items-start">
                <h2 className="text-black dark:text-white text-3xl">When the data is updated?</h2>
                <p className="text-black dark:text-white text-2xl opacity-50">These statistics are not provided in real-time. All numbers will change at most once per day.</p>
            </div>
            <div className="flex flex-col w-full gap-2 items-start">
                <h2 className="text-black dark:text-white text-3xl">Who is the creator of npm-search.com?</h2>
                <p className="text-black dark:text-white text-2xl opacity-50"><a href="https://github.com/Rohith-JN">Rohith JN</a> started the project</p>
            </div>
            <div className="flex flex-col w-full gap-2 items-start">
                <h2 className="text-black dark:text-white text-3xl">Can I participate to improve the website?</h2>
                <p className="text-black dark:text-white text-2xl opacity-50">Of course, this is an open source site and you can contribute by opening issues or by submitting PRs</p>
            </div>
        </div>
    )
}

export default FAQ