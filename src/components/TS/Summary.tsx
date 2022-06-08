import React, { useRef, FC } from 'react';
import '../SCSS/Summary.scss';
import copy from "copy-to-clipboard";

interface SummaryProps {
  heading: string;
  version: number;
  description: string;
  license: string;
  npm: string;
  github: string;
  downloads: string;
  keywords: string[];
}

const Summary: FC<SummaryProps> = ({
  heading,
  version,
  description,
  license,
  npm,
  github,
  downloads,
  keywords,
}) => {
  const text = useRef<HTMLDivElement>(null);
  const button = useRef<HTMLButtonElement>(null);

  const handleCopyText = () => {
    copy(text.current!.innerText);
    button.current!.innerText = 'Copied';
    button.current!.style.backgroundColor = 'lightgreen';
    navigator.clipboard.writeText(text.current!.innerText);
    setTimeout(() => {
      button.current!.style.backgroundColor = 'white';
      button.current!.innerText = 'Copy';
    }, 1500);
  }

  return (
    <div className="summary" id="summary">
      <div className="row-1">
        <h1>{heading}</h1>
        <p>v{version}</p>
      </div>
      <p className="description">{description}</p>
      <div className="row-2">
        <p>{license}</p>
        <div className="line"></div>
        <a href={npm}>
          <p>NPM</p>
        </a>
        <div className="line"></div>
        <a href={github}>
          <p>Github</p>
        </a>
      </div>
      <p className="downloads">Total downloads: {downloads}</p>
      <div className="codeBlock">
        <pre>
          <code className="lang-json" id="text" ref={text}>
            npm install {heading}
          </code>
        </pre>
        <button className="copy" onClick={handleCopyText} ref={button}>
          Copy
        </button>
      </div>
      <p className="keywords">Keywords: {keywords}</p>
    </div>
  );
}

export default Summary;
