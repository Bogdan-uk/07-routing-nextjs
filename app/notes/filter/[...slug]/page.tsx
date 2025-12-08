import { QueryClient, dehydrate } from '@tanstack/react-query';
import { HydrationBoundary } from '@tanstack/react-query';
import { fetchNotes } from '@/lib/api';
import { NotesByTagNameClient } from './Notes.client';

type Props = {
  params: Promise<{ slug: string[] }>;
};

export default async function Page({ params }: Props) {
  const initialPage = 1;
  const initialSearch = '';

  const { slug } = await params;
  const tagName = slug[0] === 'all' ? undefined : slug[0];

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['notes', tagName, initialSearch, initialPage],
    queryFn: () => fetchNotes(initialPage, initialSearch, tagName),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesByTagNameClient tagName={tagName} />
    </HydrationBoundary>
  );
}
// registr не виправляє ***** цей Гіт
