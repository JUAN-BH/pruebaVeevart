const api = axios.create({
  baseURL: "https://pokeapi.co/api/v2/",
});

function renderLocalPokemons(data) {
  data.map((element) => {
    const pokemonItem = document.createElement("article");
    pokemonItem.classList.add("pokemonsContainer__pokemonItem");
    const pokemonImage = document.createElement("img");
    pokemonImage.classList.add("pokemonItem__image");
    const pokemonName = document.createElement("h2");
    pokemonName.classList.add("pokemonItem__name");

    pokemonImage.src = element.sprites.front_default;
    pokemonImage.setAttribute("alt", element.name);
    pokemonName.innerText = element.name;
    pokemonItem.setAttribute("id", element.id);
    pokemonItem.appendChild(pokemonImage);
    pokemonItem.appendChild(pokemonName);

    pokemonesMain.appendChild(pokemonItem);

    pokemonItem.addEventListener("click", async () => {
      const res = await fetch("/src/json/poke.json");
      const data = await res.json();
      const pokemonFiltered = data.filter((e) => e.id == pokemonItem.id);
      console.log(pokemonFiltered);
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
    pokemonDetailsName.innerText = e.name;
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
  pokemonItem.classList.add("pokemonsContainer__pokemonItem");
  const pokemonImage = document.createElement("img");
  pokemonImage.classList.add("pokemonItem__image");
  const pokemonName = document.createElement("h2");
  pokemonName.classList.add("pokemonItem__name");

  pokemonImage.src = data.sprites.front_default;
  pokemonImage.setAttribute("alt", data.name);
  pokemonName.innerText = data.name;
  pokemonItem.setAttribute("id", data.name);
  pokemonItem.appendChild(pokemonImage);
  pokemonItem.appendChild(pokemonName);

  pokemonesMain.appendChild(pokemonItem);

  pokemonItem.addEventListener("click", async () => {
    const { data, status } = await api(`pokemon/${pokemonItem.id}`);
    console.log(data);
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

  pokemonDetailsName.innerText = data.name;
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
  console.log(data);
  renderLocalPokemons(data);
}
async function getPokemonsSearch(query) {
  const { data, status } = await api(`pokemon/${query}`);
  console.log(data);
  renderSearchedPokemons(data);
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
