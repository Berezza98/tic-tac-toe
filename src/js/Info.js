export default class Info {
  constructor(game) {
    this.game = game;
    this.rightEl = document.createElement("div");
    this.rightEl.classList.add("info-right", "info");
    this.leftEl = document.createElement("div");
    this.leftEl.classList.add("info-left", "info");
    this.insertLeftInfo();
    this.insertRightInfo();
  }

  get userSelectedImage() {
    return this.game.userSelection === "o" ?
      "./assets/circle.png" :
      "./assets/cross.png"
  }

  get computerSelectedImage() {
    return this.game.userSelection === "o" ?
      "./assets/cross.png" :
      "./assets/circle.png"
  }

  insertLeftInfo() {
    let p = document.createElement("p");
    p.classList.add("user");
    p.innerText = "USER";
    this.leftEl.appendChild(p);

    let img = new Image();
    img.onload = () => {
      this.leftEl.appendChild(img);
    }
    img.classList.add("info-image")
    img.src = this.userSelectedImage;
  }

  insertRightInfo() {
    let p = document.createElement("p");
    p.classList.add("user");
    p.innerText = "COMPUTER";
    this.rightEl.appendChild(p);

    let img = new Image();
    img.onload = () => {
      this.rightEl.appendChild(img);
    }
    img.classList.add("info-image")
    img.src = this.computerSelectedImage;
  }

  render(domEl) {
    document.querySelector(domEl).appendChild(this.rightEl);
    document.querySelector(domEl).appendChild(this.leftEl);
  }
}