import { WINDOW, DOCUMENT } from 'sf-dom';

export function isTouch() {
  return ('ontouchstart' in WINDOW || WINDOW.DocumentTouch && DOCUMENT instanceof DocumentTouch);
}
