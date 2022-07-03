import { FC } from 'react';
import { useRouter } from "next/router"
import Head from 'next/head';

const Custom500: FC = () => {
  const router = useRouter()

  return (
    <div className="flex items-center justify-center flex-col w-full min-h-screen dark:bg-gray-900 dark:text-gray-100 bg-white">
      <Head>
        <title>npm search | 500</title>
      </Head>
      <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8 md:pl-16">
        <div className="max-w-md text-center">
          <h2 className="mb-8 font-extrabold text-9xl xmd:text-8xl dark:text-gray-600">
            <span className="sr-only">Error</span>
            500
          </h2>
          <p className="text-2xl font-semibold md:text-3xl pb-4">Internal server error</p>
          <button onClick={() => router.push("/")}
            className="px-8 py-3 font-semibold rounded dark:bg-violet-400 dark:text-gray-900 bg-violet-400 text-white"
          >
            Back to homepage
          </button>
        </div>
      </div>
    </div>
  );
};

export default Custom500;
