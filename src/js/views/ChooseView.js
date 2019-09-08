import View from "./View";
import Button from "../Button";
import PlayView from "./PlayView";
import GoogleAd from "../GoogleAd";

export default class ChooseView extends View{
  constructor(game) {
    super(game);
    this.googleAd = new GoogleAd(
      document.querySelector("#adContainer"),
      document.querySelector("#contentElement")
    );
    this.buttons = [];
    this.createCircleButton();
    this.createCrossButton();
    this.addButtons();
    this.makeFirstButtonActive();
    this.makeControllable(this.buttons);
  }

  createCrossButton() {
    this.crossButton = new Button("CROSS");
    this.crossButton.enterHandler = () => {
      this.game.userSelection = "x";
      this.startGame();
    }
  }

  createCircleButton() {
    this.circleButton = new Button("CIRCLE");
    this.circleButton.enterHandler = () => {
      this.game.userSelection = "o";
      this.startGame();      
    }
  }

  startGame() {
    this.googleAd.addEventListener("adFinished", () => {
      this.destroy();
      new PlayView(this.game);
    });
    this.googleAd.playAds();
  }
  
  addButtons() {
    this.buttons.push([this.circleButton, this.crossButton]);
  }

  makeFirstButtonActive() {
    this.buttons[0][0].makeActive();
  }
}