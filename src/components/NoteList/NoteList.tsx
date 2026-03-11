'use client';

import { getNotes } from '@/lib/api/noteApi';
import { useQuery } from '@tanstack/react-query';
import ReactPaginate from 'react-paginate';

import css from './NoteList.module.css';
import { Note, Tag } from '@/types/note';
import { useMemo, useState } from 'react';
import { useSearchStore } from '@/stores/serchStore';
import DeleteNote from '../DeleteNote/DeleteNote';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const ITEMS_PER_PAGE = 9;
const freeTag = 'No tag';
export default function NoteList() {
    const router = useRouter();

    const [currentPage, setCurrentPage] = useState(0);
    const search = useSearchStore(state => state.search);

    const { data = [] } = useQuery<Note[]>({
        queryKey: ['notes'],
        queryFn: getNotes,
        refetchOnMount: false,
    });

    const searchValue = search.trim().toLowerCase();

    const filteredData = useMemo(() => {
        if (searchValue) {
            return data.filter(note =>
                note.title.toLowerCase().includes(searchValue),
            );
        }
        return data;
    }, [data, searchValue]);

    const pageCount = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
    const safePage = Math.min(currentPage, pageCount - 1);

    const currentItems = useMemo(() => {
        const start = safePage * ITEMS_PER_PAGE;
        const end = start + ITEMS_PER_PAGE;
        return filteredData.slice(start, end);
    }, [safePage, filteredData]);

    const handlePageChange = ({ selected }: { selected: number }) => {
        setCurrentPage(selected);
    };

    return (
        <section className={css.container}>
            {pageCount > 1 && (
                <ReactPaginate
                    breakLabel="..."
                    nextLabel=">"
                    previousLabel="<"
                    onPageChange={handlePageChange}
                    pageRangeDisplayed={3}
                    marginPagesDisplayed={1}
                    pageCount={pageCount}
                    forcePage={currentPage}
                    containerClassName={css.pagination}
                    pageClassName={css.pageItem}
                    pageLinkClassName={css.pageLink}
                    previousClassName={css.pageItem}
                    previousLinkClassName={css.pageLink}
                    nextClassName={css.pageItem}
                    nextLinkClassName={css.pageLink}
                    activeClassName={css.active}
                    disabledClassName={css.disabled}
                />
            )}
            <ul className={css.list}>
                {currentItems?.map((item: Note) => (
                    <li key={item.id} className={css.listItem}>
                        <div
                            className={css.item}
                            onClick={e => {
                                e.stopPropagation();
                                router.push(`/note-details/${item.id}`);
                            }}
                        >
                            <div className={css.header}>
                                <h2 className={css.title}>{item.title}</h2>
                            </div>
                            <p className={css.content}>{item.description}</p>
                            <p className={css.tag}>
                                {Object.values(Tag).includes(item.tag)
                                    ? [item.tag]
                                    : freeTag}
                            </p>
                            <div
                                className={css.actions}
                                onClick={e => e.stopPropagation()}
                            >
                                <Link
                                    className={css.edit}
                                    href={`/edit-note/${item.id}`}
                                >
                                    Edit
                                </Link>
                                <DeleteNote id={item.id} />
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </section>
    );
}
