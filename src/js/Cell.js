import ControllableItem from "./ControllableItem";

export default class Cell extends ControllableItem {
  constructor() {
    super();
    this.el = document.createElement("div");
    this.el.classList.add("cell");
    this._state = null;
    this.render();
  }

  get state() {
    return this._state;
  }

  set state(value) {
    let possibeValues = ["x", "o"];
    if (!this._state && possibeValues.includes(value)) {
      if (value === "x") {
        this.el.classList.add("cross");
      } else {
        this.el.classList.add("circle");
      }
      this._state = value;
    } else {
      throw new Error("Can`t set state for cell");
    }
  }

  makeActive() {
    super.makeActive();
    this.el.classList.add("active-cell");
  }

  makeUnactive() {
    super.makeUnactive();
    this.el.classList.remove("active-cell");
  }

  setValue(counter) {
    if (counter % 2 === 1) {
      this.state = "o";
    } else {
      this.state = "x";
    }
    return this.state;
  }

  enterHandler() {
    this.emit("selected", this);
  }

  render() {
    document.querySelector(".content > .field").appendChild(this.el);
  }
}