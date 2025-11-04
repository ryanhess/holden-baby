import Link from 'next/link';
import Layout from '@/components/layout'
import routes from '@/components/routes'

export default function Home() {
  return (
    <Layout title="Home">
      <h1>Welcome to the Baby App.</h1>
      <ul>
        <li><Link href={routes.ctxTimer}>Contraction Timer</Link></li>
        <li><Link href={routes.profile}>View Profile</Link></li>
      </ul>
    </Layout>
  );
}