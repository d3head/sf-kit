import { getPrefixedTransform } from './transform';
import { getPrefixedTransition, getPrefixedTransitionEndEvent } from './transition';

export default function(property) {
  switch (property) {
    case `transition`:
      return getPrefixedTransition();
    case `transform`:
      return getPrefixedTransform();
    case `transitionend`:
      return getPrefixedTransitionEndEvent();
    default:
      return property;
  }
}
