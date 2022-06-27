import { FC } from 'react';
import { useRouter } from "next/router"


const Error: FC = () => {
  const router = useRouter()
  const { query: { errorCode, errorMessage }, } = router

  return (
    <div className="flex items-center justify-center flex-col w-full h-screen dark:bg-gray-900 dark:text-gray-100 bg-white">
      <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8">
        <div className="max-w-md text-center">
          <h2 className="mb-8 font-extrabold text-9xl dark:text-gray-600">
            <span className="sr-only">Error</span>
            {errorCode}
          </h2>
          <p className="text-2xl font-semibold md:text-3xl">{errorMessage}</p>
          <p className="mt-4 mb-8 dark:text-gray-400">
            But don&#39;t worry, you can search again in the homepage.
          </p>
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

export default Error;
