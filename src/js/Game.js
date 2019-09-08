import StartView from "./views/StartView";

export default class Game {
  constructor() {
    this._counter = 0;
    this.computer = null;
    this._winner = null;
  }

  get winner() {
    return this._winner;
  }

  set winner(value) {
    let possibleValues = ["x", "o", "nobody"];
    if (possibleValues.includes(value)) {
      this._winner = value;
    } else {
      throw new Error("Not correct winner");
    }
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

  clearCounter() {
    this._counter = 0;
  }

  start() {
    this.startView = new StartView(this);
  }
}