import { DOCUMENT as document } from 'sf-dom';
import { addEventListener } from 'sf-dom/events';
import EventEmitter from 'sf-event-emitter';

export class CurrentTab extends EventEmitter {
  constructor() {
    super();

    this.hiddenProperty = null;
    let visibilityChange;

    if (typeof document.hidden !== 'undefined') { // Opera 12.10 and Firefox 18 and later support
      this.hiddenProperty = 'hidden';
      visibilityChange = 'visibilitychange';
    } else if (typeof document.mozHidden !== 'undefined') {
      this.hiddenProperty = 'mozHidden';
      visibilityChange = 'mozvisibilitychange';
    } else if (typeof document.msHidden !== 'undefined') {
      this.hiddenProperty = 'msHidden';
      visibilityChange = 'msvisibilitychange';
    } else if (typeof document.webkitHidden !== 'undefined') {
      this.hiddenProperty = 'webkitHidden';
      visibilityChange = 'webkitvisibilitychange';
    }

    if (this.hiddenProperty !== null) {
      addEventListener(document, visibilityChange, this.onUpdate.bind(this));

      this.onUpdate();
    }
  }

  onUpdate() {
    this.emit('update', {isHidden: document[this.hiddenProperty]});
  }
}

export default new CurrentTab();
