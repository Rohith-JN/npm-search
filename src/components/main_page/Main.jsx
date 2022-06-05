import React, { useState, useEffect } from 'react';
import './main.scss';
import Summary from '../summary/Summary';
import Loader from '../loader/Loader';
import Error from '../error_page/Error';
import { LineChart } from '../lineChart/LineChart';

function Main({ input }) {
  const [packageInfo, setPackageInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState({
    error: false,
    errorMessage: '',
    errorCode: '',
  });

  const fetchPackageInfo = async (input) => {
    setLoading(true);
    const response = await fetch(`https://api.npms.io/v2/package/${input}`);
    const data = await response.json();
    if (response.status === 200) {
      setError({ error: false });
    } else if (response.status !== 200) {
      setError({
        error: true,
        errorMessage: data.message,
        errorCode: response.status,
      });
    } else {
      setError({ error: true });
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
                github={packageInfo.collected.metadata.links.homepage}
                downloads={Math.trunc(
                  packageInfo.evaluation.popularity.downloadsCount
                ).toLocaleString()}
                keywords={packageInfo.collected.metadata.keywords.join(', ')}
              />
              <LineChart input={input} />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Main;
