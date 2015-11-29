import 'sf-polyfill/array.map';

export function boundingBox(el) {
  if (!el.getBoundingClientRect)
    throw new Error(`Implement getBoundingClientRect for this browser`);

  const value = el.getBoundingClientRect();

  return {
    width: value.width,
    height: value.height,
    top: value.top,
    bottom: value.bottom,
    left: value.left,
    right: value.right,
  };
}

export function computedStyle(el, pseudoEl=null) {
  if (typeof window.getComputedStyle !== 'undefined')
    return window.getComputedStyle(el, pseudoEl);

  if (typeof el.currentStyle !== 'undefined')
    return el.currentStyle;

  throw new Error(`Implement document.getComputedStyle for this browser`);
}

export function width(el, withPaddings=false) {
  let width = el.clientWidth;

  if (withPaddings) {
    return width;
  }

  const style = computedStyle(el);
  width -= (parseInt(style.paddingLeft) + parseInt(style.paddingRight));
  return width;
}

export function outerWidth(el, withMargins=false) {
  let width = el.offsetWidth;

  if (!withMargins) {
    return width;
  }

  const style = computedStyle(el);
  width += parseInt(style.marginLeft) + parseInt(style.marginRight);
  return width;
}

export function height(el, withPaddings=false) {
  let height = el.clientHeight;

  if (withPaddings) {
    return height;
  }

  const style = computedStyle(el);
  height -= (parseInt(style.paddingLeft) + parseInt(style.paddingRight));
  return height;
}

export function outerHeight(el, withMargins=false) {
  let height = el.offsetHeight;

  if (!withMargins) {
    return height;
  }

  const style = computedStyle(el);
  height += parseInt(style.marginLeft) + parseInt(style.marginRight);
  return height;
}

export function touchImageSrc(el) {
  if (el.nodeName === 'IMG') {
    el.setAttribute('src', el.getAttribute('src'));
  }
}
