import KeyBoardController from "./KeyBoardController";
import Cell from "./Cell";
import Computer from "./Computer";

export default class Board extends KeyBoardController{
  constructor(game) {
    super();
    this.game = game;
    this.computer = new Computer(this.game.userSelection, this);
    this.el = document.createElement("div");
    this.el.classList.add("field");
    Board.WRAPPER.appendChild(this.el);
    this.cells = [];
    this.addCells();
    this.makeFirstCellActive();
    this.makeControllable(this.cells);

    if (this.game.userSelection === "o") {
      this.computerMove();
    }
  }

  get freeCells() {
    const allCells = this.cells.flat();
    return allCells.filter(el => !el.state);
  }

  addCells() {
    for (let i = 0; i < 3; i++) {
      let row = [];
      for ( let j = 0; j < 3; j++) {
        let cell = new Cell();
        cell.addEventListener("selected", (cell) => {
          let state = cell.setValue(this.game.counter);
          let finished = this.checkForWinner(state);
          if (!finished) {
            this.game.updateCounter();
            this.computerMove();
          }
        });
        row.push(cell);
      }
      this.cells.push(row);
    }
  }

  computerMove() {
    let state = this.computer.makeMove(this.game.counter);
    this.game.updateCounter();
    this.checkForWinner(state);
  }

  checkForWinner(typeOfWinner) {
    const possibleVariants = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    const flatCells = this.cells.flat();
    let result;

    for (let i = 0; i < possibleVariants.length; i++) {
      let neededCells = flatCells.filter((el, index) => possibleVariants[i].includes(index));
      result = neededCells.every(el => el.state === typeOfWinner);
      if (result) {
        this.finishGame(typeOfWinner);
        return true;
      }
    }

    if (this.freeCells.length === 0) {
      this.finishGame("nobody");
      return true;
    }
  }

  finishGame(typeOfWinner) {
    this.game.winner = typeOfWinner;
    this.removeHandlers();
    this.emit("gameFinished");
  }

  makeFirstCellActive() {
    this.cells[0][0].makeActive();
  }
}

Board.WRAPPER = document.querySelector(".wrapper > .content");