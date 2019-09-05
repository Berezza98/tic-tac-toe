import ControllableItem from "./ControllableItem";

export default class Cell extends ControllableItem {
  constructor(y, x) {
    super();
    this.y = y;
    this.x = x;
    this.el = document.createElement("div");
    this.el.classList.add("cell");
    this._state = null;
    this.addToBoard();
  }

  get x() {
    return this._x;
  }

  set x(value) {
    if (typeof value === "number") {
      this._x = value;
    } else {
      throw new Error("Data type is not correct");
    }
  }

  get y() {
    return this._y;
  }

  set y(value) {
    if (typeof value === "number") {
      this._y = value;
    } else {
      throw new Error("Data type is not correct");
    }
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

  enterHandler() {
    console.log(this);
  }

  addToBoard() {
    Cell.FIELD.appendChild(this.el);
  }
}

Cell.FIELD = document.querySelector(".field");