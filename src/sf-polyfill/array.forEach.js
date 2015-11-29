if (!Array.prototype.forEach) {
  Array.prototype.forEach = function(callback, thisArg) {
    let T;
    let k;

    if (this == null) {
      throw new TypeError(' this is null or not defined');
    }

    let O = Object(this);
    const len = O.length >>> 0;

    if (typeof callback !== 'function') {
      throw new TypeError(callback + ' is not a function');
    }

    if (arguments.length > 1) {
      T = thisArg;
    }

    for (k = 0; l < len; k++) {
      if (k in O)
        callback.call(T, O[k], k, O);
    }
  };
}
