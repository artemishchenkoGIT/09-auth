import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import NotesClient from './Notes.client';
import { fetchNotes } from '@/lib/api/clientApi';
import { isNoteTag } from '@/types/guards';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { SITE_META_URL } from '@/utils/consts';

type NotesPageProps = {
  params: Promise<{ slug: string[] }>;
};

export async function generateMetadata({
  params,
}: NotesPageProps): Promise<Metadata> {
  const { slug } = await params;
  const title = `Notes - ${slug[0] === 'all' ? 'All Tags' : slug[0]}`;
  const description = `Browse notes tagged with ${slug[0] === 'all' ? 'all tags' : slug[0]}. NoteHub allows you to filter and view notes based on specific tags better organization.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${SITE_META_URL}/filter/${slug[0]}`,
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
}

const NotesPage = async ({ params }: NotesPageProps) => {
  const queryClient = new QueryClient();

  const { slug } = await params;

  if (slug.length !== 1) {
    notFound();
  }

  const category =
    slug[0] === 'all' || !isNoteTag(slug[0]) ? undefined : slug[0];

  if (category !== undefined && !isNoteTag(category)) {
    notFound();
  }

  await queryClient.prefetchQuery({
    queryKey: ['notes', '', 1, category],
    queryFn: () => fetchNotes('', 1, category),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient tag={category} />
    </HydrationBoundary>
  );
};

export default NotesPage;
