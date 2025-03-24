//get the Computer Choice
function getComputerChoice() {
    let randomChoice = "RPS";
    let comptChoice = randomChoice.charAt(Math.floor(Math.random() * 3));

    console.log(comptChoice); //remove this later

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
console.log(resultComp);


// play Button function
const playBtn = document.querySelector(".playBtn");

playBtn.addEventListener("click", () => {

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
    console.log(resultHuman);

});



