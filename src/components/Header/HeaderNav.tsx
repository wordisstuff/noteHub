'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLayoutEffect, useRef } from 'react';
import css from './HeaderNav.module.css';
import SearchNotes from '../SearchNotes/SearchNotes';

export default function HeaderNav() {
    const pathname = usePathname();

    const navRef = useRef<HTMLUListElement | null>(null);
    const ballRef = useRef<HTMLSpanElement | null>(null);
    const homeRef = useRef<HTMLAnchorElement | null>(null);
    const notesRef = useRef<HTMLAnchorElement | null>(null);
    const createRef = useRef<HTMLAnchorElement | null>(null);

    const updateBallPosition = () => {
        const ball = ballRef.current;
        if (!ball) return;

        let activeEl: HTMLAnchorElement | null = null;

        if (pathname === '/') activeEl = homeRef.current;
        else if (pathname.startsWith('/notes')) activeEl = notesRef.current;
        else if (pathname.startsWith('/create-note'))
            activeEl = createRef.current;
        else if (pathname.startsWith('/edit-note')) activeEl = notesRef.current;

        if (!activeEl) {
            ball.style.opacity = '0';
            return;
        }

        const left =
            activeEl.offsetLeft +
            activeEl.offsetWidth / 2 -
            ball.offsetWidth / 2;

        const top = activeEl.offsetTop - ball.offsetHeight / 2;

        ball.style.transform = `translate(${left}px, ${top}px)`;
        ball.style.opacity = '1';
    };

    useLayoutEffect(() => {
        const frame = requestAnimationFrame(updateBallPosition);

        const handleResize = () => {
            requestAnimationFrame(updateBallPosition);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            cancelAnimationFrame(frame);
            window.removeEventListener('resize', handleResize);
        };
    }, [pathname]);
    return (
        <ul ref={navRef} className={css.navigation}>
            <span ref={ballRef} className={css.flyingBall} />

            <li>
                <Link
                    ref={homeRef}
                    href="/"
                    className={`${css.link} ${css.home}`}
                >
                    Home
                </Link>
            </li>

            <li>
                <SearchNotes />
            </li>

            <li>
                <Link
                    ref={notesRef}
                    href="/notes"
                    className={`${css.link} ${css.notes}`}
                >
                    Notes
                </Link>
            </li>

            <li>
                <Link
                    ref={createRef}
                    href="/create-note"
                    className={`${css.link} ${css.create}`}
                >
                    Create note +
                </Link>
            </li>
        </ul>
    );
}
