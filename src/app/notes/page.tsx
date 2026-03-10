import NoteList from '@/components/NoteList/NoteList';
import { getNotes } from '@/lib/api/noteApi';
import {
    dehydrate,
    HydrationBoundary,
    QueryClient,
} from '@tanstack/react-query';

export default async function Posts() {
    const queryClient = new QueryClient();
    await queryClient.prefetchQuery({
        queryKey: ['notes'],
        queryFn: getNotes,
    });
    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <NoteList />
        </HydrationBoundary>
    );
}
