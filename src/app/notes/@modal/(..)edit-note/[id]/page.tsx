import Modal from '@/components/Modal/Modal';
import NoteForm from '@/components/NoteForm/NoteForm';

type Props = {
    params: Promise<{
        id: string;
    }>;
};

export default async function Page({ params }: Props) {
    const { id } = await params;
    console.log(id);
    return (
        <Modal>
            <NoteForm id={id} />
        </Modal>
    );
}
