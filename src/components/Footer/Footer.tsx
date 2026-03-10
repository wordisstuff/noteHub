import css from './Footer.module.css';

export default async function Footer() {
    return (
        <footer className={css.footer}>
            <div className={css.content}>
                <p>
                    © {new Date().getFullYear()} NoteHub. All rights reserved.
                </p>
                <div className={css.wrap}>
                    <p>Developer: your name</p>
                    <p>
                        Contact us:
                        <a href="mailto:support@moliora.us">mOliora</a>
                    </p>
                </div>
            </div>
        </footer>
    );
}
