import Modal from '@/components/Modal/Modal';
import { Note } from '@/types/note';
import NoteDetails from '@/components/NoteDetails/NoteDetails';

interface Props {
    params: Promise<{ id: Note['id'] }>;
}
export default async function NotePage({ params }: Props) {
    const { id } = await params;
    return (
        <Modal>
            <NoteDetails id={id} />
        </Modal>
    );
}
