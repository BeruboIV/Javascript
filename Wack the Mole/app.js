const grid_item = document.querySelectorAll(".grid-item"); //returns a nodelist
const mole = document.querySelectorAll(".mole");
const timeLeft = document.querySelector("#time-left");
let score = document.querySelector("#score");

let result = 0;
let currentTime = timeLeft.textContent;
let hitPosition = null;

function randomGrid() {
  grid_item.forEach((className) => {
    className.classList.remove("mole");
  });
  let randomePosition = grid_item[Math.floor(Math.random() * 9)];
  //   console.log(randomePosition);
  randomePosition.classList.add("mole");
  hitPosition = randomePosition.id;
}

grid_item.forEach((id) => {
  id.addEventListener("mouseup", () => {
    if (id.id === hitPosition) {
      result = result + 1;
      score.textContent = result;
    }
  });
});

function moveMole() {
  let timeId = null;
  timeId = setInterval(randomGrid, 1000);
}

moveMole();

function countDown() {
  currentTime--;
  timeLeft.textContent = currentTime;

  if (currentTime === 0) {
    clearInterval(timerId);
    alert("GAME OVER! Your final score is" + result);
  }
}

let timerId = setInterval(countDown, 1000);
