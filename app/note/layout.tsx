import NoteHeader from './_components/NoteHeader';

export default function NoteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col">
      <NoteHeader />
      {children}
    </div>
  );
}
