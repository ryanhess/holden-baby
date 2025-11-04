import Link from 'next/link';
import Layout from '@/components/layout'
import routes from '@/components/routes'

export default function Profile({ babyName, birthday }) {
  return (
    <Layout title="Profile">
      <h1>Profile</h1>
      <ul>
        <li>Baby's Name: {babyName}</li>
        <li>{babyName}'s Birthday: {birthday.month}/{birthday.day}/{birthday.year}</li>
      </ul>
      <p><Link href={routes.profileEdit}>Edit Profile</Link></p>
    </Layout >
  );
}

export async function getServerSideProps() {
  // get things from the database here.
  return {
    props: {
      babyName: "Holden Forest Hess",
      birthday: {
        month: 10,
        day: 19,
        year: 2025
      }
    }
  }
}