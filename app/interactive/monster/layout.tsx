import MouseProvider from '@/app/components/ts/MouseProvider';

export default function MonsterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <MouseProvider>{children}</MouseProvider>;
}
