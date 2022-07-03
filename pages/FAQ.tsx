import Head from 'next/head';
import { FC } from 'react';

const FAQ: FC = () => {
    return (
        <div className="pl-16 py-24 mx-auto w-full h-screen bg-white dark:bg-gray-900 sm:py-16">
            <Head>
                <title>npm search | FAQ</title>
            </Head>
            <div className="flex flex-col items-center justify-center">
                <h1 className="text-2xl font-medium text-center title-font text-gray-900 dark:text-white mb-4">
                    Frequently Asked Questions
                </h1>
                <details className="mb-4 w-2/5 mt-6 lg:w-4/5">
                    <summary className="font-semibold  bg-gray-200 rounded-md py-2 px-4 dark:text-black">
                        Where do the downloads come from?
                    </summary>
                    <span className='text-black dark:text-white'>
                        The npm package download data comes from npm&#39;s <a href="https://github.com/npm/download-counts">download counts</a> api and package details come from <a href="https://api-docs.npms.io/">npms.io</a>
                    </span>
                </details>
                <details className="mb-4 w-2/5 lg:w-4/5">
                    <summary className="font-semibold bg-gray-200 rounded-md py-2 px-4 dark:text-black">
                        When is the data updated?
                    </summary>

                    <span className='text-black dark:text-white'>
                        These statistics are not provided in real-time. All numbers will change at most once per day.
                    </span>
                </details>
                <details className="mb-4 w-2/5 lg:w-4/5">
                    <summary className="font-semibold  bg-gray-200 rounded-md py-2 px-4 dark:text-black">
                        Who is the creator of this site?
                    </summary>

                    <span className='text-black dark:text-white'>
                        <a href="https://github.com/Rohith-JN">Rohith JN</a> started the project
                    </span>
                </details>
                <details className="mb-4 w-2/5 lg:w-4/5">
                    <summary className="font-semibold  bg-gray-200 rounded-md py-2 px-4 dark:text-black">
                        Can I participate to improve the website?
                    </summary>
                    <span className="text-black dark:text-white">
                        Of course, this is an open source project and you can contribute by opening issues or by submitting PRs
                    </span>
                </details>
            </div>
        </div>
    )
}

export default FAQ