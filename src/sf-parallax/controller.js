import scroller, { getInitYOffset }  from 'sf-scroller';
import resizer from 'sf-resizer';

export default class Controller {
  constructor(view) {
    this.view = view;

    this.view.update(getInitYOffset());
    scroller.on('update', this.onScroll.bind(this));
    resizer.on('update', this.onScroll.bind(this));
  }

  onScroll(lastPosition) {
    this.view.update(lastPosition);
  }
}
