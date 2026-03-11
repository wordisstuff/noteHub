import { NoteFormValues, Tag } from '@/types/note';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface NoteStore {
    draft: NoteFormValues;
    editNote: NoteFormValues;

    setDraft: (patch: Partial<NoteFormValues>) => void;
    clearDraft: () => void;

    setEditNote: (note: NoteFormValues) => void;
    patchEditNote: (patch: Partial<NoteFormValues>) => void;
    clearEditNote: () => void;
}
const initialForm: NoteFormValues = {
    title: '',
    description: '',
    tag: Tag.Personal,
};

export const useNoteStore = create<NoteStore>()(
    persist(
        set => ({
            draft: initialForm,
            editNote: initialForm,

            setDraft: patch =>
                set(state => ({ draft: { ...state.draft, ...patch } })),

            clearDraft: () => set({ draft: initialForm }),

            setEditNote: editNote => set({ editNote }),

            patchEditNote: patch =>
                set(state => ({
                    editNote: { ...state.editNote, ...patch },
                })),
            clearEditNote: () => set({ editNote: initialForm }),
        }),
        {
            name: 'note-draft-storage',
            storage: createJSONStorage(() => localStorage),
            partialize: state => ({
                draft: state.draft,
            }),
        },
    ),
);
