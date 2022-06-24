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

interface ReadmeProps {
    repo: string;
    owner: string;
}

const Readme: FC<ReadmeProps> = ({ owner, repo }) => {
    const [readme, setReadme] = useState('');

    const fetchReadme = async ({ url }: { url: string }) => {
        const response = await fetch(url)
        const data = await response.text();
        if (response.status === 200) {
            setReadme(data);
        }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const fetchURL = async ({ owner, repo }: { owner: string, repo: string }) => {
        const response = await fetch(
            `https://api.github.com/repos/${owner}/${repo}/readme`
        );
        const data = await response.json();
        if (response.status === 200) {
            fetchReadme({ url: data.download_url });
        }
        else {
            setReadme('No README.md found');
        }
    };

    useEffect(() => {
        fetchURL({ owner, repo });
    }, [fetchURL, owner, repo]);

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