export default class ControllableItem {
  constructor() {
    this.isActive = false;
  }

  makeActive() {
    this.isActive = true;
  }

  makeUnactive() {
    this.isActive = false;
  }

  enterHandler() {
    
  }
}