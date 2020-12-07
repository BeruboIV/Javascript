const colors = ["red", "green", "blue"];
const btn = document.getElementById("btn");
const color = document.querySelector(".color");

btn.addEventListener("click", function () {
  var randomNumber = getRandom();
  document.body.style.backgroundColor = colors[randomNumber];
  color.textContent = colors[randomNumber];
});

function getRandom() {
  return Math.floor(Math.random() * colors.length);
}
