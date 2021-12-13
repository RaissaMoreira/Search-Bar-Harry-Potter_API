const charactersList = document.getElementById('charactersList');
const searchBar = document.getElementById('searchBar');
let hpCharacters = [];

searchBar.addEventListener('keyup', (e) => {
  const searchString = e.target.value.toLowerCase();
  const filteredCharacters = hpCharacters.filter((character) => {
    return (
      character.name.toLowerCase().includes(searchString) ||
      character.house.toLowerCase().includes(searchString)
    )
  });

  displayCharacters(filteredCharacters);
});

const loadCharacters = async () => {
    try{
      const response = await fetch('https://hp-api.herokuapp.com/api/characters');
      hpCharacters = await response.json();
      displayCharacters(hpCharacters);
    } catch {
      consolconsole.error(err);
    }
}

const displayCharacters = (characters) => {
  const htmlString = characters.map((character) => {
    return `
    <li class="character">
       <h2>${character.name}</h2>
       <p class="house"><strong>House:</strong> ${character.house}</p>
       <p class="birth"><strong>Date of Birth:</strong> ${character.dateOfBirth}</p>
       <p class="ancestry"><strong>Ancestry:</strong> ${character.ancestry}</p>
       <p class="patronus"><strong>Patronus:</strong> ${character.patronus}</p>
       <img src="${character.image}"></img>
    </li>
    `;
  }).join('');

  charactersList.innerHTML = htmlString;
}

loadCharacters();