import Board from "./Board";
import Computer from "./Computer";

export default class Game {
  constructor(userSelection) {
    this._counter = 0;
    this.computer = null;
    this.userSelection = userSelection;
  }

  get counter() {
    return this._counter;
  }

  get userSelection() {
    return this._userSelection;
  }

  set userSelection(value) {
    let possibleValues = ["x", "o"];
    if (possibleValues.includes(value)) {
      this._userSelection = value;
    } else {
      throw new Error("Not correct user selection");
    }
  }

  updateCounter() {
    this._counter++;
  }

  start() {
    this.board = new Board();
    this.computer = new Computer(this.userSelection, this.board);
  }
}