import React, { useRef, FC } from 'react';
import styles from '../styles/Summary.module.css';
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
  dependencies: string[];
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
  dependencies
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
    <div className={styles.summary} id="summary">
      <div className={styles.row_1}>
        <h1>{heading}</h1>
        <p>v{version}</p>
      </div>
      <p className={styles.description}>{description}</p>
      <div className={styles.row_2}>
        <p>{license}</p>
        <div className={styles.line}></div>
        <a href={npm}>
          <p>NPM</p>
        </a>
        <div className={styles.line}></div>
        <a href={github}>
          <p>Github</p>
        </a>
      </div>
      <p className={styles.downloads}>Total downloads: {downloads}</p>
      <div className={styles.codeBlock}>
        <pre>
          <code className={styles.lang_json} id="text" ref={text}>
            npm install {heading}
          </code>
        </pre>
        <button className={styles.copy} onClick={handleCopyText} ref={button}>
          Copy
        </button>
      </div>
      <p className={styles.dependencies}>Dependencies: {dependencies}</p>
      <p className={styles.keywords}>Keywords: {keywords}</p>
    </div>
  );
}

export default Summary;
