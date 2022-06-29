import React, { useState, useEffect, useRef, FC } from 'react';
import Summary from '../components/Summary';
import Loader from '../components/Loader';
import Chart from '../components/Chart';
import PackageInfo from '../components/PackageInfo';
import { useRouter } from "next/router"
import Head from 'next/head';

const Main: FC = () => {
  const [packageInfo, setPackageInfo]: any = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter()
  const inputRef = useRef<HTMLInputElement>(null);

  const submitHandler = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    if (inputRef.current!.value) {
      router.push({ pathname: `/${inputRef.current!.value}`, query: { input: inputRef.current!.value } },)
      inputRef.current!.value = '';
    }
  };

  const { query: { input }, } = router

  useEffect(() => {
    const fetchPackageInfo = async ({ input }: { input: any }) => {
      setLoading(true);
      const response = await fetch(`https://api.npms.io/v2/package/${input}`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }
      });
      const data = await response.json();

      if (response.status !== 200) {
        router.push({ pathname: `/Error`, query: { errorCode: response.status, errorMessage: data.message } })
      }
      else {
        setPackageInfo(data);
      }
      setLoading(false);
    };

    fetchPackageInfo({ input });
  }, [input, router]);

  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <div className="h-full w-full pl-32 pt-10 pb-12 bg-white dark:bg-gray-900">
          <Head>
            <title>npm search | {packageInfo.collected.metadata.name}</title>
          </Head>
          <div className='flex flex-col gap-20'>
            <div className="flex flex-col">
              <Summary
                heading={packageInfo.collected.metadata.name}
                version={packageInfo.collected.metadata.version}
                description={packageInfo.collected.metadata.description}
                license={
                  packageInfo.collected.metadata.license
                    ? packageInfo.collected.metadata.license
                    : 'No license'
                }
                npm={packageInfo.collected.metadata.links.npm}
                github={packageInfo.collected.metadata.links.repository}
              />
              <div className="flex flex-col items-center justify-center w-4/5 border border-transparent rounded-md mt-6 mb-2">
                <form onSubmit={submitHandler} className='w-full'>
                  <div className="flex gap-2 w-full">
                    <input type="search" ref={inputRef} autoComplete="off" className="focus:border-gray-400 w-full px-3 py-1.5 text-base font-normal dark:text-white dark:bg-transparent border-2 border-solid dark:border-gray-300 rounded dark:focus:border-blue-600 focus:outline-none" placeholder="Search a NPM package" aria-label="Search" aria-describedby="button-addon3" spellCheck='false'></input>
                    <button onClick={submitHandler} className="btn tracking-wide inline-block px-6 py-2 border-2 dark:border-blue-600 dark:text-blue-600 hover:bg-gray-400 border-gray-400 font-medium text-s leading-tight rounded focus:outline-none focus:ring-0 transition duration-150 ease-in-out dark:hover:bg-blue-600 dark:hover:text-white hover:text-white" type="button" id="button-addon3">Search</button>
                  </div>
                </form>
              </div>
            </div>
            <Chart input={input} />
            <PackageInfo
              stars={packageInfo.collected.github.starsCount.toLocaleString()}
              forks={packageInfo.collected.github.forksCount.toLocaleString()}
              issues={packageInfo.collected.github.issues.openCount.toLocaleString()}
              version={packageInfo.collected.metadata.version}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default Main;
