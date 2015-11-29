import 'sf-polyfill/requestAnimationFrame';
import { addEventListener, removeEventListener } from 'sf-dom/events';
import EventEmitter from 'sf-event-emitter';
import { BODY as body, DOCUMENT as document, WINDOW as window } from 'sf-dom';

export class ScrollHandler extends EventEmitter {
  constructor(strategy) {
    super();

    this.strategy = strategy;
    this.latestKnownScrollY = strategy.getLatestPosition();
    this.ticking = false;
    this.stackContextCounter = 0;

    this.b = body;
    this.savedBodyValues = {};

    addEventListener(strategy.getScrollableElement(), 'scroll', this.onScroll.bind(this));
  }

  onScroll() {
    const scrollY = this.strategy.getLatestPosition();
    this.latestKnownScrollY = scrollY < 0 ? 0 : scrollY;

    this.requestTick();
  }

  requestTick() {
    if (!this.ticking) {
      window.requestAnimationFrame(this.callbackWrapper.bind(this));
    }

    this.ticking = true;
  }

  lock() {
    this._increase();

    if (!this._canLock()) {
      return;
    }

    this.savedBodyValues = {
      bodyOverflow: this.b.style.overflow,
      bodyHeight: this.b.style.height,
    };

    this.b.style.overflow = 'hidden';
    this.b.style.height = '100%';
  }

  unlock() {
    this._decrease();

    if (!this._canUnlock()) {
      return;
    }

    if (typeof this.savedBodyValues.bodyOverflow !== 'undefined') {
      this.b.style.overflow = this.savedBodyValues.bodyOverflow;
    }

    if (typeof this.savedBodyValues.bodyHeight !== 'undefined') {
      this.b.style.height = this.savedBodyValues.bodyHeight;
    }
  }

  moveTo(value) {
    this.strategy.moveTo(value);
  }

  callbackWrapper() {
    this.ticking = false;

    this.emit('update', this.latestKnownScrollY);
  }

  destroy() {
    removeEventListener(this.strategy.getScrollableElement(), 'scroll', this.onScroll);
  }

  _canLock() {
    return this.stackContextCounter === 1;
  }

  _canUnlock() {
    return this.stackContextCounter === 0;
  }

  _increase() {
    this.stackContextCounter++;
  }

  _decrease() {
    if (this.stackContextCounter === 0)
      return;

    this.stackContextCounter--;
  }
}

export class WindowScrollStrategy {
  constructor() {
    this.element = window;
  }

  getScrollableElement() {
    return this.element;
  }

  getLatestPosition() {
    return getYOffset();
  }

  moveTo(value) {
    this.element.scrollTo(0, value);
  }
}

export class ElementScrollStrategy {
  constructor(element) {
    this.element = element;
  }

  getScrollableElement() {
    return this.element;
  }

  getLatestPosition() {
    return this.element.scrollTop;
  }

  moveTo(value) {
    this.element.scrollTop = value + 'px';
  }
}

export function getYOffset() {
  const offset = window.pageYOffset || body.scrollTop;

  // prevent glitches connected to bounce effect
  return offset >= 0 ? offset : 0;
}

let initYOffset = null;

export function getInitYOffset() {
  if (initYOffset === null) {
    initYOffset = getYOffset();
  }

  return initYOffset;
}

export default new ScrollHandler(new WindowScrollStrategy());
