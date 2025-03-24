// play Button function
const playBtn = document.querySelector(".playBtn");

playBtn.addEventListener("click", () => {

    //global scope
    let humanScore = 0;
    let computerScore = 0;


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
            return "Please select proper value!";
        }
    }
    let resultHuman = getHumanChoice();
    console.log(resultHuman); // remove later


    // play round - rock paper scissor game logic
    function playRound(humanChoice, computerChoice) {

        if (humanChoice === computerChoice) {
            return "Draw! Please try again.";
        }
        
        const winConditions = 
            (humanChoice === "Rock" && computerChoice === "Scissors") ||
            (humanChoice === "Paper" && computerChoice === "Rock") ||
            (humanChoice === "Scissors" && computerChoice === "Paper");

        if (winConditions){
            humanScore++;
            return `You win! ${resultHuman} beats ${resultComp}`;
        } else {
            computerScore++;
            return `You lose! ${resultComp} beats ${resultHuman}`;
        }

    }
        
    const humanSelection = resultHuman; //getHumanChoice();
    const computerSelection = resultComp; //getComputerChoice();

   let playRoundResult = playRound(humanSelection, computerSelection);
    console.log(playRoundResult);

    console.log(humanScore);
    console.log(computerScore);

});