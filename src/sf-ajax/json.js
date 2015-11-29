import Q from 'sf-promise';

export default function getJSON(url) {
  const deferred = Q.defer();

  let request = new XMLHttpRequest();
  request.open('GET', url, true);

  request.onreadystatechange = function() {
    if (this.readyState === 4) {
      if (this.status >= 200 && this.status < 400) {
        deferred.resolve(JSON.parse(this.responseText));
      } else {
        deferred.reject({status: this.status});
      }
    }
  };

  request.send();
  request = null;

  return deferred.promise;
}

