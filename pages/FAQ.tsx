import Head from 'next/head';
import { FC } from 'react';

const FAQ: FC = () => {
    const obj = {
        "Where do the downloads come from?": "The npm package download data comes from npm download counts api and package details come from npms.io",
        "When is the data updated?": "These statistics are not provided in real-time. All numbers will change at most once per day.",
        "Who is the creator of this site?": "Rohith JN started the project",
        "Can I participate to improve the website?": "Of course, this is an open source project and you can contribute by opening issues or by submitting PRs",
        "What tech stack was used to build this site?": "This site was built using Next.js, React, TypeScript and Tailwind CSS"
    }
    return (
        <div className="pl-16 py-24 mx-auto w-full h-screen bg-white dark:bg-gray-900 sm:py-16">
            <Head>
                <title>npm search | FAQ</title>
            </Head>
            <div className="flex flex-col items-center justify-center">
                <h1 className="text-2xl font-medium text-center title-font text-gray-900 dark:text-white mb-4">
                    Frequently Asked Questions
                </h1>
                {Object.entries(obj).map(
                    ([key, value]) => {
                        return (
                            <QNA key={key} question={key} answer={value} />
                        );
                    })
                }
            </div>
        </div>
    )
}

const QNA = ({ question, answer }: { question: string, answer: string }) => {
    return (
        <details className="mb-4 w-2/5 lg:w-4/5">
            <summary className="font-semibold  bg-gray-200 rounded-md py-2 px-4 dark:text-black">
                {question}
            </summary>
            <span className="text-black dark:text-white">
                {answer}
            </span>
        </details>
    )
}

export default FAQ