import type { Metadata } from 'next';
import { SITE_META_URL } from '@/utils/consts';
import SignInClient from './signIn.client';

const title = 'Sign In | NoteHub';
const description =
  'Sign in to your NoteHub account to access, organize, and manage your notes.';

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    url: SITE_META_URL,
    siteName: title,
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

function SignUp() {
  return <SignInClient />;
}

export default SignUp;
