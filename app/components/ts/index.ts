import { CSSProperties } from 'react';
import { Point, Size } from './types';
import {
  getDistance,
  getRectCenter,
  getRectSize,
  getTriangleFunc,
} from './utils';

class AnimationTarget {
  private point: Point;
  private size: Size;
  style: CSSProperties;

  constructor(rect: DOMRect) {
    this.point = getRectCenter(rect);
    this.size = getRectSize(rect);
    this.style = {};
  }

  follow({ point }: { point: Point }) {
    const newPosX = point.x - this.point.x;
    const newPosY = point.y - this.point.y;

    this.style = {
      transform: `translate(${newPosX}px, ${newPosY}px)`,
    };
  }

  forward({ point, force }: { point: Point; force: number }) {
    const { sin, cos } = getTriangleFunc(this.point, point);

    const distance = Math.max(getDistance(this.point, point), 1);

    const logForce = Math.log(distance) / Math.log(force);

    const newPosX = logForce * cos;
    const newPosY = logForce * sin;

    this.style = {
      transform: `translate(${newPosX}px, ${newPosY}px)`,
    };
  }

  avoid({ point, force }: { point: Point; force: number }) {
    const { sin, cos } = getTriangleFunc(this.point, point);

    const sizeAvg = Math.sqrt(this.size.width * this.size.height) ** force;

    const distance = Math.max(
      getDistance(this.point, point),
      Math.sqrt(sizeAvg),
    );

    const logForce = sizeAvg / distance;

    const newPosX = -logForce * cos;
    const newPosY = -logForce * sin;

    this.style = {
      transform: `translate(${newPosX}px, ${newPosY}px)`,
    };
  }

  rotate({ point }: { point: Point }) {
    const { degree } = getTriangleFunc(point, this.point);

    this.style = {
      transform: `rotate(${degree}deg)`,
    };
  }

  scaleByPoint({ point, force }: { point: Point; force: number }) {
    const distance = getDistance(this.point, point);
    const logForce = Math.log(distance) / Math.log(force);
    const sizeAvg = Math.sqrt(this.size.width * this.size.height) ** force;
    const scale = sizeAvg / (sizeAvg + logForce);

    this.style = {
      transform: `scale(${scale})`,
    };
  }

  scaleXByPoint({ point, force }: { point: Point; force: number }) {
    const distance = getDistance(this.point, point);
    const logForce = Math.max(Math.log(distance) / Math.log(force), 1);
    const sizeAvg = Math.sqrt(this.size.width * this.size.height) ** force;
    const scale = sizeAvg / (sizeAvg + logForce);

    this.style = {
      transform: `scaleX(${scale})`,
    };
  }

  scaleYByPoint({ point, force }: { point: Point; force: number }) {
    const distance = getDistance(this.point, point);
    const logForce = Math.log(distance) / Math.log(force);
    const sizeAvg = Math.sqrt(this.size.width * this.size.height) ** force;
    const scale = sizeAvg / (sizeAvg + logForce);

    this.style = {
      transform: `scaleY(${scale})`,
    };
  }
}

export default AnimationTarget;
