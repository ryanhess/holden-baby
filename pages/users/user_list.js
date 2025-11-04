import Link from 'next/link';
import Layout from '@/components/layout'
import routes from '@/components/routes'

export default function UsersList({ users }) {
  return (
    <Layout title="Users List">
      <h1>Users List</h1>
      <ul>
        {users.map(user => <li><Link href={"/"}>{user.username}</Link></li>)}
      </ul>
      <p><Link href={routes.profileEdit}>Edit Profile</Link></p>
    </Layout >
  );
}

export async function getServerSideProps() {
  // get things from the database here.
  return {
    props: {
      users: [{
        id: 1,
        username: 'ryan'
      },]
    }
  }
}