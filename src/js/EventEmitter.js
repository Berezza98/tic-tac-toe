export default class EventEmitter{
  constructor() {
    this.listeners = {};
  }

  addEventListener(type, callback) {
    if (!(type in this.listeners)) {
      this.listeners[type] = [];
    }
    this.listeners[type].push(callback);
  }

  removeEventListener(type, callback) {
    if (!(type in this.listeners)) {
      return;
    }
    let stack = this.listeners[type];
    for (let i = 0, l = stack.length; i < l; i++) {
      if (stack[i] === callback){
        stack.splice(i, 1);
        return;
      }
    }
  }

  emit(name, data) {
    if (!(name in this.listeners)) {
      return true;
    }
    let stack = this.listeners[name].slice();
  
    for (let i = 0, l = stack.length; i < l; i++) {
      stack[i].call(this, data);
    }
    return data;
  }
};