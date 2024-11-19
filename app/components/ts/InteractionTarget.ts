import { Point, Size } from './types';
import { getDistance, getRectSize, getTriangleFunc } from './utils';
import { getRectCenter } from './utils';

class InteractionTarget {
  private point: Point;
  private size: Size;

  private transform: {
    translateX: string;
    translateY: string;
    rotate: string;
    scaleX: string;
    scaleY: string;
  };

  constructor(rect: DOMRect) {
    this.point = getRectCenter(rect);
    this.size = getRectSize(rect);
    this.transform = {
      translateX: '0',
      translateY: '0',
      rotate: '0',
      scaleX: '1',
      scaleY: '1',
    };
  }

  getTransform() {
    return `translate(${this.transform.translateX}, ${this.transform.translateY}) rotate(${this.transform.rotate}) scaleX(${this.transform.scaleX}) scaleY(${this.transform.scaleY})`;
  }

  follow({ point }: { point: Point }) {
    const newPosX = point.x - this.point.x;
    const newPosY = point.y - this.point.y;

    this.transform.translateX = `${newPosX}px`;
    this.transform.translateY = `${newPosY}px`;
  }

  avoid({ point, force = Math.E }: { point: Point; force: number }) {
    const { sin, cos } = getTriangleFunc(this.point, point);

    const sizeAvg = Math.sqrt(this.size.width * this.size.height) ** force;

    const distance = Math.max(
      getDistance(this.point, point),
      Math.sqrt(sizeAvg),
    );

    const logForce = sizeAvg / distance;

    const newPosX = -logForce * cos;
    const newPosY = -logForce * sin;

    this.transform.translateX = `${newPosX}px`;
    this.transform.translateY = `${newPosY}px`;
  }

  forward({ point, force = Math.E }: { point: Point; force: number }) {
    const { sin, cos } = getTriangleFunc(this.point, point);

    const distance = Math.max(getDistance(this.point, point), 1);

    const logForce = Math.log(distance) / Math.log(force);

    const newPosX = logForce * cos;
    const newPosY = logForce * sin;

    this.transform.translateX = `${newPosX}px`;
    this.transform.translateY = `${newPosY}px`;
  }

  moveVertical({ distance }: { distance: number }) {
    this.transform.translateY = `${-distance}px`;
  }

  moveHorizontal({ distance }: { distance: number }) {
    this.transform.translateX = `${-distance}px`;
  }

  rotate({ degree }: { degree: number }) {
    this.transform.rotate = `${degree}deg`;
  }

  rotateToPoint({ point }: { point: Point }) {
    const { degree } = getTriangleFunc(point, this.point);

    this.transform.rotate = `${degree}deg`;
  }

  scaleByPoint({ point, force = Math.E }: { point: Point; force: number }) {
    const distance = getDistance(this.point, point);
    const logForce = Math.log(distance) / Math.log(force);
    const sizeAvg = Math.sqrt(this.size.width * this.size.height) ** force;
    const scale = sizeAvg / (sizeAvg + logForce);

    this.transform.scaleX = `${scale}`;
    this.transform.scaleY = `${scale}`;
  }

  scaleXByPoint({ point, force }: { point: Point; force: number }) {
    const distance = getDistance(this.point, point);
    const logForce = Math.max(Math.log(distance) / Math.log(force), 1);
    const sizeAvg = Math.sqrt(this.size.width * this.size.height) ** force;
    const scale = sizeAvg / (sizeAvg + logForce);

    this.transform.scaleX = `${scale}`;
  }

  scaleYByPoint({ point, force }: { point: Point; force: number }) {
    const distance = getDistance(this.point, point);
    const logForce = Math.log(distance) / Math.log(force);
    const sizeAvg = Math.sqrt(this.size.width * this.size.height) ** force;
    const scale = sizeAvg / (sizeAvg + logForce);

    this.transform.scaleY = `${scale}`;
  }
}

export default InteractionTarget;
