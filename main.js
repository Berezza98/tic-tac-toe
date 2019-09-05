const field = new Field();

let counter = 0;

window.addEventListener("keydown", (e) => {
  if (e.keyCode === 13) {
    const activeCell = field.flat().find(el => el.isActive);
    console.log(activeCell);
    if (activeCell) {
      if (counter % 2 === 0) {
        activeCell.state = "x";
      } else {
        activeCell.state = "o";
      }
      counter++;
    }
  }
  console.log(field);
});
