const welcomeSection = document.querySelector(".welcome-section");
const jokeSection = document.querySelector(".joke-section");
const moodCards = document.querySelectorAll(".mood-card");
const backBtn = document.querySelector(".back-btn");
const moodLabel = document.querySelector(".current-mood");
const moodMap = {
  Happy: "Pun",
  Bored: "Misc",
  Stressed: "Programming",
  Edgy: "Dark",
  Random: "Any"
};

let currentMood = "Any";

moodCards.forEach(card => {
  card.addEventListener("click", () => {
    const mood = card.querySelector(".label").innerText;
    currentMood = mood;

    // 🔥 update UI
    moodLabel.innerText = mood;

    welcomeSection.classList.add("hidden");
    jokeSection.classList.remove("hidden");

    getJoke(mood);
  });
});

backBtn.addEventListener("click", () => {
  jokeSection.classList.add("hidden");
  welcomeSection.classList.remove("hidden");
});

function displayLoading() {
  document.querySelector(".joke-text").innerText = "Loading...";
}
async function getJoke(mood) {
  const category = moodMap[mood];

  try {
    displayLoading();
    const res = await fetch(`https://v2.jokeapi.dev/joke/${category}?blacklistFlags=nsfw`);
    const data = await res.json();

    let jokeText = "";

    if (data.type === "single") {
      jokeText = data.joke;
    } else {
      jokeText = `${data.setup} ${data.delivery}`;
    }

    displayJoke(jokeText, data.category);

  } catch (err) {
    console.error("Error fetching joke:", err);
  }
}
function displayJoke(joke, category) {
  document.querySelector(".joke-text").innerText = joke;
  document.querySelector(".joke-category").innerText = category;
}
const nextBtn = document.querySelector(".next-btn");

nextBtn.addEventListener("click", () => {
  getJoke(currentMood);
});


