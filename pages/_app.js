import dynamic from 'next/dynamic'
import { FacebookAuthProvider } from '../context/FacebookAuthContext'

// global styles are required to be added to `_app.js` per Next.js requirements.
import 'nprogress/nprogress.css'

const TopProgressBar = dynamic(
    () => import('../components/TopProgressBar'),
    { ssr: false }
)

// Inject headers (for local auth state)
export async function getInitialProps({ Component, ctx }) {
    const isServer = typeof window === 'undefined'
    let pageProps = {}
    if (isServer) {
        pageProps.headers = ctx.req.headers
    }
    if (Component.getInitialProps) {
        const compAsyncProps = await Component.getInitialProps(ctx)
        pageProps = { ...pageProps, ...compAsyncProps }
    }
    return { pageProps }
}

function MyApp({ Component, pageProps }) {
    return (
        <FacebookAuthProvider>
            <TopProgressBar />
            <Component {...pageProps} />
        </FacebookAuthProvider>
    )
}

export default MyApp