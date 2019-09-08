import StartView from "./StartView";
import View from "./View";
import Board from "../Board";
import Info from "../Info";

export default class PlayView extends View{
  constructor(game) {
    super(game);
    let that = this;
    this.board = new Board(game, this);
    this.board.addEventListener("gameFinished", this.gameFinishedHandler.bind(that));
    this.info = new Info(game);
    this.info.render(".content");
  }

  gameFinishedHandler() {
    this.destroy();
    new StartView(this.game);
  }
}