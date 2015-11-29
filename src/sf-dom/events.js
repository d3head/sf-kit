export function removeEventListener(el, eventName, listener, useCapture=false) {
  if (el.removeEventListener) {
    el.removeEventListener(eventName, listener, useCapture);
  } else {
    el.detachEvent('on' + eventName, listener);
  }
}

/**
 *
 * @param {DOM []} el  Dom element or collection of elements
 * @param {String} eventName
 * @param listener
 * @param useCapture
 */
export function addEventListener(el, eventName, listener, useCapture=false) {
  let elements = [];

  // is NodeList object (from querySelectorAll)
  if (el instanceof NodeList) {
    elements = Array.prototype.slice.call(el);
  } else if (el instanceof  Array) {
    // Array of elements
    elements = el;
  } else {
    // Single element
    elements.push(el);
  }

  elements.forEach(function(element) {
    if (element.addEventListener) {
      element.addEventListener(eventName, listener, useCapture);
    } else {
      element.attachEvent('on' + eventName, listener);
    }
  });
}

export function stop(event) {
  event = event || window.event;

  if (event.stopPropagation) {
    event.stopPropagation();
  } else {
    event.cancelBubble = true;
  }

  if (event.preventDefault) {
    event.preventDefault();
  }

  event.returnValue = false;
  event.stopped = true;
}

export function once(el, eventName, listener, useCapture) {
  function wrapper(event) {
    removeEventListener(el, eventName, wrapper, useCapture);
    return listener(event);
  }

  addEventListener(el, eventName, wrapper, useCapture);
}
