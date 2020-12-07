const reviews = [
  {
    id: 1,
    name: "Ghatotkach",
    job: "Web Developer",
    img:
      "https://1.bp.blogspot.com/_OrPiYD1RcAs/SBgTur_wZdI/AAAAAAAABqU/wdUxLTaS2zs/s320/ghatothkacha.jpg",
    text: "Mai hun ghatotkach main duniya mein sabse nirala.",
  },
  {
    id: 2,
    name: "Ash Ketchum",
    job: "Pokemon Master",
    img: "https://media.comicbook.com/2016/08/ash-ketchum-194535-1280x0.jpg",
    text:
      "I wanna be the very best, like no one there ever was. To catch them is my destiny and to train them is my work",
  },
  {
    id: 3,
    name: "Tyson",
    job: "Beyblade Champion",
    img:
      "https://static.wikia.nocookie.net/all-worlds-alliance/images/3/38/Tyson_Granger.png/revision/latest/scale-to-width-down/340?cb=20190518193614",
    text: "Yes say ho.",
  },
];

//select items
const img = document.getElementById("person-img");
const author = document.getElementById("author");
const job = document.getElementById("job");
const info = document.getElementById("info");

const prevBtn = document.querySelector(".prev-btn");
const nextBtn = document.querySelector(".next-btn");
const randomBtn = document.querySelector(".random-btn");

//set staring item
let currentItem = 0;

//load initial item
window.addEventListener("DOMContentLoaded", showPerson(currentItem));

//show person based on item

function showPerson(person) {
  const item = reviews[person];
  img.src = item.img;
  author.textContent = item.name;
  job.textContent = item.job;
  info.textContent = item.text;
}

// show next person

nextBtn.addEventListener("click", function () {
  currentItem = (currentItem + 1) % reviews.length;
  showPerson(currentItem);
});

//show previous person

prevBtn.addEventListener("click", function () {
  currentItem =
    (((currentItem - 1) % reviews.length) + reviews.length) % reviews.length;
  showPerson(currentItem);
});

//show random person
randomBtn.addEventListener("click", function () {
  currentItem = Math.floor(Math.random() * reviews.length);
  showPerson(currentItem);
});
