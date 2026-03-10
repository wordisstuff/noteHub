export default function NotesLayout({
    children,
    modal,
    // params,
}: Readonly<{
    children: React.ReactNode;
    modal: React.ReactNode;
    // params: { slug?: string };
}>) {
    return (
        <div>
            {children}
            {modal}
        </div>
    );
}
