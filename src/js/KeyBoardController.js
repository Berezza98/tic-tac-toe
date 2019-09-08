import EventEmitter from "./EventEmitter";

export default class KeyBoardController  extends EventEmitter {
  constructor() {
    super();
    this._controllableItems = [];
    this._activeItem = null;
  }

  get activeItem() {
    const allItems = this.controllableItems.flat();
    return allItems.find(el => el.isActive);
  }

  get controllableItems() {
    return this._controllableItems;
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
    this.addArrowHandlers();
    this.addEnterHandler();
  }

  addButtonControl(items) {
    return this.addControlProps(items);
  }

  addControlProps(items) {
    const rowsCount = items.length;
    return items.map((row, rowIndex) => {
      const columnsCount = row.length;
      return row.map((columnItem, columnIndex) => {
        return Object.assign(columnItem, {
          canGoTop: rowIndex > 0,
          canGoBottom: rowIndex < rowsCount - 1,
          canGoLeft: columnIndex > 0,
          canGoRight: columnIndex < columnsCount - 1,
          x: columnIndex,
          y: rowIndex
        });
      });
    });
  }

  arrowHandler(e) {
    const currentKeyCode = e.keyCode;
    const { x, y } = this.activeItem;
    switch (currentKeyCode) {
      case 37:
        // left
        if (this.activeItem.canGoLeft) {
          this.activeItem.makeUnactive();
          this.controllableItems[y][x - 1].makeActive();
        }
        break;
      case 38:
        //up
        if (this.activeItem.canGoTop) {
          this.activeItem.makeUnactive();
          this.controllableItems[y - 1][x].makeActive();
        }
        break;
      case 39:
        //right
        if (this.activeItem.canGoRight) {
          this.activeItem.makeUnactive();
          this.controllableItems[y][x + 1].makeActive();
        }
        break;
      case 40:
        //bottom
        if (this.activeItem.canGoBottom) {
          this.activeItem.makeUnactive();
          this.controllableItems[y + 1][x].makeActive();
        }
        break;
    }
  }

  enterHandler(e) {
    const currentKeyCode = e.keyCode;
    if (currentKeyCode === 13) {
      this.activeItem.enterHandler();
    }
  }

  addArrowHandlers() {
    this.bindedArrowHandler = this.arrowHandler.bind(this)
    let that = this;
    window.addEventListener("keydown", that.bindedArrowHandler);
  }

  addEnterHandler() {
    this.bindedEnterHandler = this.enterHandler.bind(this)
    let that = this;
    window.addEventListener("keydown", that.bindedEnterHandler);
  }

  removeHandlers() {
    let that = this;
    window.removeEventListener("keydown", that.bindedArrowHandler);
    window.removeEventListener("keydown", that.bindedEnterHandler);
  }

}