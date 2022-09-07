window.addEventListener("hashchange", navigation, false);
window.addEventListener("DOMContentLoaded", navigation, false);
headerTitle.addEventListener("click", renderMain);

function navigation() {
  if (location.hash.startsWith("#pD")) {
    renderDetails();
  }
}
function renderMain() {
  pokemonDetails.classList.add("hidden");
  pokemonesMain.classList.remove("hidden");
  location.hash = "";
}

function renderDetails() {
  pokemonesMain.classList.add("hidden");
  pokemonDetails.classList.remove("hidden");
}
