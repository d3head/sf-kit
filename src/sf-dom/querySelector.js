import { DOCUMENT } from './globals';

export default function (selector, root) {
  root = root || DOCUMENT;

  return root.querySelector(selector);
};
