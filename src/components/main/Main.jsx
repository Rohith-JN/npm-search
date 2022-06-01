import React from 'react';
import './main.scss';
import Summary from '../summary/Summary';
import Package from '../Package_info/Package';
import Loader from '../loader/Loader';

class Main extends React.Component {
  state = {
    loading: true,
    heading: null,
    version: null,
    description: null,
    keywords: null,
    license: null,
    npm: null,
    github: null,
    downloads: null,
  };

  async componentDidMount() {
    const url = 'https://api.npms.io/v2/package/react';
    const response = await fetch(url);
    const data = await response.json();
    this.setState({
      heading: data.collected.metadata.name,
      version: data.collected.metadata.version,
      description: data.collected.metadata.description,
      keywords: data.collected.metadata.keywords.join(', '),
      license: data.collected.metadata.license,
      npm: data.collected.metadata.links.npm,
      github: data.collected.metadata.links.repository,
      downloads: Math.trunc(
        data.evaluation.popularity.downloadsCount
      ).toLocaleString(),
      loading: false,
    });
  }

  render() {
    const obj = {
      heading: this.state.heading,
      version: this.state.version,
      description: this.state.description,
      license: this.state.license,
      npm: this.state.npm,
      github: this.state.github,
      downloads: this.state.downloads,
      keywords: this.state.keywords,
    };

    return (
      <div>
        {this.state.loading ? (
          <Loader />
        ) : (
          <div className="Main" id="Main">
            <div className="row">
              <Summary {...obj} />
              <Package />
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default Main;
