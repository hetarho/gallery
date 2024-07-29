import { ColorStop, RippleDate } from './Ripple.type';

export class Ripple {
  x: number;
  y: number;
  rippleNum: number;
  frequency: number;
  curr: number;
  width: number;
  height: number;
  speed: number;
  delay: number;
  size: number;
  startDelay: number;
  bgColor: string;
  colors: ColorStop[];

  constructor(data: RippleDate) {
    const {
      x,
      y,
      width,
      height,
      rippleNum,
      frequency,
      bgColor,
      delay,
      colors,
      startDelay,
    } = data;
    this.x = x;
    this.y = y;
    this.rippleNum = rippleNum;
    this.width = width;
    this.height = height;
    this.frequency = frequency;
    this.delay = delay;
    this.startDelay = startDelay;
    this.colors = colors;
    this.bgColor = bgColor;
    this.curr = Math.random() + 1;
    this.speed = Math.random() * 0.4 + 0.2;
    this.size = Math.random() * 30 + 30;
  }

  draw(ctx: CanvasRenderingContext2D) {
    if (this.startDelay > 0) {
      this.startDelay -= this.speed;
      return;
    }
    this.curr += this.speed;

    const totalAmount = this.frequency * this.rippleNum + this.delay;

    const maxDistance = Math.sqrt(
      Math.pow(this.width / 2 + Math.abs(this.x - this.width / 2), 2) +
        Math.pow(this.height / 2 + Math.abs(this.y - this.height / 2), 2),
    );

    const curr =
      this.curr <= maxDistance + totalAmount
        ? this.curr
        : maxDistance + ((this.curr - maxDistance - totalAmount) % totalAmount);

    const rippleNum =
      Math.floor(curr / totalAmount) * this.rippleNum +
      Math.min(curr % totalAmount, this.frequency * this.rippleNum) /
        this.frequency;

    for (let i = 0; i < rippleNum; i++) {
      const radius =
        curr - i * this.frequency - Math.floor(i / this.rippleNum) * this.delay;

      const gradient = ctx.createRadialGradient(
        this.x,
        this.y,
        radius,
        this.x,
        this.y,
        radius +
          (this.size * (radius * 5 + (maxDistance + totalAmount))) /
            (maxDistance + totalAmount),
      );

      const colorOpacity = Math.floor(200 * Math.pow(0.9, radius / 10));

      gradient.addColorStop(0, this.bgColor + '00');
      this.colors.forEach(({ color, stop }) => {
        gradient.addColorStop(
          stop,
          color + colorOpacity.toString(16).padStart(2, '0'),
        );
      });
      gradient.addColorStop(1, this.bgColor + '00');

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, this.width, this.height);
    }
  }
}
