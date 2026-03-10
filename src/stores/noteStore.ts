import { Note, Tag } from '@/types/note';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface NoteStore {
    note: Note;
    setNote: (note: Note) => void;
    clearNote: () => void;
}
const initialNote: Note = {
    id: '',
    title: '',
    description: '',
    tag: Tag.Personal,
};

export const useNoteStore = create<NoteStore>()(
    persist(
        set => ({
            note: initialNote,
            setNote: note => set({ note }),
            clearNote: () => set({ note: initialNote }),
        }),
        {
            name: 'notes-data',
            partialize: state => ({ task: state.note }),
        },
    ),
);
