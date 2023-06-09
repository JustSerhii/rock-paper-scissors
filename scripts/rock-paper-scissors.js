let score = JSON.parse(localStorage.getItem('score')) ||
{
  wins: 0,
  losses: 0,
  ties: 0,
};

updateScoreElement();

let isAutoPlaying = false;
let intervalId;

function autoPlay(){
  if (!isAutoPlaying){
    intervalId = setInterval(() => {
      const playerMove = pickComputerMove();
      playGame(playerMove);
    }, 500);
    isAutoPlaying = true;
  } else {
    clearInterval(intervalId);
    isAutoPlaying = false;
  }
}

function startLoadingAutoPlay(){
  setTimeout(function(){
    changeAutoPlayButton();
  }, 500);
}

function changeAutoPlayButton(){
  const autoPlayButton = document.querySelector('.js-auto-play-button');
  if (autoPlayButton.innerText === 'Auto Play'){
    autoPlayButton.innerHTML = 'Loading...';
    startLoadingAutoPlay();
  } else if (autoPlayButton.innerText === 'Loading...'){
    autoPlayButton.innerHTML = 'Stop Auto Play';
  } else {
    autoPlayButton.innerHTML = 'Auto Play';
  return;
}
}

function addClickListener(elementSelector, gameOption) {
  document.querySelector(elementSelector).addEventListener('click', () => {
    playGame(gameOption);
  });
}

addClickListener('.js-rock-button', 'Rock');
addClickListener('.js-paper-button', 'Paper');
addClickListener('.js-scissors-button', 'Scissors');

/* document.querySelector('.js-rock-button').addEventListener('click', () => {
  playGame('Rock');
})

document.querySelector('.js-paper-button').addEventListener('click', () => {
  playGame('Paper');
})

document.querySelector('.js-scissors-button').addEventListener('click', () => {
  playGame('Scissors');
}) */

document.querySelector('.js-auto-play-button').addEventListener('click', () => {
  changeAutoPlayButton();
  autoPlay();
})

document.querySelector('.js-reset-button').addEventListener('click', () => {
  resetScore();
})

document.body.addEventListener('keydown', (event) => {
  console.log(event.key);
})

function playGame(playerMove){
  const computerMove = pickComputerMove();
  let result = '';

  if (playerMove === 'Scissors'){
    if (computerMove === 'Rock'){
      result = 'You lose!';
    } else if (computerMove === 'Paper'){
      result = 'You win!';
    } else {
      result = 'Tie!';
    }
  } else if (playerMove === 'Paper'){
    if (computerMove === 'Rock'){
      result = 'You win!';
    } else if (computerMove === 'Paper'){
      result = 'Tie!';
    } else {
      result = 'You lose!';
    }
  } else if (playerMove === 'Rock'){
    if (computerMove === 'Rock'){
      result = 'Tie!';
    } else if (computerMove === 'Paper'){
      result = 'You lose!';
    } else {
      result = 'You win!';
    }
  }

  if (result === 'You win!'){
    score.wins++;
  } else if (result === 'You lose!'){
    score.losses++;
  } else {
    score.ties++;
  }

  localStorage.setItem('score', JSON.stringify(score));

  updateScoreElement();

  document.querySelector('.js-result')
    .innerHTML = result;

  document.querySelector('.js-moves')
    .innerHTML = `You
<img src="images/${playerMove}-emoji.png" class="move-icon">
<img src="images/${computerMove}-emoji.png" class="move-icon">
Computer`;

}

function updateScoreElement(){
  document.querySelector('.js-score')
    .innerHTML = `wins: ${score.wins}, losses: ${score.losses}, ties: ${score.ties}`;
}

function resetScore(){
  score.wins = 0;
  score.losses = 0;
  score.ties = 0;
  localStorage.removeItem('score');
  const result = document.querySelector('.js-result');
  result.innerHTML = '';
  const moves = document.querySelector('.js-moves');
  moves.innerHTML = '';
  updateScoreElement();
}

function pickComputerMove(){
  const randomNumber = Math.random();
  let computerMove = '';

  if (randomNumber >= 0 && randomNumber < 1/3){
    computerMove = 'Rock';
  } else if (randomNumber >= 1/3 && randomNumber < 2/3){
    computerMove = 'Paper';
  } else {
    computerMove = 'Scissors';
  }
  return computerMove;
}