import scroller from 'sf-scroller';

// todo: rename trigger to fit new functionality
export default class DisposableTrigger {
  constructor(element, condition, action, scrollHandler) {
    this.el = element;
    this.condition = condition;
    this.action = action;
    this.isDone = false;
    this.scroller = scrollHandler || scroller;

    this.scroller.on('update', this.check.bind(this));
    this.check();
  }

  check() {
    if (!this.isDone && this.condition.done(this) && !this.condition.preTop(this)) {
      this.update({act: 'add'});
      this.isDone = true;
    }

    if (this.isDone && this.condition.out(this)) {
      this.update({act: 'remove'});
      this.isDone = false;
    }

    if (this.isDone && this.condition.top(this)) {
      this.update({act: 'remove'});
      this.isDone = false;
    }
  }

  update(obj) {
    this.action.act(this, obj);
  }
}
