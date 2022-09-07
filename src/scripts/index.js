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

async function getLocalPokemons() {
  const res = await fetch("/src/json/poke.json");
  const data = await res.json();
  console.log(data);
  renderLocalPokemons(data);
}
getLocalPokemons();
