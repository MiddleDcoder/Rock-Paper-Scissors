// play Button function
const playBtn = document.querySelector(".playBtn");

playBtn.addEventListener("click", () => {

    gameStart();

});


// start the game 
function gameStart() {

    //global variable scope
    let roundCount = 1;
    

    //get the Computer Choice
    function getComputerChoice() {
        let randomChoice = "RPS";
        let comptChoice = randomChoice.charAt(Math.floor(Math.random() * 3));

        if (comptChoice === "R"){
            return "Rock";
        } else if (comptChoice === "P"){
            return "Paper";
        } else {
        return "Scissors";
        }
    }
    // Store the returned value in a variable or log it directly
    let resultComp = getComputerChoice();
    console.log(resultComp); // remove later


    // get the Human Choice
    function getHumanChoice() {
        let playerValue = prompt("Please type between choices: r / R (for Rock), p / P (for Paper) , s / S (for Scissors)", "P");

        if (playerValue === "R" || playerValue === "r" ) {
            return "Rock";
        } else if (playerValue === "P" || playerValue === "p" ) {
            return "Paper";
        } else if (playerValue === "S" || playerValue === "s" ) {
        return "Scissors";
        } else {
            //default value when enter wrong input - will update later to handle rePrompting
            return "Paper";
        }
    }
    let resultHuman = getHumanChoice();
    console.log(resultHuman); // remove later


    // Play the entire game
    function playGame() {

        // score variables
        let humanScore = 0;
        let computerScore = 0;

        // play round - rock paper scissor game logic
        function playRound(humanChoice, computerChoice) {

            ++roundCount;

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
         
        const humanSelection = resultHuman; //getHumanChoice();
        const computerSelection = resultComp; //getComputerChoice();
        
        //first round result
        console.log(playRound(humanSelection, computerSelection));
        // track the scores
        console.log(humanScore);
        console.log(computerScore);
        console.log(playRoundCount());

        // call playRound 2 times
        console.log(playRound(getHumanChoice(), getComputerChoice()));
            console.log(humanScore);
            console.log(computerScore);
            console.log(playRoundCount());
            
        // call playRound 3 times
        console.log(playRound(getHumanChoice(), getComputerChoice()));
            console.log(humanScore);
            console.log(computerScore);
            console.log(playRoundCount());

        // call playRound 4 times
        console.log(playRound(getHumanChoice(), getComputerChoice()));
            console.log(humanScore);
            console.log(computerScore);
            console.log(playRoundCount());
 
        // call playRound 5 times
        console.log(playRound(getHumanChoice(), getComputerChoice()));
            console.log(humanScore);
            console.log(computerScore);
            console.log(playRoundCount());

        // play round counter 
        function playRoundCount() {

            const drawResult = (humanScore === computerScore);
            const winnerResult = (humanScore > computerScore);
        
            // declare a winner in the end   
            if (roundCount === 6 && drawResult) {
                return "No Winner Draw Match!";
            } else if (roundCount === 6 && winnerResult) {
                return "Game Winner is Human";
            } else if (roundCount === 6) {
                return "Game Winner is Computer";
            } else {
                return `Play next round ${roundCount}`;
            }
        }

    }

    playGame();

}