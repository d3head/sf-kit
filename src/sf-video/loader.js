import Request, { METHODS } from 'sf-ajax/request';
import Q from 'sf-promise';

export default class Loader {
  constructor(url) {
    this.url = url;
  }

  load() {
    const deferred = Q.defer();

    let req = new Request(this.url,
      METHODS.GET,
      {
        responseType: 'arraybuffer',
        async: true,
      }
    );

    req.send().then((response) => {
      deferred.resolve(response);

      // jscs:disable requirePaddingNewLinesAfterBlocks
    }, () => {
      deferred.reject(new Error(`Error on load video ${this.url}`));
    });

    // jscs:enable requirePaddingNewLinesAfterBlocks

    return deferred.promise;
  }
}
