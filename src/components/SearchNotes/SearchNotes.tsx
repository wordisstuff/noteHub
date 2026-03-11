'use client';

import { useSearchStore } from '@/stores/serchStore';
import css from './SearchNotes.module.css';
import { FcRefresh } from 'react-icons/fc';
import { useRouter } from 'next/navigation';
export default function SearchInput() {
    const router = useRouter();

    const { search, setSearch, clearSearch } = useSearchStore();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
        if (e.target.value !== '') {
            router.push('/notes');
        }
    };

    return (
        <div className={css.search}>
            <input
                className={css.input}
                type="text"
                value={search}
                onChange={handleChange}
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
