'use client';

import { useSearchStore } from '@/stores/serchStore';

export default function SearchInput() {
    const { search, setSearch, clearSearch } = useSearchStore();

    return (
        <div>
            <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search notes..."
            />

            {search && (
                <button type="button" onClick={clearSearch}>
                    refresh
                </button>
            )}
        </div>
    );
}
