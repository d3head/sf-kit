import {touchImageSrc} from 'sf-dom/element';

export default class Action {
  act(trigger, obj) {
  }
}

export class ClassAction extends Action {
  constructor(className) {
    super();

    this.className = className;
  }

  act(trigger, obj) {
    if (obj.act === 'add') {
      trigger.el.classList.add(this.className);
    } else {
      trigger.el.classList.remove(this.className);
    }
  }
}

export class TouchSrcAction extends Action {
  constructor(className) {
    super();

  }

  act(trigger, obj) {
    if (obj.act === 'add') {
      touchImageSrc(trigger.el);
    }
  }
}
