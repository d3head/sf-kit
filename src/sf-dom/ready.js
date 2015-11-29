import Q from 'sf-promise';
import { addEventListener, removeEventListener } from './events';
import { DOCUMENT as doc } from './globals';

function waitFor(eventName) {
  const EVENTNAME = 'readystatechange';
  const deferred = Q.defer();

  function isReady() {
    return doc.readyState === eventName;
  }

  if (isReady()) {
    deferred.resolve();
  } else {
    function subscribeWrapper() {
      if (isReady()) {
        removeEventListener(doc, EVENTNAME, subscribeWrapper);
        deferred.resolve();
      }
    }

    addEventListener(doc, EVENTNAME, subscribeWrapper);
  }

  return deferred.promise;
}

export function domReady() {
  return waitFor('complete');
}

export function windowReady() {
  return waitFor('interactive');
}
