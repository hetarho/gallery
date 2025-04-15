import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Link href="/note" className="text-4xl font-bold text-white">
        Note
      </Link>
      <Link href="/gallery" className="text-4xl font-bold text-white">
        Gallery
      </Link>
    </div>
  );
}
