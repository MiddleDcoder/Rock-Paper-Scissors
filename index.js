// play Button function
const playBtn = document.querySelector(".playBtn");
playBtn.addEventListener("click", playGame);

// Play the entire game
function playGame() {

    // global variables scope
    let roundCount = 1;
    // score variables
    let humanScore = 0;
    let computerScore = 0;
    // RPS choices


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