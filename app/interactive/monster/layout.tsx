import MouseProvider from '@/app/components/tsx/Mouse/provider';

export default function MonsterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <MouseProvider>{children}</MouseProvider>;
}
