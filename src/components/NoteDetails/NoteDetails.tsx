'use client';

import css from '../../components/NoteList/NoteList.module.css';
import cssn from './NoteDetails.module.css';
import { getNote } from '@/lib/api/noteApi';
import { Note, Tag } from '@/types/note';
import Link from 'next/link';
import DeleteNote from '@/components/DeleteNote/DeleteNote';
import { useQuery } from '@tanstack/react-query';
import { DotLoader } from 'react-spinners';
import { useRouter } from 'next/navigation';

interface Props {
    id: Note['id'];
    initialNote?: Note;
}
export default function NoteDetails({ id, initialNote }: Props) {
    const router = useRouter();
    const { data: note, isLoading } = useQuery({
        queryKey: ['note', id],
        queryFn: () => getNote(id),
        initialData: initialNote,
    });

    if (isLoading) {
        return (
            <div
                style={{
                    backgroundColor: 'transparent',
                    height: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <DotLoader size={160} color="#36f739" />
            </div>
        );
    }

    const handleEdit = (e: React.MouseEvent) => {
        e.stopPropagation();
        router.push(`/edit-note/${note.id}`);
    };

    return (
        <div className={cssn.container}>
            <div className={css.item}>
                <div className={css.header}>
                    <h2 className={css.title}>{note.title}</h2>
                </div>
                <p className={css.content}>{note.description}</p>
                <p className={css.tag}>
                    {Object.values(Tag).includes(note.tag)
                        ? [note.tag]
                        : 'No tag'}
                </p>
                <div className={css.actions} onClick={e => e.stopPropagation()}>
                    <button onClick={handleEdit} className={css.edit}>
                        Edit
                    </button>
                    <DeleteNote id={note.id} />
                </div>
            </div>
        </div>
    );
}
