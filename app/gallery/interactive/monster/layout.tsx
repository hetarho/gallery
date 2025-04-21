import MouseProvider from '@/app/_components/react/MouseProvider';

export default function MonsterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <MouseProvider>{children}</MouseProvider>;
}
