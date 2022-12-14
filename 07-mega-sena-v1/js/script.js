var state = { board: [], currentGame: [], savedGame: [] };

function start() {
  createBoard();
  newGame();
}

function createBoard() {
  state.board = [];

  for (var i = 1; i <= 60; i++) {
    state.board.push(i);
  }
}

function newGame() {
  resetGame();
  render();
}

function render() {
  renderBoard();
  renderButtons();
  renderSavedGames();
}

function renderBoard() {
  var divBoard = document.querySelector("#megasena-numbers");
  divBoard.innerHTML = "";

  var ulNumbers = document.createElement("ul");
  ulNumbers.classList.add('numbers')

  for (var i = 0; i < state.board.length; i++) {
    var currentNumber = state.board[i];

    var liNumber = document.createElement("li");
    liNumber.textContent = currentNumber;
    liNumber.classList.add('number')

    liNumber.addEventListener("click", handleNumberClick);

    if(isNumberInGame((currentNumber))){
      liNumber.classList.add('select-number')
    }

    ulNumbers.appendChild(liNumber);
  }
  divBoard.appendChild(ulNumbers);
}

function handleNumberClick(event) {
  var value = Number(event.currentTarget.textContent);

  if (isNumberInGame(value)) {
    removeNumberFromGame(value);
  } else {
    addNumberToGame(value);
  }

  render();
  console.log(state.currentGame);
}

function renderButtons() {
  var divButtons = document.querySelector("#megasena-buttons");
  divButtons.innerHTML = '';

  var buttonNewGame = createNewGameButton();
  var buttonRandomGame = createRandomGameButton();
  var buttonSaveGame =  createSaveGameButton();

  divButtons.appendChild(buttonNewGame);
  divButtons.appendChild(buttonRandomGame);
  divButtons.appendChild(buttonSaveGame);
}

function createSaveGameButton() {
  var button = document.createElement("button");
  button.textContent = 'Salva jogo';
  button.disabled = !isGameComplete();

  button.addEventListener('click', saveGame);

  return button;
}

function createRandomGameButton() {
  var button = document.createElement("button");
  button.textContent = 'Jogo aleatório';

  button.addEventListener('click', randomGame);

  return button;
}

function createNewGameButton() {
  var button = document.createElement("button");
  button.textContent = 'Novo jogo';

  button.addEventListener('click', newGame);

  return button;
}

function renderSavedGames() {
  var divSavedGames = document.querySelector("#megasena-saved-games");
  divSavedGames.innerHTML = "";

  if(state.savedGame.length === 0) {
    divSavedGames.innerHTML = '<p>Nenhum jogo salvo</p>'
  } else {
    var ulSavedGames = document.createElement('ul');

    for (var i = 0; i < state.savedGame.length; i++) {
      var currentGame = state.savedGame[i]

      var liGame = document.createElement('li');
      liGame.textContent = currentGame.join(', ');

      ulSavedGames.appendChild(liGame);
    }
    divSavedGames.appendChild(ulSavedGames);
  }
}

function addNumberToGame(numberToAdd) {
  if (numberToAdd < 1 || numberToAdd > 60) {
    console.error("Número invalido", numberToAdd);
    return;
  }

  if (state.currentGame.length >= 6) {
    console.error("O jogo ja esta completo.");
    return;
  }

  if (isNumberInGame(numberToAdd)) {
    console.error("Este número ja esta incluso no jogo", numberToAdd);
    return;
  }

  state.currentGame.push(numberToAdd);
}

function removeNumberFromGame(numberToRemove) {
  if (numberToRemove < 1 || numberToRemove > 60) {
    console.error("Número invalido", numberToRemove);
    return;
  }

  var newGame = [];

  for (var i = 0; i < state.currentGame.length; i++) {
    var currentNumber = state.currentGame[i];

    if (currentNumber === numberToRemove) {
      continue;
    }

    newGame.push(currentNumber);
  }
  state.currentGame = newGame;
}

function isNumberInGame(numberToCheck) {
  // if(state.currentGame.includes(numberToCheck)){
  //     return true;
  // }
  // return false;

  return state.currentGame.includes(numberToCheck);
}

function saveGame() {
  if (!isGameComplete()) {
    console.error("O jogo não está completo");
    return;
  }
  state.savedGame.push(state.currentGame);
  newGame();
}

function isGameComplete() {
  return state.currentGame.length === 6;
}

function resetGame() {
  state.currentGame = [];
}

function randomGame() {
  resetGame();
  
  while(!isGameComplete()){
    var randomNumber = Math.ceil(Math.random() * 60);
    addNumberToGame(randomNumber);

  }
  render();
}

start();
