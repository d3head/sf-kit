import EventEmitter from 'sf-event-emitter';

export default class Timer extends EventEmitter {
  constructor(tickTime) {
    super();

    this.tickTime = tickTime; // ms
    this.isEnabled = false;
    this.timer = null;
    this.now = Date.now();
    this.tickCounter = 0;
  }

  start() {
    this.isEnabled = true;
    this._update();
  }

  _update() {
    if (!this.isEnabled)
      return;

    this.timer = setTimeout(function() {
      this.emit('update', {since: Date.now() - this.now, tickCounter: ++this.tickCounter});

      this._update();
    }.bind(this), this.tickTime);
  }

  stop() {
    this.isEnabled = false;
    clearTimeout(this.timer);
  }
}
