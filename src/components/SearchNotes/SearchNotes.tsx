'use client';

import { useSearchStore } from '@/stores/serchStore';
import css from './SearchNotes.module.css';
import { FcRefresh } from 'react-icons/fc';

export default function SearchInput() {
    const { search, setSearch, clearSearch } = useSearchStore();

    return (
        <div className={css.search}>
            <input
                className={css.input}
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search notes..."
            />

            {search && (
                <button
                    className={css.refresh}
                    type="button"
                    onClick={clearSearch}
                >
                    <FcRefresh size={'32px'} />
                </button>
            )}
        </div>
    );
}
