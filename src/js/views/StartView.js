import View from "./View";
import Button from "../Button";
import WinnerBlock from "../WinnerBlock";
import ChooseView from "./ChooseView";

export default class StartView extends View{
  constructor(game) {
    super(game);
    this.buttons = [];
    this.createPlayButton();
    this.createExitButton();
    this.addButtons();
    this.makeFirstButtonActive();
    this.makeControllable(this.buttons);
    this.winnerBlock = new WinnerBlock(this.game.winner);
  }

  createPlayButton() {
    this.playButton = new Button("PLAY");
    this.playButton.enterHandler = () => {
      this.game.clearCounter();
      this.destroy();
      new ChooseView(this.game);
    }
  }

  createExitButton() {
    this.exitButton = new Button("EXIT");
    this.exitButton.enterHandler = function() {
      window.location.href = "http://google.com";
    }
  }
  
  addButtons() {
    this.buttons.push([this.playButton, this.exitButton]);
  }

  makeFirstButtonActive() {
    this.buttons[0][0].makeActive();
  }
}