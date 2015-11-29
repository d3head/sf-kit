import { WINDOW as window } from 'sf-dom';

const HIRESSUFFIX = '@2x';
const FILESUFFIX = '.mp4';

function isHighRes(minWidth=null) {
  const pixelRatio = typeof window.devicePixelRatio !== 'undefined' ? window.devicePixelRatio : 1;
  return pixelRatio > 1 || ((minWidth !== null) ? window.outerWidth > minWidth : false);
}

/**
 * Create a full url to the video file
 * @param options — should contain next elements:
 *    * baseUrl — a main url of whole videos
 *    * minWidth (optional) — a minimal window width when hi-res videos are loaded
 *    * parts — a number of video cuts for nonhires video.
 *      If not set it uses the `parts2x` value, then a whole video. To use a whole video at once set it null.
 *    * parts2x — a number of video cuts for hires video
 *      If not set it uses the `parts` value, then a whole hi-res video. To use a whole video at once set it null.
 * @returns {Array} array of URLs (one or more for big files)
 */
export function buildUrls(options) {
  // no base Url — no videos
  if (!options.baseUrl || typeof options.baseUrl !== 'string')
    return [];

  // if there is a hi-res monitor — send retina videos to it
  const minWidth = typeof options.minWidth !== 'undefined' ? options.minWidth : null;
  const hiRes = isHighRes(minWidth);

  let baseUrl = options.baseUrl;
  let parts = 0;

  // find how many parts of the video files are here (for 1x and 2x)
  if (hiRes) {
    // check if there are no parts for 2x then use 1x videos
    if (typeof options.parts2x !== 'undefined' && options.parts2x !== null) {
      parts = parseInt(options.parts2x, 10);
      baseUrl = options.baseUrl + HIRESSUFFIX;
    } else if (typeof options.parts !== 'undefined' && options.parts2x !== null) {
      parts = parseInt(options.parts, 10);
    } else {
      baseUrl = options.baseUrl + HIRESSUFFIX;
    }
  } else {
    // and the same for 1x videos
    if (typeof options.parts !== 'undefined' && options.parts !== null) {
      parts = parseInt(options.parts, 10);
    } else if (typeof options.parts2x !== 'undefined' && options.parts !== null) {
      parts = parseInt(options.parts2x, 10);
      baseUrl = options.baseUrl + HIRESSUFFIX;
    }
  }

  if (parts > 0 && canSplitFiles()) {
    let urls = [];

    for (let i = 1; i <= parts; i++) {
      urls.push(baseUrl + `.part${i}` + FILESUFFIX);
    }

    return urls;
  } else {
    return [baseUrl + FILESUFFIX];
  }
}

export function canSplitFiles() {
  const URL = window.URL || window.webkitURL;
  return typeof window.Blob !== 'undefined' || typeof URL !== 'undefined';
}
