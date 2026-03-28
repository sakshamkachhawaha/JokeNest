const welcomeSection = document.querySelector(".welcome-section");
const jokeSection = document.querySelector(".joke-section");
const moodCards = document.querySelectorAll(".mood-card");
const backBtn = document.querySelector(".back-btn");

moodCards.forEach(card => {
  card.addEventListener("click", () => {
    welcomeSection.classList.add("hidden");
    jokeSection.classList.remove("hidden");
  });
});

backBtn.addEventListener("click", () => {
  jokeSection.classList.add("hidden");
  welcomeSection.classList.remove("hidden");
});

fetch("https://v2.jokeapi.dev/joke/Any")
  .then(res => res.json())
  .then(data => console.log(data));
  