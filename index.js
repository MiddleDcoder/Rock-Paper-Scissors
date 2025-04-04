// Register Event Listeners global
const playBtn = document.querySelector(".play-btn");
const choiceButtons = document.querySelectorAll(".choice-btn");
const choicesDiv = document.querySelector(".choices");
const logDiv = document.querySelector(".log");
const startScreen = document.querySelector("#start-screen");
const resultScreen = document.querySelector("#result-screen");

// Declare global variables scope
let roundCount, humanScore, computerScore;
let maxRounds = 5;

playBtn.addEventListener("click", startGame);

// play Button function
function startGame() {
  // Initialize score and round count
  roundCount = 1;
  humanScore = 0;
  computerScore = 0;
  logDiv.textContent = "";
  choicesDiv.classList.remove("hidden");

  startScreen.classList.add("hidden");

  resultScreen.classList.remove("hidden");
  logDiv.innerHTML += `<p> Game Started! Choose Rock, Paper, or Scissors. </p>`;
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
    return `You win! ${humanChoice} beats ${computerChoice}`;
  } else {
    computerScore++;
    return `You lose! ${computerChoice} beats ${humanChoice}`;
  }
}

// Handle the choices
function handleChoice(e) {
  if (roundCount > maxRounds) return;

  const humanChoice = e.target.getAttribute("data-choice"); // get the Human Choice
  const computerChoice = getComputerChoice();
  const result = playRound(humanChoice, computerChoice);

  logDiv.innerHTML += `<p>Round ${roundCount}: ${result}</p>`;
  logDiv.innerHTML += `<p>Score - Human: ${humanScore}, Computer: ${computerScore}</p><hr>`;

  roundCount++;

  // Display final result
  if (roundCount > maxRounds) {
    let finalResult;
    if (humanScore === computerScore) {
      finalResult = "No Winner. Draw Match!";
    } else if (humanScore > computerScore) {
      finalResult = "Game Winner is Human";
    } else {
      finalResult = "Game Winner is Computer";
    }

    logDiv.innerHTML += `<h3>${finalResult}</h3>`;
    choicesDiv.classList.add("hidden");
  }
}

// Attach event listener to each choice button
choiceButtons.forEach((button) => {
  button.addEventListener("click", handleChoice);
});
