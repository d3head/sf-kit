import { boundingBox } from 'sf-dom/element';
import { getInitYOffset }  from 'sf-scroller';
import Delegate from './delegate';

export default class View {
  constructor(el, trackingSection, delegate) {
    if (!el)
      throw new TypeError(`Element isn't set for the parallax`);

    if (!delegate)
      throw new TypeError(`Set the delegate for the parallax`);

    if (!(delegate instanceof Delegate))
      throw new TypeError(`Set the delegate as a child of sf-parallax/delegate class`);

    if (!trackingSection)
      throw new TypeError(`Set the tracking section for the parallax`);

    this.el = el;
    this.trackingSection = trackingSection;
    this.delegate = delegate;
    delegate.view = this;

    this.setupInitialPosition();
  }

  setupInitialPosition() {
    this.delegate.init();

    this.update(getInitYOffset());
  }

  update(yPosition) {
    this.move(yPosition);
  }

  move() {
    const bb = boundingBox(this.trackingSection);
    const diff = bb.top / bb.height;
    const absDiff = Math.abs(diff);

    if (this.delegate.isMovingIn(diff)) {
      this.moveIn(1 - absDiff);
    } else {
      this.moveOut(absDiff);
    }
  }

  moveIn(diff) {
    this.delegate.moveIn(diff);
  }

  moveOut(diff) {
    this.delegate.moveOut(diff);
  }
}
