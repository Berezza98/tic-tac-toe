import KeyBoardController from "../KeyBoardController";

export default class View extends KeyBoardController{
  constructor(game) {
    super();
    this.game = game;
    this.container = document.querySelector(".wrapper > .content");
  }

  destroy() {
    this.removeHandlers();
    while (this.container.firstChild) {
      this.container.firstChild.remove();
    }
  }
}