'use client';

import { useRouter } from 'next/navigation';
import css from './Modal.module.css';

interface Props {
    children: React.ReactNode;
}

export default function Modal({ children }: Props) {
    const router = useRouter();

    const handleClick = () => {
        router.back();
    };

    return (
        <div onClick={handleClick} className={css.backdrop}>
            <div className={css.modal}>
                {children}
                <button onClick={handleClick} className={css.closeBtn}>
                    X
                </button>
            </div>
        </div>
    );
}
