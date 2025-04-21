import { useState } from 'react';
import clsx from 'clsx';
import { Pops } from './Pop';

type PopCard = {
  content: React.ReactNode;
  popCount: number;
  pops: React.ReactNode[];
};

type PopCardProps = {
  delay: number;
  cards: PopCard[];
  width: number;
  height: number;
  visibleSideWidth?: number;
  gap?: number;
};

const PopCard = ({
  delay,
  cards,
  width,
  height,
  visibleSideWidth = 30,
  gap = 16,
}: PopCardProps) => {
  const [cardIndex, setCardIndex] = useState(0);

  const handlePrev = () => {
    if (cardIndex === 0) return;
    setCardIndex((prev) => prev - 1);
  };

  const handleNext = () => {
    if (cardIndex === 5) return;
    setCardIndex((prev) => prev + 1);
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <div className="relative flex items-center justify-center gap-4">
        <div
          className="hidden cursor-pointer select-none text-2xl font-bold text-black sm:block"
          onClick={handlePrev}
        >
          prev
        </div>
        <div
          className="overflow-hidden drop-shadow-lg"
          style={{ width, height }}
        >
          <div
            className="flex"
            style={{
              width: `${cards.length * width}px`,
              transition: 'transform 0.5s ease-in-out',
              gap: `${gap}px`,
              transform: `translateX(${
                -cardIndex * (width - visibleSideWidth * 2 - gap) +
                gap +
                visibleSideWidth
              }px)`,
            }}
          >
            {cards.map((card, index) => (
              <PopCardContainer
                key={index}
                width={width - visibleSideWidth * 2 - gap * 2}
                height={height}
              >
                {card.content}
              </PopCardContainer>
            ))}
          </div>
        </div>
        <div
          className="hidden cursor-pointer select-none text-2xl font-bold text-black sm:block"
          onClick={handleNext}
        >
          next
        </div>
        {cards.map((card, index) => (
          <Pops
            key={`${index}`}
            isActive={cardIndex === index}
            count={card.popCount}
            delay={delay}
            pops={card.pops}
          />
        ))}
      </div>
      <div className="relative mt-4 flex items-center justify-center gap-12">
        <div
          className="block cursor-pointer select-none text-2xl font-bold text-black sm:hidden"
          onClick={handlePrev}
        >
          prev
        </div>
        <div
          className="block cursor-pointer select-none text-2xl font-bold text-black sm:hidden"
          onClick={handleNext}
        >
          next
        </div>
      </div>
    </div>
  );
};

const PopCardContainer = ({
  children,
  className,
  style,
  width,
  height,
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  width: number;
  height: number;
}) => {
  return (
    <div
      className={clsx(
        'relative flex items-center justify-center overflow-visible rounded-3xl bg-white',
        className,
      )}
      style={{
        ...style,
        width,
        height,
      }}
    >
      {children}
    </div>
  );
};

export default PopCard;
