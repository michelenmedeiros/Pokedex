
function loadPokemonDetails(pokemon) {
    const pokemonDetailHtml = `
            <li class="pokemon ${pokemon.type}">
                <h2>${pokemon.name}</h2>
                    <p># ${pokemon.number}</p>
                <img src="${pokemon.photo}" alt="${pokemon.name}">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>
                <span class="base-stats">Base stats:</span>
                <ul class="stats">
                    <li>HP: ${pokemon.hp}</li>
                    <li>Attack: ${pokemon.attack}</li>
                    <li>Defense: ${pokemon.defense}</li>
                    <li>Sp. Attack: ${pokemon.spAttack}</li>
                    <li>Sp. Defense: ${pokemon.spDefense}</li>
                    <li>Speed: ${pokemon.speed}</li>
                </ul>
            </li>
        `;
        document.getElementById('pokemonDetail').innerHTML = pokemonDetailHtml;
        openModal();
    };

function openModal() {
    const modal = document.getElementById('pokemonModal');
    modal.style.display = 'flex';
}

document.getElementById('closeModal').addEventListener('click', function() {
    const modal = document.getElementById('pokemonModal');
    modal.style.display = 'none';
});

function goToPreviousPokemon() {
    if (currentPokemonIndex > 0) {
        currentPokemonIndex -= 1;
        loadPokemonDetails(pokemonListData[currentPokemonIndex]);
    }
}

function goToNextPokemon() {
    if (currentPokemonIndex < pokemonListData.length - 1) {
        currentPokemonIndex += 1;
        loadPokemonDetails(pokemonListData[currentPokemonIndex]);
    }
}

document.getElementById('prevPokemon').addEventListener('click', goToPreviousPokemon);
document.getElementById('nextPokemon').addEventListener('click', goToNextPokemon);
