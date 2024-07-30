import chroma from 'chroma-js';
import { RippleDate } from './Ripple.type';

export class Ripple {
  x: number;
  y: number;
  rippleNum: number;
  frequency: number;
  curr: number;
  width: number;
  height: number;
  speed: number;
  isEnd: boolean = false;
  size: number;
  depth: number;
  color: string;

  constructor(data: RippleDate) {
    const { x, y, width, height, rippleNum, frequency, color, depth } = data;
    this.x = x;
    this.y = y;
    this.rippleNum = rippleNum;
    this.width = width;
    this.height = height;
    this.frequency = frequency;
    this.depth = depth;
    this.color = color;
    this.curr = 0;
    this.speed = 1;
    this.size = frequency;
  }

  draw(ctx: CanvasRenderingContext2D) {
    if (this.isEnd) {
      return;
    }
    this.curr += this.speed;

    const totalAmount = this.frequency * this.rippleNum;

    const maxDistance = Math.sqrt(
      Math.pow(this.width / 2 + Math.abs(this.x - this.width / 2), 2) +
        Math.pow(this.height / 2 + Math.abs(this.y - this.height / 2), 2),
    );

    if (this.curr > maxDistance + totalAmount) {
      this.isEnd = true;
      return;
    }

    const currentRipplesNum =
      this.curr < totalAmount
        ? Math.floor(this.curr / this.frequency) + 1
        : this.rippleNum;

    const globalOpacity = Math.min(1, 255 / this.curr);

    for (let i = 0; i < currentRipplesNum; i++) {
      const radius =
        Math.max(
          this.curr % this.frequency,
          this.curr - totalAmount + this.frequency,
        ) +
        i * this.frequency;

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

      const colorOpacity =
        (globalOpacity * Math.floor(255 * Math.pow(0.9, radius / 10))) / 255;

      gradient.addColorStop(0, chroma(this.color).alpha(0).hex());
      gradient.addColorStop(
        1 / 3,
        chroma(this.color).brighten(this.depth).alpha(colorOpacity).hex(),
      );
      gradient.addColorStop(
        2 / 3,
        chroma(this.color).darken(this.depth).alpha(colorOpacity).hex(),
      );

      gradient.addColorStop(1, chroma(this.color).alpha(0).hex());

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, this.width, this.height);
    }
  }
}
