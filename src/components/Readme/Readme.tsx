import React, { useState, FC, useEffect } from 'react';
import './readme.scss';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';

interface ReadmeProps {
    input: string;
    owner: string;
}

const Readme: FC<ReadmeProps> = ({ owner, input }) => {
    const [branch, setBranch] = useState({
        branch: ''
    });
    const [readme, setReadme] = useState('');

    const fetchReadme = async (owner: string, input: string, branch: string) => {
        const response = await fetch(`https://raw.githubusercontent.com/${owner}/${input}/${branch}/README.md`)
        const data = await response.text();
        if (response.status === 200) {
            setReadme(data);
        }
    }

    const fetchBranch = async (owner: string, input: string) => {
        const response = await fetch(
            `https://api.github.com/repos/${owner}/${input}`
        );
        const data = await response.json();
        setBranch({
            branch: data.default_branch
        });
        if (response.status === 200) {
            fetchReadme(owner, input, branch.branch);
        }
    };

    useEffect(() => {
        fetchBranch(owner, input);
    }, [owner, input]);

    return (
        <div className='Readme' id='Readme'>
            <ReactMarkdown children={readme} remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]} />
        </div>
    )
}

export default Readme;