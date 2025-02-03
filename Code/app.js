let boxes = document.querySelectorAll(".box");
let resetGame = document.querySelector("#reset");
let newGame = document.querySelector("#new-btn");
let msgcontainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let audio = document.querySelector("#audio");

let turnO = true;

const winpatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [3, 4, 5],
  [6, 7, 8],
  [2, 4, 6],
];
const reset = () => {
  turnO = true;
  enable();
  msgcontainer.classList.add("hide");
  audio.pause();
};
const draw = () => {
  msg.innerText = "The match is Draw";
};
const disable = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};
const enable = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = "";
  }
};

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    console.log("box is clicked");

    if (turnO) {
      box.innerText = "O";
      turnO = false;
    } else {
      box.innerText = "X";
      turnO = true;
    }
    box.disabled = true;

    checkwinner();
  });
});
const showWinner = (winner) => {
  msg.innerText = `Congratulation,Winner is ${winner} 🥳🥳🤩`;
  msgcontainer.classList.remove("hide");
  disable();
  audio.play();
  audio.currentTime = 0;
};
const checkwinner = () => {
  for (pattern of winpatterns) {
    //console.log(pattern[0],patter[1],pattern[2]);
    let pos1Val = boxes[pattern[0]].innerText;
    let pos2Val = boxes[pattern[1]].innerText;
    let pos3Val = boxes[pattern[2]].innerText;
    if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
      if (pos1Val === pos2Val && pos2Val === pos3Val) {
        showWinner(pos1Val);
      } else {
        draw();
      }
    }
  }
};
newGame.addEventListener("click", reset);
resetGame.addEventListener("click", reset);
