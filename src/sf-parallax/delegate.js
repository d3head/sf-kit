export default class Delegate {
  constructor() {
    this.view = null;
  }

  init() {}

  isMovingIn(diff) {
    return diff > 0;
  }

  moveIn() {}

  moveOut() {}
}
