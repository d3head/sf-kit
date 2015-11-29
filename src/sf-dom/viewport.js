import { boundingBox } from 'sf-dom/element';
import { clamp } from 'sf-math';
import { HTML } from './globals';

export function getViewPort() {
  return {
    height: window.innerHeight || HTML.clientHeight,
    width: window.innerWidth || HTML.clientWidth,
  };
}

export function pxInViewPort(element, customBoundingBox) {
  const viewportSize = getViewPort();
  let diff = 0;

  customBoundingBox = customBoundingBox || boundingBox(element);
  const top = customBoundingBox.top;

  if (top >= 0) {
    diff = viewportSize.height - top;

    if (diff > customBoundingBox.height) {
      diff = customBoundingBox.height;
    }
  } else {
    diff = customBoundingBox.height + top;
  }

  if (diff < 0) {
    diff = 0;
  }

  if (diff > viewportSize.height) {
    diff = viewportSize.height;
  }

  return diff;
}

export function percentInViewPort(element, customBoundingBox) {
  const bb = customBoundingBox || boundingBox(element);
  return pxInViewPort(element, bb) / bb.height;
}

export function isInViewPort(element, limit=0) {
  var vpPercents = percentInViewPort(element);
  return (vpPercents === 1 || vpPercents > clamp(limit, 0, 1));
}
