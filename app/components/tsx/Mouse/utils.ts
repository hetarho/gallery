import { Position } from './type';

function getTriangleFuncFromRectAndMousePos(rect: DOMRect, mousePos: Position) {
  const rectCenterX = rect.left + rect.width / 2;
  const rectCenterY = rect.top + rect.height / 2;
  const mouseX = mousePos.x;
  const mouseY = mousePos.y;

  const angle = Math.atan2(mouseY - rectCenterY, mouseX - rectCenterX);
  const sin = Math.sin(angle);
  const cos = Math.cos(angle);
  const tan = Math.tan(angle);

  return { sin, cos, tan };
}

function distanceMouseFromRectCenter(rect: DOMRect, mousePos: Position) {
  const rectCenterX = rect.left + rect.width / 2;
  const rectCenterY = rect.top + rect.height / 2;
  const mouseX = mousePos.x;
  const mouseY = mousePos.y;

  return Math.sqrt((mouseX - rectCenterX) ** 2 + (mouseY - rectCenterY) ** 2);
}

export { distanceMouseFromRectCenter, getTriangleFuncFromRectAndMousePos };
