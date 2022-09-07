const $ = (element) => document.querySelector(element);
const $$ = (element) => document.querySelectorAll(element);
//*Sections
const pokemonesMain = $(".pokemonsContainer");
const pokemonDetails = $(".pokemonDetails");
//*Elements
const headerTitle = $(".headerTitle");
const pokemonItemImage = $(".pokemonItem__image");
const pokemonItemName = $(".pokemonItem__name");

const pokemonDetailsName = $(".pokemonDetails__pokemonName");
const pokemonImages = $(".pokemonDetails__pokemonImages");
const pokemonImageFront = $(".imageFront");
const pokemonImageLateral = $(".imageLateral");
const pokemonImageBack = $(".imageBack");
const abilitiesContainer = $(".detailsContainer__abilites");
const abilitesTitle = $(".abilites__title");
const movesContainer = $(".detailsContainer__moves");
