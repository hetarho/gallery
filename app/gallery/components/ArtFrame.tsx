export default function ArtFrame({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) {
  return (
    <div className="relative h-60 w-full overflow-hidden rounded-xl transition-transform duration-300 hover:scale-105 sm:w-96">
      {children}
      <div
        className="absolute top-0 h-full w-full"
        style={{
          background:
            'linear-gradient(0deg, #000000A0, transparent,transparent)',
        }}
      ></div>
      <div className="absolute bottom-4 left-4 select-none text-2xl font-normal text-white">
        {title}
      </div>
      <div className="absolute bottom-0 left-0 right-0 top-0 bg-white opacity-0 transition-opacity hover:opacity-5"></div>
    </div>
  );
}
