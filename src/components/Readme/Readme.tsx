import React, { useState, FC, useEffect } from 'react';
import './readme.scss';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import remarkMdx from 'remark-mdx';
import remarkToc from 'remark-toc';
import rehypeHighlight from 'rehype-highlight';
import remarkSlug from 'remark-slug';
import remarkEmoji from 'remark-emoji';
import remarkMath from 'remark-math';

interface ReadmeProps {
    input: string;
    owner: string;
}

const Readme: FC<ReadmeProps> = ({ owner, input }) => {
    const [url, seturl] = useState('');
    const [readme, setReadme] = useState('');

    const fetchReadme = async (url: string) => {
        const response = await fetch(url)
        const data = await response.text();
        if (response.status === 200) {
            setReadme(data);
        }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const fetchURL = async (owner: string, input: string) => {
        const response = await fetch(
            `https://api.github.com/repos/${owner}/${input}/readme`
        );
        const data = await response.json();
        seturl(data.download_url);
        if (response.status === 200) {
            fetchReadme(url);
        }
        else {
            setReadme('No README.md found');
        }
    };

    useEffect(() => {
        fetchURL(owner, input);
    }, [owner, input, fetchURL]);

    return (
        <div className='Readme' id='Readme'>
            <ReactMarkdown children={readme} remarkPlugins={[
                remarkGfm,
                remarkToc,
                remarkMath,
                remarkMdx,
                remarkEmoji,
                remarkSlug
            ]} rehypePlugins={[
                rehypeRaw,
                rehypeHighlight
            ]} />
        </div>
    )
}

export default Readme;