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

