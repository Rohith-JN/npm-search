import React, { useRef, useState } from 'react';
import Summary from '../../components/Summary';
import Chart from '../../components/Chart';
import PackageInfo from '../../components/PackageInfo';
import Head from 'next/head';
import Error from '../../components/Error';
import moment from 'moment';
import { getNames, submitExamples, submitHandler } from '../../utils/utils';

export const getServerSideProps = async (context: { params: { input: string; }; }) => {
  const input = encodeURIComponent(context.params.input);
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
  const [names, setNames] = useState([]);
  const [underline, setUnderline] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const submit = (e: any) => {
    submitHandler(e, inputRef)
  }

  if (error) {
    return <Error statusCode={errorCode} statusMessage={errorMessage} />
  }
  else {
    return (
      <div className="min-h-screen w-full pl-32 pt-10 pb-12 md:pl-4 pr-2 bg-white dark:bg-gray-900">
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
            <div className="flex flex-col items-center justify-center w-4/5 border border-transparent rounded-md mt-2 mb-2 md:w-full md:pr-2">
              <form onSubmit={submit} className='w-full pt-2'>
                <div className="flex w-full flex-col border-2 rounded-lg pt-2 border-blue-500">
                  <div className="flex flex-row gap-2">
                    <input type="search" ref={inputRef} autoComplete="off" className="focus:border-gray-400 rounded-lg w-full px-3 pb-2 text-base font-normal dark:text-white dark:bg-transparent focus:outline-none" placeholder="Enter a NPM package" aria-label="Search" aria-describedby="button-addon3" spellCheck='false' onChange={(e) => getNames(e.target.value, setUnderline, setNames)}></input>
                  </div>
                  <div className={`w-full h-0.5 bg-blue-500 ${underline ? "flex" : "hidden"}`}></div>
                  <ul className='w-full'>
                    {names.map((name: string) =>
                      <li className='w-full px-3 py-3 hover:bg-blue-500 text-base font-normal dark:text-white text-black hover:text-white cursor-pointer transition duration-150 ease-in-out' onClick={(e) => submitExamples(e, name)} key={name}>{name}</li>
                    )}
                  </ul>
                </div>
              </form>
            </div>
          </div>
          <Chart input={packageInfo.collected.metadata.name} chartLabels={labels} chartData={data} />
          <PackageInfo
            input={packageInfo.collected.metadata.name}
            stars={packageInfo.collected.github !== undefined ? packageInfo.collected.github.starsCount.toLocaleString() : <p className='text-3xl'>--</p>}
            forks={packageInfo.collected.github !== undefined ? packageInfo.collected.github.forksCount.toLocaleString() : <p className='text-3xl'>--</p>}
            issues={packageInfo.collected.github !== undefined ? packageInfo.collected.github.issues.openCount.toLocaleString() : <p className='text-3xl'>--</p>}
            version={packageInfo.collected.metadata.version}
          />
        </div>
      </div>
    );
  }
}

export default Main;
