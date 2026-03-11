import { Note, NoteFormValues, UpdateNoteValues } from '@/types/note';
import axios from 'axios';

const notesUrl = 'https://67a4109531d0d3a6b7854249.mockapi.io/tasks';
export const getNotes = async () => {
    const { data } = await axios.get(notesUrl);
    return data;
};

export const createNote = async (note: NoteFormValues): Promise<Note> => {
    const payload = {
        ...note,
        tag: note.tag === '' ? null : note.tag,
    };

    const { data } = await axios.post(notesUrl, payload);
    return data;
};

export const updateNote = async (note: UpdateNoteValues): Promise<Note> => {
    const payload = {
        title: note.title,
        description: note.description,
        tag: note.tag === '' ? null : note.tag,
    };

    const { data } = await axios.put(`${notesUrl}/${note.id}`, payload);
    return data;
};

export const deleteNote = async (id: Note['id']) => {
    const { data } = await axios.delete(`${notesUrl}/${id}`);
    return data;
};

export const getNote = async (id: Note['id']) => {
    console.log(id);
    const { data } = await axios.get(`${notesUrl}/${id}`);
    return data;
};
