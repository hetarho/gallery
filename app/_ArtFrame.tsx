export default function ArtFrame({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) {
  return (
    <div className="relative h-60 w-full overflow-hidden rounded-xl sm:w-96">
      {children}
      <div
        className="absolute top-0 h-full w-full"
        style={{
          background:
            'linear-gradient(0deg, #000000A0, transparent,transparent)',
        }}
      ></div>
      <div className="absolute bottom-4 left-4 select-none text-4xl font-bold text-white">
        {title}
      </div>
    </div>
  );
}
