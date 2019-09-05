class Field extends KeyBoardController{
  constructor() {
    super();
    this.cells = [];
    this.addCells();
    this.makeFirstCellActive();
    this.makeControllable(this.cells);
    console.log(this.cells);
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