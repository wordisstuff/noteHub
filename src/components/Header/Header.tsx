import Link from 'next/link';
import css from './Header.module.css';
import SearchNotes from '../SearchNotes/SearchNotes';

export default async function Header() {
    return (
        <header className={css.header}>
            <ul className={css.navigation}>
                <li className={css.home}>
                    <Link href="/">Home</Link>
                </li>
                <SearchNotes />
                <li>
                    <Link href="/notes">Notes</Link>
                </li>

                <li className={css.create}>
                    <Link
                        href="/create-note
                    "
                    >
                        Create note +{' '}
                    </Link>
                </li>
            </ul>
        </header>
    );
}
