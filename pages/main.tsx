import React, { useState, useEffect, FC } from 'react';
import styles from '../styles/Main.module.css';
import Summary from '../components/Summary';
import Loader from '../components/Loader';
import Error from './error';
import WeekChart from '../components/WeekChart';
import MonthChart from '../components/MonthChart';
import PackageInfo from '../components/PackageInfo';
import Readme from '../components/Readme';
import Head from 'next/head';

interface MainProps {
  input: string;
}

const Main: FC<MainProps> = ({ input }) => {
  const [packageInfo, setPackageInfo]: any = useState(null);
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
        <div className={styles.Main} id="Main">
          {error.error ? (
            <Error
              errorCode={error.errorCode}
              errorMessage={error.errorMessage}
            />
          ) : (
            <div className={styles.main_container}>
              <Head>
                <title>npm_search | {packageInfo.collected.metadata.name}</title>
              </Head>
              <div className={styles.row}>
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
              <div className={styles.row1}>
                <MonthChart input={input} />
                <PackageInfo
                  stars={packageInfo.collected.github.starsCount}
                  forks={packageInfo.collected.github.forksCount}
                  issues={packageInfo.collected.github.issues.openCount}
                  contributors={packageInfo.collected.github.contributors.length}
                  maintainers={packageInfo.collected.metadata.maintainers.length}
                />
              </div>
              <div className={styles.row2}>
                <Readme repo={packageInfo.collected.metadata.links.repository.split('/')[4]} owner={packageInfo.collected.metadata.links.repository.split('/')[3]} />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Main;
