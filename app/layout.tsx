import type { Metadata } from 'next';
import './globals.css';
import Footer from '@/components/Footer/Footer';
import Header from '@/components/Header/Header';
import { Toaster } from 'react-hot-toast';
import TanStackProvider from '@/components/TanStackProvider/TanStackProvider';
import { Roboto } from 'next/font/google';
import { SITE_META_URL } from '@/utils/consts';
import AuthProvider from '@/components/AuthProvider/AuthProvider';

const title = 'NoteHub';
const description =
  'A simple and efficient app for creating and organizing your notes';

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

type RootLayoutProps = {
  readonly children: React.ReactNode;
  readonly modal: React.ReactNode;
};

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-roboto',
  display: 'swap',
});

export default function RootLayout({ children, modal }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className={roboto.variable}>
        <TanStackProvider>
          <Toaster />
          <AuthProvider>
            <Header />
            {children}
            {modal}
            <Footer />
          </AuthProvider>
        </TanStackProvider>
      </body>
    </html>
  );
}
