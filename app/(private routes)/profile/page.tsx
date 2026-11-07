import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from '@tanstack/react-query';
import { getMe } from '@/lib/api/serverApi';
import ProfileClient from './Profile.client';
import { Metadata } from 'next';
import { SITE_META_URL } from '@/utils/consts';

const title = 'Profile | NoteHub';
const description =
  'View and manage your NoteHub profile, update your personal information, and manage your account settings.';

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    url: `${SITE_META_URL}/notes/action/create`,
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
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['user'],
    queryFn: () => getMe(),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProfileClient />
    </HydrationBoundary>
  );
};

export default Profile;
