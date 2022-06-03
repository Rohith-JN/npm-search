import React, { useState, useEffect } from 'react';
import './main.scss';
import Summary from '../summary/Summary';
import Loader from '../loader/Loader';
import Error from '../Error/Error';

function Main({ input }) {
  const [packageInfo, setPackageInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchPackageInfo = async (input) => {
    setLoading(true);
    const response = await fetch(`https://api.npms.io/v2/package/${input}`);
    const data = await response.json();
    if (response.status === 200) {
      setError(false);
    } else {
      setError(true);
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
          {error ? (
            <Error />
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
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Main;
