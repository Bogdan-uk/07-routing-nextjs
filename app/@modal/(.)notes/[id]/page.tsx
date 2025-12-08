import { fetchNoteById } from '@/lib/api';

import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import NoteDetailsClientPreview from '@/app/@modal/(.)notes/[id]/NotePreview.client';

type Props = {
  params: Promise<{ id: string }>;
};

const NoteDetailsPreview = async ({ params }: Props) => {
  const { id } = await params;

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailsClientPreview />
    </HydrationBoundary>
  );
};

export default NoteDetailsPreview;
