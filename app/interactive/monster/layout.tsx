import MouseProvider from '@/app/components/react/MouseProvider';

export default function MonsterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <MouseProvider>{children}</MouseProvider>;
}
