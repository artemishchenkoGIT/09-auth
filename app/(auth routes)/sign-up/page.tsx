import type { Metadata } from 'next';
import { SITE_META_URL } from '@/utils/consts';
import SignUpClient from './SignUp.client';

const title = 'Create an Account | NoteHub';
const description =
  'Create your NoteHub account to organize your notes, manage your ideas, and keep everything in one place.';

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    url: SITE_META_URL,
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

function SignUp() {
  return <SignUpClient />;
}

export default SignUp;
