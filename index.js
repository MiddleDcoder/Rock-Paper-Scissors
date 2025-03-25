// play Button function
const playBtn = document.querySelector(".playBtn");
playBtn.addEventListener("click", gameStart);

// Play the entire game
function gameStart() {

    //global variables scope
    let roundCount = 1;
    // score variables
    let humanScore = 0;
    let computerScore = 0;

    //get the Computer Choice
    function getComputerChoice() {
        let randomChoice = "RPS";
        let comptChoice = randomChoice.charAt(Math.floor(Math.random() * 3));

        if (comptChoice === "R"){
            return "Rock";
        } 
        if (comptChoice === "P"){
            return "Paper";
        } 
        return "Scissors";
    }
    
    // get the Human Choice
    function getHumanChoice() {
        let playerValue = prompt("Please type between choices: r / R (for Rock), p / P (for Paper) , s / S (for Scissors)", "P");

        if (playerValue === "R" || playerValue === "r" ) {
            return "Rock";
        }
        if (playerValue === "P" || playerValue === "p" ) {
            return "Paper";
        }
        if (playerValue === "S" || playerValue === "s" ) {
            return "Scissors";
        }
        //default value when enter wrong input - will update later to handle rePrompting
        return "Paper";
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
         
        //first round result
        console.log(`Round ${roundCount}:`);
        console.log(playRound(getHumanChoice(), getComputerChoice()));
        console.log(`Score - Human: ${humanScore}, Computer: ${computerScore}`);

        // call playRound 2 times
        console.log(`Round ${roundCount}:`);
        console.log(playRound(getHumanChoice(), getComputerChoice()));
        console.log(`Score - Human: ${humanScore}, Computer: ${computerScore}`);
            
        // call playRound 3 times
        console.log(`Round ${roundCount}:`);
        console.log(playRound(getHumanChoice(), getComputerChoice()));
        console.log(`Score - Human: ${humanScore}, Computer: ${computerScore}`);

        // call playRound 4 times
        console.log(`Round ${roundCount}:`);
        console.log(playRound(getHumanChoice(), getComputerChoice()));
        console.log(`Score - Human: ${humanScore}, Computer: ${computerScore}`);
 
        // call playRound 5 times
        console.log(`Round ${roundCount}:`);
        console.log(playRound(getHumanChoice(), getComputerChoice()));
        console.log(`Score - Human: ${humanScore}, Computer: ${computerScore}`);

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