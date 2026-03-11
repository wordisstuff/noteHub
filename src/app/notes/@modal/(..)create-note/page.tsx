import Modal from '@/components/Modal/Modal';
import NoteForm from '@/components/NoteForm/NoteForm';

export default async function NoteModal() {
    return (
        <Modal>
            <NoteForm />
        </Modal>
    );
}
