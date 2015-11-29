import 'sf-polyfill/requestAnimationFrame';
import { addEventListener } from 'sf-dom/events';
import EventEmitter from 'sf-event-emitter';

export class ResizeHandler extends EventEmitter {
  constructor() {
    super();

    this.ticking = false;

    addEventListener(window, 'resize', this.onResize.bind(this));
  }

  onResize() {
    this.requestTick();
  }

  requestTick() {
    if (!this.ticking) {
      window.requestAnimationFrame(this.callbackWrapper.bind(this));
    }

    this.ticking = true;
  }

  callbackWrapper() {
    this.ticking = false;

    this.emit('update');
  }
}

export default new ResizeHandler();
