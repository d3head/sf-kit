/**
 Rules for naming:
 This is the url parameter which must be used for the component //example.com/video/filename

 The component will add some suffixes to the url. Examples below.

 Short video files:
 * normal screen, chrome: //example.com/video/filename.mp4
 * retina screen, chrome: //example.com/video/filename@2x.mp4
 * normal screen, opera: //example.com/video/filename.webm (not implemented yet cause we don't support opera now)

 For long videos the file must be cut on pieces about 1MB each:
 * (first part), normal screen, chrome: //example.com/video/filename.part1.mp4
 * (next part), normal screen, chrome: //example.com/video/filename.part2.mp4
 * (next part), normal screen, chrome: //example.com/video/filename.part3.mp4
 * (first part), retina screen, chrome: //example.com/video/filename@2x.part1.mp4
 * (next part), retina screen, chrome: //example.com/video/filename@2x.part2.mp4
 * (next part), retina screen, chrome: //example.com/video/filename@2x.part3.mp4
*/

import { WINDOW as window } from 'sf-dom';
import { once } from 'sf-dom/events';
import Q from 'sf-promise';

import { buildUrls, canSplitFiles } from './url-builder';
import Loader from './loader';

const URL = window.URL || window.webkitURL;

export default function videoFactory(el, options) {
  if (canSplitFiles()) {
    return new SplittedVideo(el, options);
  } else {
    return new Html5TagVideo(el, options);
  }
}

class Html5TagVideo {
  constructor(el, options) {
    this.el = el;
    this.urls = buildUrls(options);
  }

  load() {
    let deferred = Q.defer();
    this.el.src = this.urls[0];
    deferred.resolve();
    return deferred.promise;
  }
}

class SplittedVideo {
  constructor(el, options) {
    this.el = el;
    this.urls = buildUrls(options);
  }

  load() {
    let deferred = Q.defer();
    let chunks = [];
    let chunksCounter = 0;

    // load every url separatelly
    for (let i = 0; i < this.urls.length; i++) {
      let partId = i;
      const loader = new Loader(this.urls[i]);

      // collect chunks into the array
      loader.load().then((response) => {
        chunks[partId] = response;
        chunksCounter++;

        // when array is full them split all chunks into a one blob
        if (chunksCounter == this.urls.length) {
          once(this.el, 'load', () => {
            URL.revokeObjectURL(this.el.src);
          });

          const blob = new Blob(chunks, {type: 'video/mp4'});
          this.el.src = URL.createObjectURL(blob);
          deferred.resolve();
        }
      });
    }

    return deferred.promise;
  }
}
