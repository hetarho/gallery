/**
 * 특정 지점을 나타내는 타입
 */
type Point = {
  x: number;
  y: number;
};

/**
 * 특정 영역의 크기를 나타내는 타입
 */
type Size = {
  width: number;
  height: number;
};

class PointWithGravity {
  force: number;
  private forceX: number;
  private forceY: number;
  time: number = 0;
  gravity: number;

  constructor(force: number, degree: number, gravity: number = 9.8) {
    const _degree = (degree * Math.PI) / 180;
    this.force = force;
    this.forceX = force * Math.cos(_degree);
    this.forceY = force * Math.sin(_degree);
    this.gravity = gravity;
  }

  update() {
    this.time += 1;
  }

  get point() {
    return {
      x: this.forceX * this.time,
      y: this.forceY * this.time - 0.5 * this.gravity * this.time * this.time,
    };
  }

  reset() {
    this.time = 0;
  }
}

export type { Point, Size };
export { PointWithGravity };
