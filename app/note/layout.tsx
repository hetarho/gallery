import NoteHeader from './_components/NoteHeader';

export default function NoteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen flex-col">
      <NoteHeader />
      <div className="flex-1">{children}</div>
    </div>
  );
}
