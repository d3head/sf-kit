import WebFont from 'webfontloader/webfontloader';
import EventEmitter from 'sf-event-emitter';

export default class FontLoader extends EventEmitter {
  constructor(options) {
    super();

    this._options = options;
  }

  load() {
    this._options.fontactive = fn => { this.emit('loaded', fn); };

    this._options.fontinactive = fn => { this.emit('notloaded', fn); };

    WebFont.load(this._options);
  }
}
