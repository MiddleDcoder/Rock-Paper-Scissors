// Register Event Listeners global
const playBtn = document.querySelector(".play-btn");
const choiceButtons = document.querySelectorAll(".choice-btn");
const choicesDiv = document.querySelector(".choices");
const roundShow = document.querySelector(".round-show");
const scoreShow = document.querySelector(".score-show");

const playerScoreShow = document.querySelector(".player-score-show");
const computerScoreShow = document.querySelector(".computer-score-show");
const roundWin = document.querySelector(".round-win");

const startScreen = document.querySelector("#start-screen");
const resultScreen = document.querySelector("#result-screen");
const gameOverScreen = document.querySelector("#game-over-screen");
const gameWinnerText = document.querySelector(".game-winner");

const restartBtn = document.querySelector(".restart-btn");
const mainMenuBtn = document.querySelector(".main-menu-btn");

// Declare global variables scope
let roundCount, humanScore, computerScore, gameOver, stopGame;
let maxPoints = 5;

playBtn.addEventListener("click", startGame);

// play Button function
function startGame() {
  // reset the text shows
  roundShow.textContent = "";
  playerScoreShow.textContent = "";
  computerScoreShow.textContent = "";
  roundWin.textContent = "";
  // Initialize score and round count
  roundCount = 1;
  humanScore = 0;
  computerScore = 0;
  stopGame = 0;
  startScreen.classList.add("hidden");
  choicesDiv.classList.remove("hidden");
  resultScreen.classList.remove("hidden");
}

// get the Computer Choice
function getComputerChoice() {
  const choices = ["Rock", "Paper", "Scissors"];
  return choices[Math.floor(Math.random() * 3)];
}

// play per round
function playRound(humanChoice, computerChoice) {
  if (humanChoice === computerChoice) {
    return "Draw! Please try again.";
  }

  const winConditions =
    (humanChoice === "Rock" && computerChoice === "Scissors") ||
    (humanChoice === "Paper" && computerChoice === "Rock") ||
    (humanChoice === "Scissors" && computerChoice === "Paper");

  if (winConditions) {
    humanScore++;
    return `You win! 🥳 ${humanChoice} beats ${computerChoice}`;
  } else {
    computerScore++;
    return `You lose! 😔 ${computerChoice} beats ${humanChoice}`;
  }
}

// Handle the choices
function handleChoice(e) {
  if (stopGame === maxPoints) return;

  const humanChoice = e.target.getAttribute("data-choice"); // get the Human Choice
  const computerChoice = getComputerChoice();
  const result = playRound(humanChoice, computerChoice);

  roundShow.textContent = `Round ${roundCount} Fight!`;
  playerScoreShow.textContent = `PLAYER SCORE: ${humanScore}`;
  computerScoreShow.textContent = `COMPUTER SCORE: ${humanScore}`;
  roundWin.textContent = result;
  scoreShow.textContent = `Score - Human: ${humanScore}, Computer: ${computerScore}`;

  roundCount++;

  gameOver = computerScore === maxPoints || humanScore === maxPoints;

  // Display final result
  if (gameOver) {
    // scoreShow.textContent = `Score - Human: ${humanScore}, Computer: ${computerScore}`;
    let finalResult;
    if (humanScore > computerScore) {
      finalResult = "Game Winner is Human";
    } else {
      finalResult = "Game Winner is Computer";
    }
    choicesDiv.classList.add("hidden");
    gameOverScreen.classList.remove("hidden");
    gameWinnerText.textContent = finalResult;
    stopGame = 5; // stop the game if still clicking the choices button

    // end button selection
    restartBtn.addEventListener("click", () => {
      gameOverScreen.classList.add("hidden");
      resultScreen.classList.add("hidden");
      // reset stopGame so can play again
      startGame();
    });

    mainMenuBtn.addEventListener("click", () => {
      gameOverScreen.classList.add("hidden");
      resultScreen.classList.add("hidden");
      startScreen.classList.remove("hidden");
    });
  }
}

// Attach event listener to each choice button
choiceButtons.forEach((button) => {
  button.addEventListener("click", handleChoice);
});
