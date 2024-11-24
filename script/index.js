// a refactorizar

let offset = 0;
let limit = 20;

async function getPokemon() {
  let promises = [];
  for (let i = offset + 1; i <= limit; i++) {
    promises.push(axios.get("https://pokeapi.co/api/v2/pokemon/" + i));
  }

  try {
    // Show loading indicator
    document.getElementById("loading").style.display = "block";
    // 2 seconds delay
    await new Promise((resolve) => setTimeout(resolve, 500));
    const responses = await Promise.all(promises);
    let bodyTable = document.getElementById("bodyTable");
    let template = document.getElementById("pokemon-template");

    // Clear the table
    bodyTable.replaceChildren();

    responses.forEach((response) => {
      let types = "";
      response.data.types.forEach((element) => {
        if (types.length > 1) {
          types += " / ";
        }
        types +=
          element.type.name.charAt(0).toUpperCase() +
          element.type.name.slice(1) +
          " ";
      });

      let name =
        response.data.name.charAt(0).toUpperCase() +
        response.data.name.slice(1);

      let clone = template.content.cloneNode(true);
      clone.querySelector("img").src = response.data.sprites.front_default;
      clone.querySelector("img").alt = response.data.name;
      clone.querySelector(".pokemon-name").textContent = name;
      clone.querySelector(".pokemon-types").textContent = types;
      clone.querySelector(".pokemon-id").textContent = response.data.id;
      clone.querySelector("a").href = `./pokemon.html?code=${response.data.id}`;

      bodyTable.appendChild(clone);
    });
    // Hide loading indicator
    document.getElementById("loading").style.display = "none";
  } catch (error) {
    document.getElementById("bodyTable").innerHTML =
      "<tr><td colspan='5'>No results found</td></tr>";
  }
}

// Llama a getPokemon cuando la página se haya cargado completamente
document.addEventListener("DOMContentLoaded", function () {
  getPokemon();
});
document
  .getElementById("searchButton")
  .addEventListener("click", function (event) {
    event.preventDefault();
    searchPokemon();
  });

addEventListener("keyup", function (event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    searchPokemon();
  }
});

function searchPokemon() {
  let bodyTable = document.getElementById("bodyTable");
  let template = document.getElementById("pokemon-template");

  bodyTable.replaceChildren();

  let code = document.getElementById("search").value;
  code = code.toLowerCase();
  if (code == "") {
    offset = 0;
    limit = 20;
    getPokemon();
    return;
  }
  axios
    .get("https://pokeapi.co/api/v2/pokemon/" + code)
    .then(function (response) {
      let types = "";
      response.data.types.forEach((element) => {
        if (types.length > 1) {
          types += " / ";
        }
        types +=
          element.type.name.charAt(0).toUpperCase() +
          element.type.name.slice(1) +
          " ";
      });

      let name =
        response.data.name.charAt(0).toUpperCase() +
        response.data.name.slice(1);

      bodyTable.innerHTML = "";

      let clone = template.content.cloneNode(true);
      clone.querySelector("img").src = response.data.sprites.front_default;
      clone.querySelector("img").alt = response.data.name;
      clone.querySelector(".pokemon-name").textContent = name;
      clone.querySelector(".pokemon-types").textContent = types;
      clone.querySelector(".pokemon-id").textContent = response.data.id;
      clone.querySelector("a").href = `./pokemon.html?code=${response.data.id}`;

      bodyTable.appendChild(clone);
    })
    .catch(function (error) {
      document.getElementById("bodyTable").innerHTML =
        "<tr><td colspan='5'>No results found</td></tr>";
    });
}

async function loadMore() {
  offset += 20;
  limit += 20;
  await getPokemon();
  window.scrollTo(0, 0);
}

document.getElementById("next").addEventListener("click", loadMore);

async function loadLess() {
  if (offset == 0) {
    return;
  }
  offset -= 20;
  limit -= 20;
  await getPokemon();
}

document.getElementById("previous").addEventListener("click", loadLess);

function loadMore() {
  offset += 20;
  limit += 20;
  getPokemon();
  window.scrollTo(0, 0);
}

document.getElementById("next2").addEventListener("click", loadMore);

function loadLess() {
  if (offset == 0) {
    return;
  }
  offset -= 20;
  limit -= 20;
  getPokemon();
}

document.getElementById("previous2").addEventListener("click", loadLess);

function goBack() {
  offset = 0;
  limit = 20;
  getPokemon();
}

document.getElementById("goBack").addEventListener("click", goBack);
