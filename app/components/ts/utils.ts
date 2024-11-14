import { Point, Size } from './types';

function getRectCenter(rect: DOMRect): Point {
  return {
    x: rect.left + rect.width / 2,
    y: rect.top + rect.height / 2,
  };
}

function getRectSize(rect: DOMRect): Size {
  return {
    width: rect.width,
    height: rect.height,
  };
}

function getTriangleFunc(point1: Point, point2: Point) {
  const angle = Math.atan2(point2.y - point1.y, point2.x - point1.x);
  const sin = Math.sin(angle);
  const cos = Math.cos(angle);
  const tan = Math.tan(angle);

  const degree = (angle * 180) / Math.PI;

  return { sin, cos, tan, angle, degree };
}

function getDistance(point1: Point, point2: Point) {
  return Math.sqrt((point2.x - point1.x) ** 2 + (point2.y - point1.y) ** 2);
}

export { getDistance, getRectCenter, getRectSize, getTriangleFunc };
