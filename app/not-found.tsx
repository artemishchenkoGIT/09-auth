import { Metadata } from 'next';
import NotFoundClient from './not-found.client';
import { SITE_META_URL } from '@/utils/consts';

export const metadata: Metadata = {
  title: '404 - Page not found | NoteHub',
  description: 'This page does not exist or has been moved.',
  openGraph: {
    title: '404 - Page not found | NoteHub',
    description: 'This page does not exist or has been moved.',
    url: SITE_META_URL,
    siteName: 'NoteHub',
    images: [
      {
        url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
        width: 1200,
        height: 630,
        alt: '404 - Page not found | NoteHub',
      },
    ],
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: '404 - Page not found | NoteHub',
    description: 'This page does not exist or has been moved.',
    images: ['https://ac.goit.global/fullstack/react/notehub-og-meta.jpg'],
  },
};

const NotFound = () => {
  return <NotFoundClient />;
};

export default NotFound;
