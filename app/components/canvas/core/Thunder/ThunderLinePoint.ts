export class ThunderLinePoint {
  constructor(
    public x: number,
    public y: number,
    cos?: number,
    sin?: number,
  ) {
    this.standardX = x;
    this.standardY = y;
    this.cos = cos ?? 1;
    this.sin = sin ?? 0;
    this.cur = x * y;
    this.speed = (Math.random() * 15 + 4) / 100;
  }

  sin: number;
  cos: number;
  cur: number;
  speed: number;
  max = Math.random() * 5 + 5;
  standardY: number;
  standardX: number;

  update() {
    this.cur += this.speed;
    this.x = this.standardX + Math.sin(this.cur) * this.max * this.sin;
    this.y = this.standardY + Math.sin(this.cur) * this.max * this.cos;
  }
}
