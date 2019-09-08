import EventEmitter from "./EventEmitter";

export default class ControllableItem extends EventEmitter{
  constructor() {
    super();
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