import React, { useRef } from 'react';
import Summary from '../../components/Summary';
import Chart from '../../components/Chart';
import PackageInfo from '../../components/PackageInfo';
import { useRouter } from "next/router"
import Head from 'next/head';
import Error from '../../components/Error';
import moment from 'moment';

export const getServerSideProps = async (context: { params: { input: string; }; }) => {
    const input = context.params.input;
    const [packageRes, chartRes] = await Promise.all([
      fetch(`https://api.npms.io/v2/package/${input}`),
      fetch(`https://api.npmjs.org/downloads/range/last-week/${input}`),
    ])
    const [packageData, chartData] = await Promise.all([
      packageRes.json(),
      chartRes.json(),
    ])
    let labels = [];
    let data = [];
    if (chartRes.ok) {
      labels = chartData.downloads.map((item: any) => moment(item.day).format("MMM Do"));
      data = chartData.downloads.map((item: any) => item.downloads);
    }
    else {
      labels = []
      data = []
    }
    const error = packageRes.ok ? false : true;
    const errorCode = packageRes.ok ? 200 : packageRes.status
    const errorMessage = error ? packageData.message : ''
    return { props: { packageInfo: packageData, error, errorCode, errorMessage, labels, data } }
}

const Main = ({ packageInfo, error, errorCode, errorMessage, labels, data }: { packageInfo: any, error: boolean, errorCode: number, errorMessage: string, labels: Array<number>, data: Array<number> }) => {
  const router = useRouter()
  const inputRef = useRef<HTMLInputElement>(null);

  const submitHandler = (e: { preventDefault: () => void; }) => {
    let arr = inputRef.current!.value.split(' ');
    arr = arr.filter(e => e !== 'vs');
    arr = arr.filter(function (value, index, array) {
      return array.indexOf(value) === index;
    });
    e.preventDefault();
    if (inputRef.current!.value && arr.length === 1) {
      router.push({ pathname: `/package/${inputRef.current!.value}`, query: { input: inputRef.current!.value } },)
      inputRef.current!.value = '';
    }
    else if (inputRef.current!.value && arr.length > 1) {
      router.push({ pathname: `/packages/${arr}`, query: { input: inputRef.current!.value } },)
      inputRef.current!.value = '';
    }
  };

  const { query: { input }, } = router
  if (error) {
    return <Error statusCode={errorCode} statusMessage={errorMessage} />
  }
  else {
    return (
      <div className="h-full w-full pl-32 pt-10 pb-12 bg-white dark:bg-gray-900">
        <Head>
          <title>npm search | {packageInfo.collected.metadata.name}</title>
        </Head>
        <div className='flex flex-col gap-12'>
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
          <Chart input={input} chartLabels={labels} chartData={data} />
          <PackageInfo
            input={input}
            stars={packageInfo.collected.github.starsCount.toLocaleString()}
            forks={packageInfo.collected.github.forksCount.toLocaleString()}
            issues={packageInfo.collected.github.issues.openCount.toLocaleString()}
            version={packageInfo.collected.metadata.version}
          />
        </div>
      </div>
    );
  }
}

export default Main;
