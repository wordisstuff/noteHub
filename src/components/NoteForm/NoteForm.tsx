'use client';

import { createNote, updateNote } from '@/lib/api/noteApi';
import { Note, NoteFormValues, Tag } from '@/types/note';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import css from './NoteForm.module.css';
import { useNoteStore } from '@/stores/noteStore';
import { useEffect } from 'react';

type NoteFormProps = {
    id?: Note['id'];
};

export default function NoteForm({ id }: NoteFormProps) {
    const router = useRouter();
    const { note, clearNote, setNote } = useNoteStore();

    const queryClient = useQueryClient();
    const notes = queryClient.getQueryData<Note[]>(['notes']);
    console.log(notes);
    console.log(typeof id);

    useEffect(() => {
        if (!notes || !id) return;

        const editNote = notes.find(item => item.id === id);
        console.log(editNote);
        if (editNote) {
            setNote(editNote);
        }
    }, [id, notes, setNote]);

    console.log(note);

    const { mutate, isPending } = useMutation<Note, Error, NoteFormValues>({
        mutationFn: async values => {
            if (id) {
                return updateNote({
                    ...values,
                    id: id,
                });
            }
            clearNote();
            return createNote(values);
        },
        async onSuccess() {
            await queryClient.invalidateQueries({ queryKey: ['notes'] });
            clearNote();
            router.back();
        },
    });

    const handleChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >,
    ) => {
        const { name, value } = e.target;
        setNote({ ...note, [name]: value });
    };

    console.log(note);
    const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        mutate(note);
    };

    return (
        <form className={css.form} onSubmit={handleSubmit}>
            <div className={css.formGroup}>
                <label htmlFor="title">Title</label>
                <input
                    id="title"
                    name="title"
                    type="text"
                    value={note.title}
                    onChange={handleChange}
                    className={css.input}
                    required
                />
            </div>

            <div className={css.formGroup}>
                <label htmlFor="description">Content</label>
                <textarea
                    id="description"
                    name="description"
                    rows={8}
                    value={note.description}
                    onChange={handleChange}
                    className={css.textarea}
                    required
                />
            </div>

            <div className={css.formGroup}>
                <label htmlFor="tag">Tag</label>
                <select
                    id="tag"
                    name="tag"
                    value={note.tag}
                    onChange={handleChange}
                    className={css.select}
                >
                    <option value="">No tag</option>
                    {Object.values(Tag).map(tag => (
                        <option key={tag} value={tag}>
                            {tag}
                        </option>
                    ))}
                </select>
            </div>
            <div className={css.actions}>
                <button
                    onClick={router.back}
                    type="button"
                    className={css.cancelButton}
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    className={css.submitButton}
                    disabled={isPending}
                >
                    {isPending
                        ? !id
                            ? 'Creating...'
                            : 'Saving...'
                        : id
                          ? 'Save'
                          : 'Create'}
                </button>
            </div>
        </form>
    );
}
