import { useRouter } from "next/router"
import Head from 'next/head';

const Error = ({ statusCode, statusMessage }: { statusCode: number, statusMessage: string }) => {
  const router = useRouter();
  return (
    <div className="flex items-center justify-center flex-col w-full min-h-screen dark:bg-gray-900 dark:text-gray-100 bg-white">
      <Head>
        <title>npm search | Error</title>
      </Head>
      <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8">
        <div className="max-w-md text-center">
          <h2 className="mb-8 font-extrabold text-9xl xmd:text-8xl dark:text-gray-600">
            <span className="sr-only">Error</span>
            {statusCode}
          </h2>
          <p className="text-2xl font-semibold md:text-3xl">{statusMessage}</p>
          <p className="mt-4 mb-8 dark:text-gray-400 md:hidden">
            But don&#39;t worry, you can search again in the homepage.
          </p>
          <button onClick={() => router.push("/")}
            className="px-8 py-3 font-semibold md:mt-4 rounded dark:bg-violet-400 dark:text-gray-900 bg-violet-400 text-white"
          >
            Back to homepage
          </button>
        </div>
      </div>
    </div>
  );
};

export default Error;

