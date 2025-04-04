// Register Event Listeners global 
const playBtn = document.querySelector(".play-btn");
const choiceButtons = document.querySelectorAll(".choice-btn");
const choicesDiv = document.querySelector(".choices");
const logDiv = document.querySelector(".log");
const startScreen = document.querySelector("#start-screen")

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

    logDiv.innerHTML += `<p> Game Started! Choose Rock, Paper, or Scissor. </p>`;

    startScreen.classList.add("hidden");
}



// Play the entire game
function playGame() {




    // get the Computer Choice
    function getComputerChoice() {
        const choices = ["Rock", "Paper", "Scissor"];
        return choices[Math.floor(Math.random() * 3)];
    }
    
    // get the Human Choice
    function getHumanChoice() {
        // will change to data attribute approach
    }

    // play round - rock paper scissor game logic
    function playRound(humanChoice, computerChoice) {
        roundCount++;

        if (humanChoice === computerChoice) {
            return "Draw! Please try again.";
        }

        const winConditions = 
            (humanChoice === "Rock" && computerChoice === "Scissors") ||
            (humanChoice === "Paper" && computerChoice === "Rock") ||
            (humanChoice === "Scissors" && computerChoice === "Paper");

        if (winConditions){
            humanScore++;
            return `You win! ${humanChoice} beats ${computerChoice}`;
        } else {
            computerScore++;
            return `You lose! ${computerChoice} beats ${humanChoice}`;
        }

    }
         
    // Function to handle and log each round
    function playAndLog() {
        console.log(`Round ${roundCount}:`);
        console.log(playRound(getHumanChoice(), getComputerChoice()));
        console.log(`Score - Human: ${humanScore}, Computer: ${computerScore}`);
    }

    // Play the match (5 rounds)
    function playMatch() {
        // playAndLog();
        for(i = 0; i < 5; i++) {
            playAndLog();
        }
    }



    playMatch();

    // Display final result
    let result;

    if (humanScore === computerScore) {
        result = "No Winner. Draw Match!";
    } 
    else if (humanScore > computerScore) {
        result = "Game Winner is Human";
    } 
    else {
        result = "Game Winner is Computer";
    }

    console.log(result);

}