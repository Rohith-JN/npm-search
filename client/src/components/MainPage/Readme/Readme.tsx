import React, { useState, FC, useEffect } from 'react';
import './Readme.scss';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import remarkToc from 'remark-toc';
import rehypeHighlight from 'rehype-highlight';
import remarkSlug from 'remark-slug';
import remarkEmoji from 'remark-emoji';
import remarkMath from 'remark-math';
import { fetchURL } from '../../../services/services';

interface ReadmeProps {
    repo: string;
    owner: string;
}

const Readme: FC<ReadmeProps> = ({ owner, repo }) => {
    const [readme, setReadme] = useState('');

    useEffect(() => {
        fetchURL({ owner, repo, setReadme });
    }, [owner, repo]);

    return (
        <div className='Readme' id='Readme'>
            <ReactMarkdown children={readme} remarkPlugins={[
                remarkGfm,
                remarkMath,
                remarkToc,
                remarkEmoji,
                remarkSlug,
            ]} rehypePlugins={[
                rehypeRaw,
                rehypeHighlight
            ]} />
        </div>
    )
}

export default Readme;