import prefix from './prefix';

function getPrefixedTransition() {
  return `${prefix.css}transition`;
}

function getPrefixedTransitionEndEvent() {
  if (prefix.lowercase == `webkit`)
    return `${prefix.lowercase}TransitionEnd`;

  return `transitionend`;
}

export {
  getPrefixedTransition,
  getPrefixedTransitionEndEvent,
};
