import React, { useState, useEffect, FC } from 'react';
import './main.scss';
import Summary from '../summary/Summary';
import Loader from '../loader/Loader';
import Error from '../error_page/Error';
import LineChart from '../lineChart/LineChart';
import LineChart2 from '../lineChart2/LineChart2';
import PackageInfo from '../Package_info/PackageInfo';
import Readme from '../Readme/Readme';

interface MainProps {
  input: string;
}

const Main: FC<MainProps> = ({ input }) => {
  const [packageInfo, setPackageInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState({
    error: false,
    errorMessage: '',
    errorCode: 200,
  });

  const fetchPackageInfo = async (input: string) => {
    setLoading(true);
    const response = await fetch(`https://api.npms.io/v2/package/${input}`);
    const data = await response.json();
    if (response.status === 200) {
      setError({ error: false, errorMessage: '', errorCode: 200 });
    } else if (response.status !== 200) {
      setError({
        error: true,
        errorMessage: data.message,
        errorCode: response.status,
      });
    } else {
      setError({
        error: true,
        errorMessage: data.message,
        errorCode: response.status,
      });
    }

    setPackageInfo(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchPackageInfo(input);
  }, [input]);

  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <div className="Main" id="Main">
          {error.error ? (
            <Error
              errorCode={error.errorCode}
              errorMessage={error.errorMessage}
            />
          ) : (
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
                <LineChart input={input} />
              </div>
              <div className="row1">
                <LineChart2 input={input} />
                <PackageInfo
                  stars={packageInfo.collected.github.starsCount}
                  forks={packageInfo.collected.github.forksCount}
                  issues={packageInfo.collected.github.issues.openCount}
                  contributors={packageInfo.collected.github.contributors.length}
                  maintainers={packageInfo.collected.metadata.maintainers.length}
                />
              </div>
              <div className="row2">
                <Readme input={input} owner={packageInfo.collected.metadata.links.repository.split('/')[3]} />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Main;
