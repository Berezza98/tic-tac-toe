import KeyBoardController from "./KeyBoardController";
import Cell from "./Cell";

export default class Board extends KeyBoardController{
  constructor() {
    super();
    this.cells = [];
    this.addCells();
    this.makeFirstCellActive();
    this.makeControllable(this.cells);
  }

  get freeCells() {
    const allCells = this.cells.flat();
    return allCells.filter(el => !el.state);
  }

  addCells() {
    for (let i = 0; i < 3; i++) {
      let row = [];
      for ( let j = 0; j < 3; j++) {
        row.push(new Cell(i, j));
      }
      this.cells.push(row);
    }
  }

  makeFirstCellActive() {
    this.cells[0][0].makeActive();
  }
}