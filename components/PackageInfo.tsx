import React, { FC } from 'react';

interface PackageInfoProps {
  stars: number;
  forks: number;
  issues: number;
  version: number;
  input: any;
}

const PackageInfo: FC<PackageInfoProps> = ({ stars, forks, issues, version, input }) => {

  return (
    <div className="w-5/6 flex flex-col gap-3 mt-12 lg:w-full lg:pr-4">
      <h1 className='mb-6 text-2xl'>Stats</h1>
      <div className="relative overflow-x-auto shadow-md rounded-xl">
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
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <th scope="row" className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                {input}
              </th>
              <td className="px-4 py-4">
                {stars}
              </td>
              <td className="px-4 py-4">
                {forks}
              </td>
              <td className="px-4 py-4">
                {issues}
              </td>
              <td className="px-4 py-4">
                v{version}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default PackageInfo;
