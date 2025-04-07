// Register selectors global
const playBtn = document.querySelector(".play-btn");
const choiceButtons = document.querySelectorAll(".choice-btn");
const playerChoiceShow = document.querySelector(".player-choice");
const computerChoiceShow = document.querySelector(".computer-choice");
const choicesDiv = document.querySelector(".choices");
const roundShow = document.querySelector(".round-show");
const timerElem = document.querySelector(".timer");

const playerScoreShow = document.querySelector(".player-score-show");
const computerScoreShow = document.querySelector(".computer-score-show");
const roundWin = document.querySelector(".round-win");

const startScreen = document.querySelector("#start-screen");
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

  roundShow.classList.add("fight-text");
  timerElem.classList.add("fight-text");
  handleRoundAnimation();
}

// Disable buttons during animation
function disableButtons() {
  choiceButtons.forEach((btn) => (btn.disabled = true));
}
// Enable buttons again after animation finishes
function enableButtons() {
  choiceButtons.forEach((btn) => (btn.disabled = false));
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

// Handle the animation and disabling button and enabling again
function handleRoundAnimation() {
  timerChoices();
  roundShow.setAttribute(
    "style",
    "animation: showRound 2.5s ease-in-out forwards;"
  );
  timerElem.setAttribute(
    "style",
    "animation: showRound 2.5s ease-in-out forwards;"
  );
  roundShow.textContent = `Round ${roundCount}... Fight!`;

  disableButtons();

  setTimeout(() => {
    enableButtons();
    offAnimation();
  }, 2500);
}

// Timeout to clear each Round
function clearRound() {
  roundWin.textContent = "";
  playerChoiceShow.innerHTML = "🤔";
  computerChoiceShow.innerHTML = "🤖";
  handleRoundAnimation();
}

// Destroy animation
function offAnimation() {
  roundShow.setAttribute("style", "animation: none; opacity: 1;");
  timerElem.setAttribute("style", "animation: none; opacity: 1;");
}

// Timer before choices
function timerChoices() {
  let count = 4;

  const countdown = setInterval(() => {
    count--;
    if (count > 0) {
      timerElem.textContent = count;
    } else {
      timerElem.textContent = "VS";
      clearInterval(countdown);
    }
  }, 600);
}

// Player  vs Computer - choice showcase
function choiceShow(humanChoice, computerChoice) {
  const icons = {
    Rock: `<i class="fas fa-hand-fist"></i>`,
    Paper: `<i class="fas fa-hand"></i>`,
    Scissors: `<i class="fas fa-hand-scissors"></i>`,
  };

  playerChoiceShow.innerHTML = icons[humanChoice];
  computerChoiceShow.innerHTML = icons[computerChoice];
}

// Handle the choices
function handleChoice(e) {
  if (stopGame === maxPoints) return;

  const humanChoice = e.currentTarget.getAttribute("data-choice"); // get the Human Choice
  const computerChoice = getComputerChoice();
  const result = playRound(humanChoice, computerChoice);

  disableButtons(); // disabled buttons after selecting move

  roundWin.textContent = result;

  playerScoreShow.textContent = `PLAYER SCORE: ${humanScore}`;
  computerScoreShow.textContent = `COMPUTER SCORE: ${computerScore}`;
  playerScoreShow.classList.add("border-scores");
  computerScoreShow.classList.add("border-scores");

  // Player  vs Computer - choice showcase
  choiceShow(humanChoice, computerChoice);

  roundCount++;

  gameOver = computerScore === maxPoints || humanScore === maxPoints;

  if (!gameOver) {
    setTimeout(clearRound, 1500);
  }
  // Display final result
  if (gameOver) {
    setTimeout(() => {
      roundShow.classList.remove("fight-text");
      let finalResult;
      if (humanScore > computerScore) {
        finalResult = "Game Winner is Human 🎉";
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
        startGame();
      });

      mainMenuBtn.addEventListener("click", () => {
        gameOverScreen.classList.add("hidden");
        startScreen.classList.remove("hidden");
      });
    }, 2000);
  }
}

// Attach event listener to each choice button
choiceButtons.forEach((button) => {
  button.addEventListener("click", handleChoice);
});
