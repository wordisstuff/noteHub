import Modal from '@/components/Modal/Modal';
import NoteForm from '@/components/NoteForm/NoteForm';

export default async function NoteModal() {
    // const product = await fetchProduct(Number(id));
    console.log('123');
    return (
        <Modal>
            <NoteForm />
        </Modal>
    );
}
