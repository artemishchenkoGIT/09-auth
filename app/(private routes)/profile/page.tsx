import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';

import { getMe } from '@/lib/api/serverApi';
import { SITE_META_URL } from '@/utils/consts';

import css from './ProfilePage.module.css';

const title = 'Profile | NoteHub';

const description =
  'View and manage your NoteHub profile, update your personal information, and manage your account settings.';

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    url: `${SITE_META_URL}/profile`,
    siteName: 'NoteHub',
    images: [
      {
        url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
        width: 1200,
        height: 630,
        alt: title,
      },
    ],
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: ['https://ac.goit.global/fullstack/react/notehub-og-meta.jpg'],
  },
};

const Profile = async () => {
  const user = await getMe();

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <div className={css.header}>
          <h1 className={css.formTitle}>Profile Page</h1>

          <Link href="/profile/edit" className={css.editProfileButton}>
            Edit Profile
          </Link>
        </div>

        <div className={css.avatarWrapper}>
          {user.avatar && (
            <Image
              src={user.avatar}
              alt="User Avatar"
              width={120}
              height={120}
              className={css.avatar}
            />
          )}
        </div>

        <div className={css.profileInfo}>
          <p>Username: {user.username}</p>
          <p>Email: {user.email}</p>
        </div>
      </div>
    </main>
  );
};

export default Profile;
