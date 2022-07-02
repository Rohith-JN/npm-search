import React, { useRef } from 'react';
import { useRouter } from "next/router"
import Head from 'next/head';
import moment from 'moment';
import options from '../../components/options';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const getServerSideProps = async (context: { params: { inputs: string; }; }) => {
  const input = context.params.inputs;
  const inputs = input.split(',');
  const [packageRes] = await Promise.all([
    fetch("https://api.npms.io/v2/package/mget", {
      body: JSON.stringify(inputs),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      method: "POST"
    }),
  ])
  let [packageData] = await Promise.all([
    packageRes.json(),
  ])
  const chartRes = await Promise.all(inputs.map((input: any) => fetch(`https://api.npmjs.org/downloads/range/last-week/${input}`)))
  const chartData = await Promise.all(chartRes.map(p => p.json()))
  packageData = Object.values(packageData)
  const heading = inputs.join(' vs ')
  return { props: { heading, chartData, packageData } }
}

const Main = ({ heading, chartData, packageData }: { heading: string, chartData: any, packageData: any }) => {
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

  function random_item(items: any) {
    return items[Math.floor(Math.random() * items.length)];
  }

  const { query: { input }, } = router
  const colors = ['#1e88e5', '#a3e635', '#6d28d9', '#e11d48', '#f97316']
  let datasets: any = []

  const labels = chartData[0].downloads.map((item: any) => moment(item.day).format("MMM Do"));
  chartData.forEach((element: any) => {
    const color = random_item(colors)
    datasets.push({
      label: element.package,
      data: element.downloads.map((item: any) => item.downloads),
      fill: true,
      backgroundColor: color,
      borderColor: color,
      lineTension: 0.4,
    })
  });

  const data = {
    labels: labels,
    datasets: datasets
  };

  return (
    <div className="h-full w-full pl-32 pt-10 pb-12 bg-white dark:bg-gray-900">
      <Head>
        <title>npm search | {heading}</title>
      </Head>
      <div className='flex flex-col gap-12'>
        <div className="flex flex-col">
          <h1 className='text-4xl font-normal'>{heading}</h1>
          <div className="flex flex-col items-center justify-center w-4/5 border border-transparent rounded-md mt-6 mb-2">
            <form onSubmit={submitHandler} className='w-full'>
              <div className="flex gap-2 w-full">
                <input type="search" ref={inputRef} autoComplete="off" className="focus:border-gray-400 w-full px-3 py-1.5 text-base font-normal dark:text-white dark:bg-transparent border-2 border-solid dark:border-gray-300 rounded dark:focus:border-blue-600 focus:outline-none" placeholder="Search a NPM package" aria-label="Search" aria-describedby="button-addon3" spellCheck='false'></input>
                <button onClick={submitHandler} className="btn tracking-wide inline-block px-6 py-2 border-2 dark:border-blue-600 dark:text-blue-600 hover:bg-gray-400 border-gray-400 font-medium text-s leading-tight rounded focus:outline-none focus:ring-0 transition duration-150 ease-in-out dark:hover:bg-blue-600 dark:hover:text-white hover:text-white" type="button" id="button-addon3">Search</button>
              </div>
            </form>
          </div>
        </div>
        <div>
          <div className="w-5/6 h-96">
            <p className='text-2xl mb-6'>Downloads in the past 1 week</p>
            <Line options={options} data={data} />
          </div>
        </div>
        <div className="w-5/6 flex flex-col gap-3 mt-12">
          <h1 className='mb-6 text-2xl'>Stats</h1>
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-4 py-3">
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Stars
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Forks
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Issues
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Version
                  </th>
                </tr>
              </thead>
              <tbody>
                {packageData.map((element: any, index: any) => {
                  return (<tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                      {element.collected.metadata.name}
                    </th>
                    <td className="px-4 py-4">
                      {element.collected.github.starsCount.toLocaleString()}
                    </td>
                    <td className="px-4 py-4">
                      {element.collected.github.forksCount.toLocaleString()}
                    </td>
                    <td className="px-4 py-4">
                      {element.collected.github.issues.openCount.toLocaleString()}
                    </td>
                    <td className="px-4 py-4">
                      v{element.collected.metadata.version}
                    </td>
                  </tr>)

                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Main;