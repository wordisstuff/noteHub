'use client';

import { deleteNote } from '@/lib/api/noteApi';
import { Note } from '@/types/note';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import css from './DeleteNote.module.css';

interface Props {
    id: Note['id'];
}

export default function DeleteNote({ id }: Props) {
    const queryClient = useQueryClient();

    const { mutate, isPending } = useMutation({
        mutationFn: deleteNote,
        onSuccess() {
            queryClient.invalidateQueries({ queryKey: ['notes'] });
        },
    });

    const handleDelete = () => {
        mutate(id);
    };

    return (
        <button
            type="button"
            className={css.delete}
            onClick={handleDelete}
            disabled={isPending}
        >
            {isPending ? 'Deleting...' : 'Delete'}
        </button>
    );
}
