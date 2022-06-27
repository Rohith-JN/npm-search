import React, { useState, useEffect, FC } from 'react';
import Summary from '../components/Summary';
import Loader from '../components/Loader';
import WeekChart from '../components/WeekChart';
import MonthChart from '../components/MonthChart';
import PackageInfo from '../components/PackageInfo';
import Readme from '../components/Readme';
import { useRouter } from "next/router"

const Main: FC = () => {
  const [packageInfo, setPackageInfo]: any = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter()
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
        <div className="Main">
          <div className='main-container'>
            <div className="row">
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
                downloads={Math.trunc(
                  packageInfo.evaluation.popularity.downloadsCount
                ).toLocaleString()}
                keywords={packageInfo.collected.metadata.keywords.join(', ')}
              />
              <WeekChart input={input} />
            </div>
            <div className="row1">
              <MonthChart input={input} />
              <PackageInfo
                stars={packageInfo.collected.github.starsCount}
                forks={packageInfo.collected.github.forksCount}
                issues={packageInfo.collected.github.issues.openCount}
                contributors={packageInfo.collected.github.contributors.length}
                maintainers={packageInfo.collected.metadata.maintainers.length}
              />
            </div>
            <div className="row2">
              <Readme repo={packageInfo.collected.metadata.links.repository.split('/')[4]} owner={packageInfo.collected.metadata.links.repository.split('/')[3]} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Main;
