class KeyBoardController {
  constructor() {
    this._controllableItems = [];
  }

  get controllableItems() {
    return this._buttonArray;
  }

  set controllableItems(value) {
    if (Array.isArray(value)) {
      this._controllableItems = this.addButtonControl(value);
    } else {
      throw new Error("Not correct data type");
    }
  }

  makeControllable(items) {
    this.controllableItems = items;
  }

  addButtonControl(items) {
    this.addControlProps(items);
    this.addKeyHandlers();
  }

  addControlProps(items) {
    const rowsCount = items.length;
    items.map((row, rowIndex) => {
      const columnsCount = row[0].length;
      return row.map((columnItem, columnIndex) => {
        return Object.assign(columnItem, {
          canGoTop: rowIndex > 0,
          canGoBottom: rowIndex < rowsCount - 1,
          canGoLeft: columnIndex > 0,
          canGoRight: columnIndex < rowsCount - 1
        });
      });
    });
  }

  addKeyHandlers() {
    window.addEventListener("keydown", (e) => {
      switch (e.keyCode) {
        case 37:
          alert('left');
          break;
        case 38:
          alert('up');
          break;
        case 39:
          alert('right');
          break;
        case 40:
          break;
      }
    });
  }

}