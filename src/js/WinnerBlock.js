export default class WinnerBlock{
  constructor(winner) {
    this.winner = winner;
    this.winnerBlock = document.createElement("div");
    this.winnerBlock.classList.add("winner-block");
    this.addWinnerInfo();
    this.addWinnerImage();
    this.render();
  }

  get winnerImage() {
    if (this.winner === "o") {
      return "./assets/circle.png";
    } else if (this.winner === "x") {
      return "./assets/cross.png";
    } else {
      return "./assets/handshake.png"
    }
  }
      

  addWinnerInfo() {
    let p = document.createElement("p");
    p.innerText = "WINNER: ";
    p.classList.add("winner-text");
    this.winnerBlock.appendChild(p);
  }

  addWinnerImage() {
    let img = new Image();
    img.onload = () => {
      this.winnerBlock.appendChild(img);
    }
    img.classList.add("winner-image")
    img.src = this.winnerImage;
  }

  render() {
    if (this.winner) {
      document.querySelector(".content").appendChild(this.winnerBlock);
    }
  }
}