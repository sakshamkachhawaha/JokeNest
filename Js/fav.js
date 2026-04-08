
let favorites = JSON.parse(localStorage.getItem("jokes")) || [];

let filteredJokes = [...favorites]; 

function renderJokes(jokes) {
  const container = document.getElementById("favContainer");
  const emptyState = document.getElementById("emptyState");

  container.innerHTML = "";

  if (jokes.length === 0) {
    emptyState.style.display = "block";
    return;
  }

  emptyState.style.display = "none";

  jokes.map(joke => {
    const card = document.createElement("div");
    card.classList.add("fav-card");

    card.innerHTML = `
      <div class="fav-header">
        <span class="fav-category">${joke.category}</span>
      </div>

      <p class="fav-text">${joke.text}</p>

      <div class="fav-actions">
        <button class="copy-btn">Copy</button>
        <button onclick="removeJoke(${joke.id})">Remove</button>
      </div>
    `;

    
    const copyBtn = card.querySelector(".copy-btn");

    copyBtn.addEventListener("click", () => {
      navigator.clipboard.writeText(joke.text);

      copyBtn.innerText = "Copied!";

      setTimeout(() => {
        copyBtn.innerText = "Copy";
      }, 1200);
    });

    container.appendChild(card);
  });
}

function removeJoke(id) {
  favorites = favorites.filter(joke => joke.id !== id);

  localStorage.setItem("jokes", JSON.stringify(favorites));

  applyAll(); 
}

const searchInput = document.querySelector(".search-input");

searchInput.addEventListener("input", () => {
  applyAll();
});

const pills = document.querySelectorAll(".pill");
let currentCategory = "all";

pills.forEach(pill => {
  pill.addEventListener("click", () => {

   
    pills.forEach(p => p.classList.remove("active"));
    pill.classList.add("active");

    currentCategory = pill.dataset.category;

    applyAll();
  });
});

const sortBtns = document.querySelectorAll(".sort-btn");
let currentSort = "default";

sortBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    currentSort = btn.dataset.sort;
    applyAll();
  });
});
function applyAll() {
  let result = [...favorites];

  
  const query = searchInput.value.toLowerCase();

  result = result.filter(joke =>
    joke.text.toLowerCase().includes(query)
  );


  if (currentCategory !== "all") {
    result = result.filter(joke =>
      joke.category === currentCategory
    );
  }

 
  if (currentSort === "short") {
    result = result.sort((a, b) => a.text.length - b.text.length);
  } else if (currentSort === "long") {
    result = result.sort((a, b) => b.text.length - a.text.length);
  }

  renderJokes(result);
}

applyAll();

console.log(favorites);







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