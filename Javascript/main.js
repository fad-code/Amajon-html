const rockButton = document.querySelector('.rock-btn');
const paperButton = document.querySelector('.paper-btn');
const scissorsButton = document.querySelector('.scissors-btn');
const resetButton = document.querySelector('.reset-btn');
const resultText = document.querySelector('#result'); // HARUS ADA ini
const userScoreText = document.querySelector('#user-score');
const botScoreText = document.querySelector('#bot-score');
const userMoveText = document.querySelector ('#user-move');
const botMoveText = document.querySelector ('#bot-move');

rockButton.addEventListener('click', function() {
  const hasil = play('rock');
  resultText.innerText = hasil;
  updateScore(hasil);
});

paperButton.addEventListener('click', function() {
  const hasil = play('paper');
  resultText.innerText = hasil;
  updateScore(hasil);
});

scissorsButton.addEventListener('click', function() {
  const hasil = play('scissors');
  resultText.innerText = hasil;
  updateScore(hasil);
});

resetButton.addEventListener('click', function() {
    userScore = 0
    botScore = 0
    userScoreText.innerText = userScore;
    botScoreText.innerText = botScore;
    resultText.innerText = 'Start Again';
  });



let userScore = 0;
let botScore = 0;

function play(userChoice) {
  const randomNumber = Math.random();
  let computerChoice = '';

  if (randomNumber < 1/3) {
    computerChoice = 'rock';
  } else if (randomNumber < 2/3) {
    computerChoice = 'paper';
  } else {
    computerChoice = 'scissors';
  }
  userMoveText.innerHTML = getImageTag (userChoice);
  botMoveText.innerHTML = getImageTag (computerChoice);

  if (userChoice === computerChoice) {
    return `Draw! You both chose ${userChoice}`;
  } else if (
    (userChoice === 'rock' && computerChoice === 'scissors') ||
    (userChoice === 'paper' && computerChoice === 'rock') ||
    (userChoice === 'scissors' && computerChoice === 'paper')
  ) {
    return `You win! You chose ${userChoice} and bot chose ${computerChoice}`;
  } else {
    return `You lose! You chose ${userChoice} and bot chose ${computerChoice}`;
  }
}

function updateScore (hasil) {
    if (hasil.includes ('You win')){
        userScore++;
        userScoreText.innerText= userScore;
    }
    else if (hasil.includes('You lose')) {
        botScore++;
        botScoreText.innerText = botScore;
    }
    else (hasil.includes) (alert ('Draw'));
}


function getImageTag (choice) {
  if (choice === 'rock') {
    return '<img src="rock-emoji.png" class="move-icon">';
  }
  else if (choice === 'paper') {
    return '<img src="paper-emoji.png" class="move-icon">';
  }
  else if (choice === 'scissors') {
    return '<img src="scissors-emoji.png" class="move-icon">';
  }
}