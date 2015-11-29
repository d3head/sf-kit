import 'sf-polyfill/requestAnimationFrame';
import { addEventListener } from 'sf-dom/events';
import EventEmitter from 'sf-event-emitter';
import { WINDOW as window } from 'sf-dom';

export default class Clip extends EventEmitter {
  constructor(fps) {
    super();

    this.stopState = true;
    this.fpsInterval = 1000 / fps;
    this.nextTickTime = null;
  }

  start() {
    this.nextTickTime = Date.now();
    this.stopState = false;
    this.update();
  }

  stop() {
    this.stopState = true;
  }

  update() {
    if (this.stopState)
      return;

    window.requestAnimationFrame(this.update.bind(this));

    const now = Date.now();
    const elapsed = now - this.nextTickTime;

    if (elapsed > this.fpsInterval) {
      this.nextTickTime = now - (elapsed % this.fpsInterval);

      this.emit('update');
    }
  }
}
