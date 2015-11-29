import { DOCUMENT } from './globals';

export default function (selector, root) {
  root = root || DOCUMENT;

  return Array.prototype.slice.call(root.querySelectorAll(selector));
};
