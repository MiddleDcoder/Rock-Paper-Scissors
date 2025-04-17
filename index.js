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
const settingsBtn = document.querySelector(".settings-btn");
const settingScreen = document.querySelector("#settings-screen");

const audio = document.querySelector("#bg-music");
const bgMusicSetting = document.querySelector("#bg-music-setting");
const pointsSetting = document.querySelector("#points-setting");
const backMainMenu = document.querySelector("#back-main-menu");

// Declare global variables scope
let roundCount,
  humanScore,
  computerScore,
  gameOver,
  stopGame,
  setMaxPoints,
  maxPoints;

// set maxPoints or default 5
if (setMaxPoints == null) {
  maxPoints = 5;
}

playBtn.addEventListener("click", startGame);

// play Button function
function startGame() {
  // reset the text shows
  reset();
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

// Clear player scores
function reset() {
  roundWin.textContent = "";
  playerScoreShow.textContent = "";
  computerScoreShow.textContent = "";
  playerChoiceShow.innerHTML = "🤔";
  computerChoiceShow.innerHTML = "🤖";
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
      playerScoreShow.classList.remove("border-scores");
      computerScoreShow.classList.remove("border-scores");
      let finalResult;
      if (humanScore > computerScore) {
        finalResult = "Game Winner is Human 🎉";
      } else {
        finalResult = "Game Winner is Computer";
      }
      choicesDiv.classList.add("hidden");
      gameOverScreen.classList.remove("hidden");
      gameWinnerText.textContent = finalResult;
      stopGame = maxPoints; // stop the game if still clicking the choices button

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

//Auto play music for fun
window.addEventListener("load", () => {
  audio.play().catch((err) => {
    console.warn("Autoplay blocked. Waiting for user interaction.", err);

    // Set up fallback on click
    const resumeAudio = () => {
      audio
        .play()
        .then(() => {
          console.log("Audio started after user interaction!");
        })
        .catch((error) => {
          console.error("Still failed to play audio:", error);
        });

      // Remove this listener after first click
      document.removeEventListener("click", resumeAudio);
    };

    document.addEventListener("click", resumeAudio);
  });
});

// Settings feature
settingsBtn.addEventListener("click", () => {
  startScreen.classList.add("hidden");
  settingScreen.classList.remove("hidden");
});
// Back button
backMainMenu.addEventListener("click", () => {
  startScreen.classList.remove("hidden");
  settingScreen.classList.add("hidden");
});

// BG Music Setting
bgMusicSetting.addEventListener("click", () => {
  if (audio.paused) {
    audio
      .play()
      .then(() => {
        bgMusicSetting.textContent = "Pause Music";
      })
      .catch((err) => {
        console.warn("Playback failed", err);
      });
  } else {
    audio.pause();
    bgMusicSetting.textContent = "Play Music";
  }
});

// Set Points Event Setting
pointsSetting.addEventListener("click", () => {
  setMaxPoints = setPoints();
  maxPoints = setMaxPoints;
});
// function to handle the set points with validation
function setPoints() {
  let inputPoints, input;
  let isValid = false;
  do {
    input = prompt(
      "Please enter how many points to win between 3 to 5 as default to 15 max: ",
      "5"
    );
    // cancel prompt action and back to default
    if (input === null) return 5;

    inputPoints = parseInt(input);

    // Validate input
    if (isNaN(inputPoints) || inputPoints < 3 || inputPoints > 15) {
      alert("Please enter a valid number between 3 and 15.");
    } else {
      isValid = true;
    }
  } while (!isValid);

  return inputPoints;
}
