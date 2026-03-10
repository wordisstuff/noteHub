export enum Tag {
    Todo = 'Todo',
    Work = 'Work',
    Personal = 'Personal',
    Meeting = 'Meeting',
    Shopping = 'Shopping',
    Other = 'Other',
}

export interface Note {
    id: string;
    title: string;
    description: string;
    tag: Tag;
}

export type NoteFormValues = {
    title: string;
    description: string;
    tag: Tag | '';
};

export type UpdateNoteValues = {
    id: string;
    title: string;
    description: string;
    tag: Tag | '';
};
