import NoteForm from '@/components/NoteForm/NoteForm';
import { Metadata } from 'next';
import { SITE_META_URL } from '@/utils/consts';
import css from './CreateNote.module.css';

const title = 'Create New Note | NoteHub';
const description =
  'Quickly create a new note in NoteHub - the efficient app for organizing your thoughts and ideas.';

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

export default function CreateNote() {
  return (
    <main className={css.main}>
      <div className={css.container}>
        <h1 className={css.title}>Create note</h1>
        <NoteForm />
      </div>
    </main>
  );
}
