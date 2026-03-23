fetch("https://v2.jokeapi.dev/joke/Any")
  .then(res => res.json())
  .then(data => console.log(data));