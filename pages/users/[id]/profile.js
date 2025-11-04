import Link from 'next/link';
import Layout from '@/components/layout';
import routes from '@/components/routes';
import { useRouter } from 'next/router';

export default function UserProfile({ babyName, birthday }) {
  const router = useRouter();
  const { id: userID } = router.query;


  return (
    <Layout title="Profile">
      <h1>Profile for {userID}</h1>
      <ul>
        <li>Baby's Name: {babyName}</li>
        <li>{babyName}'s Birthday: {birthday.month}/{birthday.day}/{birthday.year}</li>
      </ul>
      <p><Link href={routes.profileEdit}>Edit Profile</Link></p>
    </Layout >
  );
}

export async function getServerSideProps() {
  // get data from the database here.
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