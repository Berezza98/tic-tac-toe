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

  makeMove(counter) {
    let randomItem = this.getRandomElement();
    return randomItem.setValue(counter);
  }

  getRandomElement() {
    let min = 0;
    let max = this.board.freeCells.length - 1;
    let rand = min + Math.random() * (max + 1 - min);
    return this.board.freeCells[Math.floor(rand)];
  }
}