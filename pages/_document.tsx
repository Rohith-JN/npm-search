import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
    return (
        <Html lang="en">
            <Head>
                <meta name="description" content="A site to view and compare npm-package statistics" />
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}