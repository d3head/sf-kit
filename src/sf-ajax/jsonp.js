import Q from 'sf-promise';
import { DOCUMENT as doc, WINDOW as window} from 'sf-dom';

const head = doc.head || doc.getElementsByTagName('head')[0];
const preScript = doc.createElement('script');
preScript.async = true;

let uuid = 0;

export default function getJSON(url) {
  const deferred = Q.defer();
  const currentDate = Date.now();
  const name = `jsonp_callback_${currentDate}_` + uuid++;

  if (url.match(/\?/))
    url += `&callback=${name}`;
  else
    url += `?callback=${name}`;

  // Create script
  let script = preScript.cloneNode();
  script.src = url;
  script.onload = script.onreadystatechange = () => {
    head.removeChild(script);
    script.onload = script.onreadystatechange = null;
    script = null;
  };

  // Setup handler
  window[name] = (data) => {
    deferred.resolve(data);
    delete window[name];
  };

  // Load JSON
  head.insertBefore(script, head.firstChild);
  return deferred.promise;
}
