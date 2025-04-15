import Link from 'next/link';

export default function Note() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Link href="/" className="text-4xl font-bold text-white">
        Home
      </Link>
    </div>
  );
}
