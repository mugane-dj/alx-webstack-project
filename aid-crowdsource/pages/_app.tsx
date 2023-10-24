
import type { AppProps } from 'next/app'
import { useEffect, useState } from 'react';

function MyApp({ Component, pageProps }: AppProps) {
    const [isMounted, setIsMounted] = useState(false);
    useEffect(() => {
        setIsMounted(true)
    }, [])

    return (
        <>
            {
                isMounted == true ? <Component {...pageProps} /> : <></>
            }
        </>
    );
}

export default MyApp;