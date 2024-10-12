function filterPokemon() {
    const searchInput = document.getElementById('searchInput').value.toLowerCase();

    if (pokemonListData.length === 0) {
        console.error('The Pokemon list has not been loaded yet.');
        return;
    }

    const isNumber = !isNaN(searchInput) && searchInput !== '';

    let filteredPokemons;
    
    if (isNumber) {
        const pokemonNumber = parseInt(searchInput, 10);
        filteredPokemons = pokemonListData.filter(pokemon => pokemon.number === pokemonNumber);
    } else {
        filteredPokemons = pokemonListData.filter(pokemon => pokemon.name.toLowerCase().includes(searchInput));
    }

    if (filteredPokemons.length === 0) {
        pokemonList.innerHTML = `<p class="no-results">No Pokemon found</p>`;
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