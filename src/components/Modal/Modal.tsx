'use client';

import { useRouter } from 'next/navigation';
import css from './Modal.module.css';

interface Props {
    children: React.ReactNode;
}

export default function Modal({ children }: Props) {
    const router = useRouter();

    const handleBackdropClick = () => {
        router.back();
    };

    const handleModalClick = (e: React.MouseEvent) => {
        e.stopPropagation();
    };
    const handleClick = () => {
        router.back();
    };

    return (
        <div onClick={handleBackdropClick} className={css.backdrop}>
            <div onClick={handleModalClick} className={css.modal}>
                {children}
                <button onClick={handleClick} className={css.closeBtn}>
                    X
                </button>
            </div>
        </div>
    );
}
