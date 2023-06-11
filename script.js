function searchPokemon() {
  var searchInput = document.getElementById('searchInput').value.toLowerCase();
  var searchResults = document.getElementById('searchResults');
  searchResults.innerHTML = '';

  fetch(`https://pokeapi.co/api/v2/pokemon/${searchInput}`)
    .then(function(response) {
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response.json();
    })
    .then(function(data) {
      var pokemon = {
        name: data.name,
        image: data.sprites.front_default,
        types: data.types.map(function(typeData) {
          return typeData.type.name;
        })
      };

      var resultDiv = document.createElement('div');
      var nameElement = document.createElement('h2');
      nameElement.textContent = pokemon.name;
      resultDiv.appendChild(nameElement);

      var imageElement = document.createElement('img');
      imageElement.src = pokemon.image;
      resultDiv.appendChild(imageElement);

      var typesElement = document.createElement('p');
      typesElement.textContent = 'Types: ' + pokemon.types.join(', ');
      resultDiv.appendChild(typesElement);

      searchResults.appendChild(resultDiv);
    })
    .catch(function(error) {
      var errorElement = document.createElement('p');
      errorElement.textContent = 'No se encontró el Pokemon.';
      searchResults.appendChild(errorElement);
      console.log(error);
    });
}
