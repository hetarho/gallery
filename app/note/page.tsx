import Link from 'next/link';

export default function Note() {
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <Link href="/" className="text-4xl font-bold text-white">
        Home
      </Link>
    </div>
  );
}
