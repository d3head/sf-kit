export default class Condition {
  done(trigger) {
    return false;
  }

  out(trigger) {
    return false;
  }

  preTop(trigger) {
    return false;
  }

  top(trigger) {
    return false;
  }
}

export class PagePositionCondition extends Condition {
  constructor(percentPosition, shouldFadeOut) {
    super();

    this.position = percentPosition;
    this.shouldFadeOut = shouldFadeOut;
  }

  done(trigger) {
    const screenPercent = window.innerHeight - window.innerHeight / (100 / this.position);
    return trigger.el.getBoundingClientRect().top <= screenPercent;
  }

  top(trigger) {
    if (this.shouldFadeOut) {
      const screenPercent = window.innerHeight - window.innerHeight / (100 / 90);
      return trigger.el.getBoundingClientRect().bottom <= screenPercent;
    } else {
      return false;
    }
  }

  preTop(trigger) {
    if (this.shouldFadeOut) {
      const screenPercent = window.innerHeight - window.innerHeight / (100 / 89);
      return trigger.el.getBoundingClientRect().bottom <= screenPercent;
    } else {
      return false;
    }
  }

  out(trigger) {
    const screenPercent = window.innerHeight - window.innerHeight / (100 / 0);
    return trigger.el.getBoundingClientRect().top >= screenPercent;
  }
}
