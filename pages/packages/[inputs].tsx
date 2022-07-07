import React, { useRef, useState } from 'react';
import { useRouter } from "next/router"
import Head from 'next/head';
import moment from 'moment';
import options from '../../components/options';
import Error from '../../components/Error';
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
import { FaGithub, FaNpm } from 'react-icons/fa';
import { IoLinkOutline, IoClose } from 'react-icons/io5'

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
  let packages = input.split(',');
  const inputs = packages.map((element: string) => {
    return element.toLowerCase()
  })
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
  packageData = Object.values(packageData)
  const heading = inputs.join(' vs ')
  let chartError = false;
  let chartErrorCode = 200;
  let chartErrorMessage = '';
  chartRes.forEach((response) => {
    chartError = response.ok ? false : true
    chartErrorCode = response.ok ? 200 : response.status
    chartErrorMessage = chartError ? 'Oops! something went wrong' : ''
  })
  const chartData = chartError ? [] : await Promise.all(chartRes.map(p => p.json()))
  const labels = chartError ? [] : chartData[0].downloads.map((item: any) => moment(item.day).format("MMM Do"));
  const error = packageRes.ok ? false : true;
  const errorCode = packageRes.ok ? 200 : packageRes.status
  const errorMessage = error ? packageData.message : ''
  return { props: { heading, chartData, packageData, error, errorCode, errorMessage, chartError, chartErrorCode, chartErrorMessage, labels } }
}

const Main = ({ heading, chartData, packageData, error, errorCode, errorMessage, chartError, chartErrorCode, chartErrorMessage, labels }: { heading: string, chartData: any, packageData: any, error: boolean, errorCode: number, errorMessage: string, labels: Array<number>, chartError: boolean, chartErrorCode: number, chartErrorMessage: string }) => {
  const router = useRouter();
  const [names, setNames] = useState([]);
  const [underline, setUnderline] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  async function getNames(input: string) {
    setUnderline(true)
    const response = await fetch(`https://registry.npmjs.org/-/v1/search?text=${input}&size=5`)
    const data = await response.json();
    if (input.length > 0) {
      setNames(data.objects.map((item: { package: { name: any } }) => item.package.name));
    }
    else {
      setNames([]);
      setUnderline(false)
    }
  }

  const submitExamples = (e: { preventDefault: () => void; }, text: string) => {
    let arr = text.split(' ');
    arr = arr.filter(e => e !== 'vs');
    arr = arr.filter(function (value, index, array) {
      return array.indexOf(value) === index;
    });
    e.preventDefault();
    if (text && arr.length === 1) {
      router.push({ pathname: `/package/${text.toLowerCase()}`, query: { input: text.toLowerCase() } },)
    }
    else if (text && arr.length > 1) {
      router.push({ pathname: `/packages/${arr}`, query: { input: text } },)
    }
  };

  const submitHandler = (e: { preventDefault: () => void; }) => {
    let arr = inputRef.current!.value.split(' ');
    arr = arr.filter(e => e !== 'vs');
    arr = arr.filter(function (value, index, array) {
      return array.indexOf(value) === index;
    });
    e.preventDefault();
    if (inputRef.current!.value && arr.length === 1) {
      router.push({ pathname: `/package/${inputRef.current!.value.toLowerCase()}`, query: { input: inputRef.current!.value.toLowerCase() } },)
      inputRef.current!.value = '';
    }
    else if (inputRef.current!.value && arr.length > 1) {
      router.push({ pathname: `/packages/${arr}`, query: { input: inputRef.current!.value } },)
      inputRef.current!.value = '';
    }
  };

  var dynamicColors = function () {
    const red = Math.floor(Math.random() * 210);
    const green = Math.floor(Math.random() * 210);
    const blue = Math.floor(Math.random() * 210);
    return "rgb(" + red + ", " + green + ", " + blue + ")";
  };

  let datasets: any = []

  chartData.forEach((element: any) => {
    Object.assign(element, { "color": dynamicColors() })
    datasets.push({
      label: element.package,
      data: element.downloads.map((item: any) => item.downloads),
      fill: true,
      backgroundColor: element.color,
      borderColor: element.color,
      lineTension: 0.4,
    })
  });

  const data = {
    labels: labels,
    datasets: datasets
  };
  if (error) {
    return <Error statusCode={errorCode} statusMessage={errorMessage} />
  }
  else if (chartError) {
    return <Error statusCode={chartErrorCode} statusMessage={chartErrorMessage} />
  }
  else {
    return (
      <div className="min-h-screen w-full md:pl-20 pl-32 pt-10 pb-12 bg-white dark:bg-gray-900">
        <Head>
          <title>{heading}</title>
        </Head>
        <div className='flex flex-col gap-12'>
          <div className="flex flex-col">
            <h1 className='text-4xl font-normal'>{heading}</h1>
            <div className="flex flex-col items-center justify-center w-4/5 border border-transparent rounded-md mt-2 mb-2 md:w-full md:pr-2">
              <form onSubmit={submitHandler} className='w-full'>
                <div className="flex w-full flex-col border-2 rounded-lg pt-2 mt-2 border-blue-500">
                  <div className="flex flex-row gap-2">
                    <input type="search" ref={inputRef} autoComplete="off" className="focus:border-gray-400 rounded-lg w-full px-3 pb-2 text-base font-normal dark:text-white dark:bg-transparent focus:outline-none" placeholder="Search a NPM package" aria-label="Search" aria-describedby="button-addon3" spellCheck='false' onChange={(e) => getNames(e.target.value)}></input>
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
          <div>
            <div className="w-5/6 h-96 lg:w-full lg:pr-4">
              <p className='text-2xl mb-6'>Downloads in the past 1 week</p>
              <Line options={options} data={data} />
            </div>
          </div>
          <div className="w-5/6 flex flex-col gap-3 mt-16 lg:w-full lg:pr-4">
            <h1 className='mb-6 text-2xl'>Stats</h1>
            <div className="relative overflow-x-auto shadow-md rounded-xl">
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-4 py-3">
                    </th>
                    <th scope="col" className="px-0 py-3">
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
                      <th scope="row" className="px-0 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                        <div className="flex-row flex gap-5">
                          <a href={element.collected.metadata.links.repository}><FaGithub size={28} className='text-gray-500 dark:text-gray-500 hover:text-black dark:hover:text-white' /></a>
                          <a href={element.collected.metadata.links.npm}><FaNpm size={30} className='text-gray-500 dark:text-gray-500 dark:hover:text-red-500 hover:text-red-500' /></a>
                          <a href={element.collected.metadata.links.homepage}><IoLinkOutline size={30} className='text-gray-500 dark:text-gray-500 hover:text-green-500 dark:hover:text-green-500' /></a>
                        </div>
                      </th>
                      <td className="px-4 py-4">
                        {element.collected.github !== undefined ? element.collected.github.starsCount.toLocaleString() : <p className='text-3xl'>--</p>}
                      </td>
                      <td className="px-4 py-4">
                        {element.collected.github !== undefined ? element.collected.github.forksCount.toLocaleString() : <p className='text-3xl'>--</p>}
                      </td>
                      <td className="px-4 py-4">
                        {element.collected.github !== undefined ? element.collected.github.issues.openCount.toLocaleString() : <p className='text-3xl'>--</p>}
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
}

export default Main;