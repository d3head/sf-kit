/**
 * A function to get data attributes for the element
 * @param el — a DOM element
 * @param attrs — string or array of data attributes which you want get (the camelCase strings). For all the attrs don't use it.
 * @returns {{Array}} — array of data attributes. An attribute is undefined if it's not found.
 */
export default function(el, attrs=null) {
  if (el === null)
    throw new TypeError('Element must be set');

  if (attrs !== null && typeof attrs !== 'string' && attrs.constructor !== Array)
    throw new TypeError('Attributes must be either a string or an array');

  let result = {};

  if (attrs === null) {
    result = el.dataset;
  } else {
    if (typeof attrs === 'string') {
      attrs = [attrs];
    }

    for (let a in attrs) {
      result[attrs[a]] = el.dataset[attrs[a]];
    }
  }

  return result;
}
