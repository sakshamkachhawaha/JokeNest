const welcomeSection = document.querySelector(".welcome-section");
const jokeSection = document.querySelector(".joke-section");
const moodCards = document.querySelectorAll(".mood-card");
const backBtn = document.querySelector(".back-btn");
const moodLabel = document.querySelector(".current-mood");
const saveBtn = document.querySelector(".save-btn");
const heartIcon = saveBtn.querySelector("span");


let favorites = JSON.parse(localStorage.getItem("jokes")) || [];
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
let currentJoke = null;

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


    currentJoke = {
      id: data.id,
      text: jokeText,
      category: data.category
    };

    displayJoke(jokeText, data.category);
    updateHeartUI();

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


const copyBtn = document.querySelector(".copy-btn");

copyBtn.addEventListener("click", () => {
  const joke = document.querySelector(".joke-text").innerText;

  navigator.clipboard.writeText(joke).then(() => {
    copyBtn.innerText = "Copied!";

    setTimeout(() => {
      copyBtn.innerText = "Copy";
    }, 1500);
  });
});


saveBtn.addEventListener("click", () => {
  if (!currentJoke) return;

  const exists = favorites.find(j => j.id === currentJoke.id);

  if (exists) {
    favorites = favorites.filter(j => j.id !== currentJoke.id);
  } else {
    favorites.push(currentJoke);
  }

  localStorage.setItem("jokes", JSON.stringify(favorites));

  updateHeartUI();
});
function updateHeartUI() {
  if (!currentJoke) return;

  const exists = favorites.find(j => j.id === currentJoke.id);

if (exists) {
  heartIcon.innerText = "favorite";
  saveBtn.classList.add("saved");
} else {
  heartIcon.innerText = "favorite_border";
  saveBtn.classList.remove("saved");
}
}





const logo = document.getElementById("logo");
const toggle = document.querySelector(".theme-toggle");


function updateLogo() {
  if (document.body.classList.contains("dark")) {
    logo.src = "images/dark.jpg";
  } else {
    logo.src = "images/Untitled Project.jpg";
  }
}


toggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");

  localStorage.setItem(
    "theme",
    document.body.classList.contains("dark") ? "dark" : "light"
  );

  updateLogo(); 
});


if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark");
}


updateLogo();