const fetchPackageInfo = async ({ input, setLoading, setError, setPackageInfo }: { input: string, setLoading: any, setError: any, setPackageInfo: any }) => {
    setLoading(true);
    const response = await fetch(`/packages?package=${input}`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        }
    });
    const data = await response.json();

    if (data.error) {
        setError({
            error: true,
            errorMessage: data.errorMessage,
            errorCode: data.errorCode,
        });
    }
    else {
        setPackageInfo(data);
    }
    setLoading(false);
};

const fetchMonthChart = async ({ input, setError, setChartData }: { input: string, setError: any, setChartData: any }) => {
    const response = await fetch(`/charts?chart=month&package=${input}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }
    });
    const data = await response.json();
    if (data.error) {
      setError({
        error: true,
        errorMessage: data.errorMessage,
        errorCode: data.errorCode,
      });
    }
    else {
      setChartData({
        labels: data.downloads.map((item: any) => String(item.day).slice(-2)),
        data: data.downloads.map((item: any) => item.downloads),
      });
    }
};

const fetchReadme = async ({ url, setReadme }: { url: string, setReadme: any }) => {
    const response = await fetch(url)
    const data = await response.text();
    if (response.status === 200) {
        setReadme(data);
    }
}

// eslint-disable-next-line react-hooks/exhaustive-deps
const fetchURL = async ({ owner, repo, setUrl, url, setReadme } : { owner: string, repo: string, setUrl: any, url: any, setReadme: any }) => {
    const response = await fetch(
        `https://api.github.com/repos/${owner}/${repo}/readme`
    );
    const data = await response.json();
    setUrl(data.download_url);
    if (response.status === 200) {
        fetchReadme(url);
    }
    else {
        setReadme('No README.md found');
    }
};

const fetchWeekChart = async ({input, setError, setChartData} : {input: string, setError: any, setChartData: any}) => {
    const response = await fetch(
      `/charts?chart=week&package=${input}`
    );
    const data = await response.json();
    if (data.error) {
      setError({
        error: true,
        errorMessage: data.errorMessage,
        errorCode: data.errorCode,
      });
    }
    else {
      setChartData({
        labels: data.downloads.map((item: any) => item.day),
        data: data.downloads.map((item: any) => item.downloads),
      });
    }
  };

export { fetchPackageInfo, fetchMonthChart, fetchReadme, fetchURL, fetchWeekChart };