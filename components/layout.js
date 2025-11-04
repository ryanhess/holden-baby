import Head from 'next/head';
import Link from 'next/link';
import routes from './routes';

export default function Layout({ children, title }) {
    return (
        <div>
            <Head>
                <title>{title}</title>
            </Head>
            <header className='header'>
                <p>This is the layout header</p>
            </header>
            <main>
                {children}
            </main>
            <footer>
                <p>This is the layout footer.</p>
                <Link href={routes.home}>Back to Home</Link>
            </footer>
        </div>
    );
}