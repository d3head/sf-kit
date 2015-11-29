import Q from 'sf-promise';

export const METHODS = {
  GET: 'get',
  POST: 'post',
};

export default class Request {
  /**
   * Create a new request
   * @param url — a string
   * @param method — a method for the request: GET, POST
   * @param options — different options for the XmlHttpRequest object
   */
  constructor(url, method, options) {
    this.url = url;
    this.method = method.toUpperCase();
    this.options = options;
    this.headers = options.headers;
    this.async = options.async;
    this.data = options.data;
  }

  send() {
    const deferred = Q.defer();

    let xhr = new XMLHttpRequest();
    xhr.open(this.method, this.url, this.async);

    // add additional options to the xhr object
    for (let o in this.options) {
      if (typeof xhr[o] !== 'undefined') {
        xhr[o] = this.options[o];
      }
    }

    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 400) {
        deferred.resolve(xhr.response);
      } else {
        deferred.reject(new Error(`Can't XHR ` + JSON.stringify(xhr.url)));
      }
    };

    xhr.onerror = () => {
      deferred.reject(new Error(`Can't XHR ` + JSON.stringify(xhr.url)));
    };

    xhr.onprogress = (event) => {
      deferred.notify(event.loaded / event.total);
    };

    if (this.method == 'POST') {
      xhr.send(this.data);
    } else {
      xhr.send();
    }

    return deferred.promise;
  }
}
