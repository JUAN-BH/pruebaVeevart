const api = axios.create({
  baseURL: "https://pokeapi.co/api/v2/",
});

function renderLocalPokemons(data) {
  data.map((element) => {
    const pokemonItem = document.createElement(
      "article",
      "animate__animated",
      "animate__fadeIn"
    );
    pokemonItem.classList.add("pokemonsContainer__pokemonItem");
    const pokemonImage = document.createElement("img");
    pokemonImage.classList.add("pokemonItem__image");
    const pokemonName = document.createElement("h2");
    pokemonName.classList.add("pokemonItem__name");

    pokemonImage.src = element.sprites.front_default;
    pokemonImage.setAttribute("alt", element.name);
    pokemonName.innerText =
      element.name.charAt(0).toUpperCase() + element.name.slice(1);
    pokemonItem.setAttribute("id", element.name);
    pokemonItem.appendChild(pokemonImage);
    pokemonItem.appendChild(pokemonName);

    pokemonesMain.appendChild(pokemonItem);

    pokemonItem.addEventListener("click", async () => {
      const res = await fetch("/src/json/poke.json");
      const data = await res.json();
      const pokemonFiltered = data.filter((e) => e.name == pokemonItem.id);
      renderDetailsPokemonLocals(pokemonFiltered);
    });
  });
}
function renderDetailsPokemonLocals(pokemonFiltered) {
  abilitiesContainer.innerHTML = "";
  const abilitiesTitle = document.createElement("h2");
  abilitiesTitle.innerText = "Abilities";
  abilitiesContainer.appendChild(abilitiesTitle);

  movesContainer.innerHTML = "";
  const movesTitle = document.createElement("h2");
  movesTitle.innerText = "Moves";
  movesContainer.appendChild(movesTitle);

  pokemonFiltered.map((e) => {
    pokemonDetailsName.innerText =
      e.name.charAt(0).toUpperCase() + e.name.slice(1);
    pokemonImageFront.src = e.sprites.front_default;
    pokemonImageBack.src = e.sprites.back_default;
    pokemonImageLateral.src = e.sprites.front_shiny;
  });
  const abilitiesToRender = pokemonFiltered.map((e) => {
    return e.abilities
      .map((element) => {
        return `
              <li class="abilities__ablity">
                  <p class="ablity__name">${element.ability.name}</p>
                  </p>
              </li>
        `;
      })
      .join(" ");
  });
  const movesToRender = pokemonFiltered.map((e) => {
    return e.moves
      .map((element) => {
        return `
                <li class="moves__move">
                    <p class="move__name">${element.move.name}</p>
                    </p>
                </li>
          `;
      })
      .join(" ");
  });

  abilitiesContainer.innerHTML += abilitiesToRender;
  movesContainer.innerHTML += movesToRender;

  location.hash = `#pD=${pokemonFiltered.find((element) => element.name).name}`;
}
function renderSearchedPokemons(data) {
  const pokemonItem = document.createElement("article");
  pokemonItem.classList.add(
    "pokemonsContainer__pokemonItem",
    "animate__animated",
    "animate__fadeIn"
  );
  const pokemonImage = document.createElement("img");
  pokemonImage.classList.add("pokemonItem__image");
  const pokemonName = document.createElement("h2");
  pokemonName.classList.add("pokemonItem__name");

  pokemonImage.src = data.sprites.front_default;
  pokemonImage.setAttribute("alt", data.name);
  pokemonName.innerText =
    data.name.charAt(0).toUpperCase() + data.name.slice(1);
  pokemonItem.setAttribute("id", data.name);
  pokemonItem.appendChild(pokemonImage);
  pokemonItem.appendChild(pokemonName);

  let pokemonsIdsSaved = [];
  for (const element of pokemonesMain.childNodes.entries()) {
    pokemonsIdsSaved.push(element);
  }
  pokemonsIdsSaved = pokemonsIdsSaved
    .flat()
    .filter((e) => isNaN(e))
    .map((e) => e.id);
  if (pokemonsIdsSaved.includes(pokemonItem.getAttribute("id"))) {
    modalAlreadyExists.classList.remove("hidden");
    closeModalAlreadyExists.addEventListener("click", () => {
      modalAlreadyExists.classList.add("hidden");
    });
  } else {
    pokemonesMain.appendChild(pokemonItem);
  }

  pokemonItem.addEventListener("click", async () => {
    const { data, status } = await api(`pokemon/${pokemonItem.id}`);
    renderDetailsPokemonSearched(data);
  });
}
function renderDetailsPokemonSearched(data) {
  abilitiesContainer.innerHTML = "";
  const abilitiesTitle = document.createElement("h2");
  abilitiesTitle.innerText = "Abilities";
  abilitiesContainer.appendChild(abilitiesTitle);

  movesContainer.innerHTML = "";
  const movesTitle = document.createElement("h2");
  movesTitle.innerText = "Moves";
  movesContainer.appendChild(movesTitle);

  pokemonDetailsName.innerText =
    data.name.charAt(0).toUpperCase() + data.name.slice(1);
  pokemonImageFront.src = data.sprites.front_default;
  pokemonImageBack.src = data.sprites.back_default;
  pokemonImageLateral.src = data.sprites.front_shiny;

  const abilitiesToRender = data.abilities
    .map((e) => {
      return `
                <li class="abilities__ablity">
                    <p class="ablity__name">${e.ability.name}</p>
                    </p>
                </li>
          `;
    })
    .join(" ");
  const movesToRender = data.moves
    .slice(0, 5)
    .map((e) => {
      return `
                  <li class="moves__move">
                      <p class="move__name">${e.move.name}</p>
                      </p>
                  </li>
            `;
    })
    .join(" ");

  abilitiesContainer.innerHTML += abilitiesToRender;
  movesContainer.innerHTML += movesToRender;

  location.hash = `#pD=${data.name}`;
}

async function getLocalPokemons() {
  const res = await fetch("/src/json/poke.json");
  const data = await res.json();
  renderLocalPokemons(data);
}
async function getPokemonsSearch(query) {
  try {
    modalLoading.classList.remove("hidden");
    const { data, status } = await api(`pokemon/${query}`);
    modalLoading.classList.add("hidden");
    renderSearchedPokemons(data);
  } catch (e) {
    modalLoading.classList.add("hidden");
    modalSearchFail.classList.remove("hidden");
    closeModalFailure.addEventListener("click", () => {
      modalSearchFail.classList.add("hidden");
    });
  }
}

searchInput.addEventListener("keypress", (e) => {
  if (e.keyCode === 13) {
    const query = searchInput.value.toLowerCase();
    getPokemonsSearch(query);
  }
});

btnSearch.addEventListener("click", (e) => {
  const query = searchInput.value.toLowerCase();
  getPokemonsSearch(query);
});

getLocalPokemons();
