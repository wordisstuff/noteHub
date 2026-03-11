import NoteDetails from '@/components/NoteDetails/NoteDetails';

interface Props {
    params: Promise<{ id: string }>;
}
export default async function Note({ params }: Props) {
    const { id } = await params;

    return <NoteDetails id={id} />;
}
