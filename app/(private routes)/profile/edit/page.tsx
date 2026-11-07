import ProfileEditClient from './ProfileEdit.client';
import { Metadata } from 'next';
import { SITE_META_URL } from '@/utils/consts';

const title = 'Edit Profile | NoteHub';
const description =
  'Update your personal information and manage your NoteHub account details.';

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    url: `${SITE_META_URL}/profile/edit`,
    siteName: 'NoteHub',
    images: [
      {
        url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
        width: 1200,
        height: 630,
        alt: 'NoteHub',
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

const Profile = () => {
  return <ProfileEditClient />;
};

export default Profile;
