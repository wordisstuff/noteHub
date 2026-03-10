import NoteForm from '@/components/NoteForm/NoteForm';

type Props = {
    params: Promise<{
        id: string;
    }>;
};
export default async function Create({ params }: Props) {
    const { id } = await params;
    return <NoteForm id={id} />;
}
