# JokeNest

JokeNest is a simple web app that picks jokes based on how you're feeling. Instead of showing completely random jokes, it tries to match your mood so you get something that actually fits the vibe.

## Features

- **Mood-based jokes** - Pick your mood (Happy, Bored, Stressed, Edgy, or Random) and get a joke that matches
- **Save your favorites** - Hit the heart button to save jokes you want to revisit later
- **Manage your saved jokes** - Search through them, filter by category, or sort by length
- **Copy jokes** - One click to copy any joke to your clipboard
- **Dark and light mode** - Toggle between themes whenever you like
- **No account needed** - Everything is saved locally in your browser

## How It Works

JokeNest uses JokeAPI to fetch jokes dynamically. Each mood is linked to a joke category:
- Happy gets puns
- Bored gets miscellaneous jokes
- Stressed gets programming jokes
- Edgy gets dark humor
- Random gets anything

## Technologies

- HTML, CSS, JavaScript
- Fetch API for getting jokes
- localStorage for saving favorites and theme preference

## Running It Locally

Clone the repository:
```
git clone https://github.com/sakshamkachhawaha/JokeNest.git
```

Navigate to the project folder and open `index.html` in your browser.

## Project Structure

```
JokeNest/
├── index.html          # Main page with mood selection
├── fav.html            # Favorites page
├── CSS/
│   ├── style.css       # Styles for main page
│   └── fav.css         # Styles for favorites page
├── Js/
│   ├── script.js       # Main page logic
│   └── fav.js          # Favorites page logic
└── images/
    ├── Untitled Project.jpg   # Light mode logo
    └── dark.jpg               # Dark mode logo
```
