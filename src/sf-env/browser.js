import { WINDOW } from 'sf-dom';

/**
 * Taken from jquery.browser.
 * @param ua — a user agent
 * @returns {{object}}
 */
export function uaMatch(ua=null) {
  // If an UA is not provided, default to the current browser UA.
  if (ua === null) {
    ua = WINDOW.navigator.userAgent;
  }

  ua = ua.toLowerCase();

  const match = /(edge)\/([\w.]+)/.exec(ua) ||
      /(opr)[\/]([\w.]+)/.exec(ua) ||
      /(chrome)[ \/]([\w.]+)/.exec(ua) ||
      /(version)(applewebkit)[ \/]([\w.]+).*(safari)[ \/]([\w.]+)/.exec(ua) ||
      /(webkit)[ \/]([\w.]+).*(version)[ \/]([\w.]+).*(safari)[ \/]([\w.]+)/.exec(ua) ||
      /(webkit)[ \/]([\w.]+)/.exec(ua) ||
      /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(ua) ||
      /(msie) ([\w.]+)/.exec(ua) ||
      ua.indexOf('trident') >= 0 && /(rv)(?::| )([\w.]+)/.exec(ua) ||
      ua.indexOf('compatible') < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(ua) ||
      [];

  const platformMatch = /(ipad)/.exec(ua) ||
      /(ipod)/.exec(ua) ||
      /(iphone)/.exec(ua) ||
      /(kindle)/.exec(ua) ||
      /(silk)/.exec(ua) ||
      /(android)/.exec(ua) ||
      /(windows phone)/.exec(ua) ||
      /(win)/.exec(ua) ||
      /(mac)/.exec(ua) ||
      /(linux)/.exec(ua) ||
      /(cros)/.exec(ua) ||
      /(playbook)/.exec(ua) ||
      /(bb)/.exec(ua) ||
      /(blackberry)/.exec(ua) ||
      [];

  let browser = {};
  const matched = {
    browser: match[5] || match[3] || match[1] || '',
    version: match[2] || match[4] || '0',
    versionNumber: match[4] || match[2] || '0',
    platform: platformMatch[ 0 ] || '',
  };

  if (matched.browser) {
    browser[matched.browser] = true;
    browser.version = matched.version;
    browser.versionNumber = parseInt(matched.versionNumber, 10);
  }

  if (matched.platform) {
    browser[matched.platform] = true;
  }

  // These are all considered mobile platforms, meaning they run a mobile browser
  if (browser.android || browser.bb || browser.blackberry || browser.ipad || browser.iphone ||
    browser.ipod || browser.kindle || browser.playbook || browser.silk || browser['windows phone']) {
    browser.mobile = true;
  }

  // These are all considered desktop platforms, meaning they run a desktop browser
  if (browser.cros || browser.mac || browser.linux || browser.win) {
    browser.desktop = true;
  }

  // Chrome, Opera 15+ and Safari are webkit based browsers
  if (browser.chrome || browser.opr || browser.safari) {
    browser.webkit = true;
  }

  // IE11 has a new token so we will assign it msie to avoid breaking changes
  // IE12 disguises itself as Chrome, but adds a new Edge token.
  if (browser.rv || browser.edge) {
    const ie = 'msie';

    matched.browser = ie;
    browser[ie] = true;
  }

  // Blackberry browsers are marked as Safari on BlackBerry
  if (browser.safari && browser.blackberry) {
    const blackberry = 'blackberry';

    matched.browser = blackberry;
    browser[blackberry] = true;
  }

  // Playbook browsers are marked as Safari on Playbook
  if (browser.safari && browser.playbook) {
    const playbook = 'playbook';

    matched.browser = playbook;
    browser[playbook] = true;
  }

  // BB10 is a newer OS version of BlackBerry
  if (browser.bb) {
    const bb = 'blackberry';

    matched.browser = bb;
    browser[bb] = true;
  }

  // Opera 15+ are identified as opr
  if (browser.opr) {
    const opera = 'opera';

    matched.browser = opera;
    browser[opera] = true;
  }

  // Stock Android browsers are marked as Safari on Android.
  if (browser.safari && browser.android) {
    const android = 'android';

    matched.browser = android;
    browser[android] = true;
  }

  // Kindle browsers are marked as Safari on Kindle
  if (browser.safari && browser.kindle) {
    const kindle = 'kindle';

    matched.browser = kindle;
    browser[kindle] = true;
  }

  // Kindle Silk browsers are marked as Safari on Kindle
  if (browser.safari && browser.silk) {
    const silk = 'silk';

    matched.browser = silk;
    browser[silk] = true;
  }

  // Assign the name and platform variable
  browser.name = matched.browser;
  browser.platform = matched.platform;
  return browser;
}

export default uaMatch();
