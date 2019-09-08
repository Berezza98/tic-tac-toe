import ControllableItem from "./ControllableItem";

export default class Button extends ControllableItem{
  constructor(innerText) {
    super();
    this.el = document.createElement("button");
    this.el.innerText = innerText;
    this.addToBoard();
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
    Button.WRAPPER.appendChild(this.el);
  }
}

Button.WRAPPER = document.querySelector(".wrapper > .content");