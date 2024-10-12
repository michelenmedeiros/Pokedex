// 
const pokemonList = document.getElementById('pokemonList');
const loadMoreButton = document.getElementById('loadMoreButton');

const maxRecords = 151;
const limit = 28;
let offset = 0;

let currentPokemonIndex = null;
let pokemonListData = []; 

function loadAllPokemons() {
    pokeApi.getPokemons(0, maxRecords).then((pokemons = []) => {
        pokemonListData = pokemons; 
        showPokemonList(); 
    });
}

function showPokemonList() {
    const nextPokemons = pokemonListData.slice(offset, offset + limit);

    const newHtml = nextPokemons.map((pokemon) => 
        `<li class="pokemon ${pokemon.type}" data-id="${pokemon.number}" data-url="https://pokeapi.co/api/v2/pokemon/${pokemon.number}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>
                <img src="${pokemon.photo}" alt="${pokemon.name}">
            </div>
        </li>`
    ).join('');

    pokemonList.innerHTML += newHtml;

    const pokemonItems = document.querySelectorAll('.pokemon');
    pokemonItems.forEach(item => {
        item.addEventListener('click', function() {
            const pokemonId = parseInt(this.getAttribute('data-id'), 10);
            const selectedPokemon = pokemonListData.find(p => p.number === pokemonId);
            currentPokemonIndex = pokemonListData.indexOf(selectedPokemon);
            loadPokemonDetails(selectedPokemon);
        });

        item.addEventListener('mouseenter', function() {
            this.classList.add('jump');
        });

        item.addEventListener('mouseleave', function() {
            this.classList.remove('jump');
        });
    });

    offset += limit;
    if (offset >= pokemonListData.length) {
        loadMoreButton.style.display = 'none';
    }
}

function filterPokemon() {
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    const filteredPokemons = pokemonListData.filter(pokemon => pokemon.name.toLowerCase().includes(searchInput));

    const newHtml = filteredPokemons.map((pokemon) => 
        `<li class="pokemon ${pokemon.type}" data-id="${pokemon.number}" data-url="https://pokeapi.co/api/v2/pokemon/${pokemon.number}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>
                <img src="${pokemon.photo}" alt="${pokemon.name}">
            </div>
        </li>`
    ).join('');

    pokemonList.innerHTML = newHtml;

    const pokemonItems = document.querySelectorAll('.pokemon');
    pokemonItems.forEach(item => {
        item.addEventListener('click', function() {
            const pokemonId = parseInt(this.getAttribute('data-id'), 10);
            const selectedPokemon = pokemonListData.find(p => p.number === pokemonId);
            currentPokemonIndex = pokemonListData.indexOf(selectedPokemon);
            loadPokemonDetails(selectedPokemon);
        });

        item.addEventListener('mouseenter', function() {
            this.classList.add('jump');
        });

        item.addEventListener('mouseleave', function() {
            this.classList.remove('jump');
        });
    });
}

loadAllPokemons();

loadMoreButton.addEventListener('click', showPokemonList);

// Filter Type

function filterPokemonByType(type) {
    if (!type) {

        renderPokemonList(pokemonListData);
        return;
    }

    const filteredPokemons = pokemonListData.filter(pokemon => pokemon.types.includes(type));

    if (filteredPokemons.length === 0) {
        pokemonList.innerHTML = `<p class="no-results">No Pokémon found of type ${type}</p>`;
        return;
    }

    const newHtml = filteredPokemons.map((pokemon) => 
        `<li class="pokemon ${pokemon.type}" data-id="${pokemon.number}" data-url="https://pokeapi.co/api/v2/pokemon/${pokemon.number}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>
            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>
                <img src="${pokemon.photo}" alt="${pokemon.name}">
            </div>
        </li>`
    ).join('');

    pokemonList.innerHTML = newHtml;

    const pokemonItems = document.querySelectorAll('.pokemon');
    pokemonItems.forEach(item => {
        item.addEventListener('click', function() {
            const pokemonId = parseInt(this.getAttribute('data-id'), 10);
            const selectedPokemon = pokemonListData.find(p => p.number === pokemonId);
            currentPokemonIndex = pokemonListData.indexOf(selectedPokemon);
            loadPokemonDetails(selectedPokemon);
        });

        item.addEventListener('mouseenter', function() {
            this.classList.add('jump');
        });

        item.addEventListener('mouseleave', function() {
            this.classList.remove('jump');
        });
    });
}

const typeItems = document.querySelectorAll('.type-filter li');
typeItems.forEach(item => {
    item.addEventListener('click', function() {
        const selectedType = this.getAttribute('data-type');
        filterPokemonByType(selectedType);
    });
});