import { DOCUMENT as document } from 'sf-dom';
import { computedStyle } from 'sf-dom/element';

const prefix = (function() {
  const styles = computedStyle(document.documentElement);

  const pre = (Array.prototype.slice
      .call(styles)
      .join('')
      .match(/-(moz|webkit|ms)-/) || (styles.OLink === '' && ['', 'o'])
    )[1];

  const dom = ('WebKit|Moz|MS|O').match(
    new RegExp('(' + pre + ')', 'i'))[1];

  return {
    dom: dom,
    lowercase: pre,
    css: '-' + pre + '-',
    js: pre[0].toUpperCase() + pre.substr(1),
  };
})();

export default prefix;
