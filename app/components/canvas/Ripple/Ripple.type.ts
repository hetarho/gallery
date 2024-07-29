export type RippleDate = {
  x: number;
  y: number;
  width: number;
  height: number;
  rippleNum: number;
  frequency: number;
  bgColor: string;
  delay: number;
  colors: ColorStop[];
  startDelay: number;
};

export type ColorStop = {
  color: string;
  stop: number;
};
