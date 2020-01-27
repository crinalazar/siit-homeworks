
const arr = ["rock", "paper", "scissors"];

function hasChosen(rock, paper, scissors){
    let randomObj = arr[Math.floor(Math.random()*arr.length)];
    
    if (randomObj === arr[0]){
        rock.classList.remove("hidden");
    } else if (randomObj === arr[1]){
        paper.classList.remove("hidden");
    } else {
        scissors.classList.remove("hidden");
    }
    return randomObj;
}


function play(){
    let user = hasChosen(urock, upaper, uscissors);
    let computer = hasChosen(crock, cpaper, cscissors);

    if (user === computer){
        tie.classList.remove("hidden");
    } else if ((user === "rock") && (computer === "paper")){
        cwins.classList.remove("hidden");
    } else if ((user === "rock") && (computer === "scissors")){
        uwins.classList.remove("hidden");
    } else if ((user === "paper") && (computer === "rock")){
        uwins.classList.remove("hidden");
    } else if ((user === "paper") && (computer === "scissors")){
        cwins.classList.remove("hidden");
    } else if ((user === "scissors") && (computer === "rock")){
        cwins.classList.remove("hidden");
    } else {
        uwins.classList.remove("hidden");
    }
    
    button.removeEventListener("click", play);
}

const button = document.querySelector(".play");
button.addEventListener("click", play);



const urock = document.querySelector("[urock]");
const upaper = document.querySelector("[upaper]");
const uscissors = document.querySelector("[uscissors]");

const crock = document.querySelector("[crock]");
const cpaper = document.querySelector("[cpaper]");
const cscissors = document.querySelector("[cscissors]");

const tie = document.querySelector("[tie]");
const uwins = document.querySelector("[uwins]");
const cwins = document.querySelector("[cwins]");















