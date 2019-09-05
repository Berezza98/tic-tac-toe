export default class Computer {
  constructor(userSelection, board) {
    this.selectedShape = userSelection;
    this.board = board;
  }

  get selectedShape() {
    return this._selectedShape;
  }

  set selectedShape(value) {
    let possibleValues = ["x", "o"];
    this._selectedShape = possibleValues.find(el => el !== value);
  }

  makeMove() {
    let randomItem = this.getRandomElement(this.board.freeCells);
    randomItem.eventHandler();
  }

  getRandomElement(arr) {
    let min = 0;
    let max = arr.length;
    let rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
  }
}