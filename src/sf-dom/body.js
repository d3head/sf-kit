import { BODY, HTML } from './globals';

export function height() {
  return Math.max(BODY.scrollHeight, BODY.offsetHeight,
                  HTML.clientHeight, HTML.scrollHeight,
                  HTML.offsetHeight);
}

export function width() {
  return Math.max(BODY.scrollWidth, BODY.offsetWidth,
                  HTML.clientWidth, HTML.scrollWidth,
                  HTML.offsetWidth);
}
