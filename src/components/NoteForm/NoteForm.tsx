'use client';

import { createNote, updateNote } from '@/lib/api/noteApi';
import { Note, NoteFormValues, Tag } from '@/types/note';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import css from './NoteForm.module.css';
import { useNoteStore } from '@/stores/noteStore';
import { useEffect, useMemo } from 'react';

type NoteFormProps = {
    id?: Note['id'];
};

export default function NoteForm({ id }: NoteFormProps) {
    const router = useRouter();
    const queryClient = useQueryClient();

    const {
        draft,
        editNote,
        setDraft,
        clearDraft,
        setEditNote,
        patchEditNote,
        clearEditNote,
    } = useNoteStore();

    const editMode = id !== undefined && id;

    const notes = useMemo(() => {
        if (!editMode) return;
        return queryClient.getQueryData<Note[]>(['notes']) ?? [];
    }, [queryClient, editMode]);

    const editNoteValue = useMemo(() => {
        if (!editMode) return;
        return notes?.find(item => item.id === id);
    }, [editMode, id, notes]);

    useEffect(() => {
        if (!editMode) {
            clearEditNote();
            return;
        }
        if (editNoteValue) {
            setEditNote(editNoteValue);
        }
        return () => {
            clearEditNote();
        };
    }, [id, notes, editMode, setEditNote, clearEditNote, editNoteValue]);

    const currentValue = editMode ? editNote : draft;

    const { mutate, isPending } = useMutation<Note, Error, NoteFormValues>({
        mutationFn: async values => {
            if (editMode) {
                return updateNote({
                    ...values,
                    id,
                });
            }
            return createNote(values);
        },
        async onSuccess() {
            await queryClient.invalidateQueries({ queryKey: ['notes'] });
            await queryClient.invalidateQueries({ queryKey: ['note', id] });
            if (editMode) {
                clearEditNote();
            } else {
                clearDraft();
            }
            router.back();
            router.refresh();
        },
    });

    const handleChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >,
    ) => {
        const { name, value } = e.target;

        if (editMode) {
            patchEditNote({ [name]: value } as Partial<NoteFormValues>);
            return;
        }
        setDraft({ [name]: value } as Partial<NoteFormValues>);
    };

    const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        mutate(currentValue);
    };

    const handleCancel = () => {
        router.back();
    };

    const handleDiscardDraft = () => {
        clearDraft();
    };

    const hasDraftContent =
        draft.title.trim() !== '' || draft.description.trim() !== '';
    return (
        <form className={css.form} onSubmit={handleSubmit}>
            <div className={css.formGroup}>
                <label htmlFor="title">Title</label>
                <input
                    id="title"
                    name="title"
                    type="text"
                    value={currentValue.title}
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
                    value={currentValue.description}
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
                    value={currentValue.tag}
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
                    onClick={handleCancel}
                    type="button"
                    className={css.cancelButton}
                >
                    Cancel
                </button>
                {!editMode && hasDraftContent && (
                    <button
                        onClick={handleDiscardDraft}
                        type="button"
                        className={css.discardButton}
                        disabled={!hasDraftContent}
                    >
                        Discard
                    </button>
                )}
                <button
                    type="submit"
                    className={css.submitButton}
                    disabled={isPending}
                >
                    {isPending
                        ? !editMode
                            ? 'Creating...'
                            : 'Saving...'
                        : editMode
                          ? 'Save'
                          : 'Create'}
                </button>
            </div>
        </form>
    );
}
