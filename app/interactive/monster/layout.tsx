import MouseProvider from '@/app/components/ts/provider';

export default function MonsterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <MouseProvider>{children}</MouseProvider>;
}
