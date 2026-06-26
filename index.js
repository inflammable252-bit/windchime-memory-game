const runes = ["T", "X", "Diamond", "Circle", "Triangle"];
const colors = ["normal", "red", "blue"];
const colorRegular = "rgb(47, 43, 53)";
const colorRed = "rgb(119, 79, 88)";
const colorBlue = "rgb(91, 87, 124)";
const interval = 500;
let gameActive = false;

let selection = [];
let round = 1;

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function memoryGame() {
  if (gameActive = true) {
    console.log("Restarting...")
    await delay(interval*2)
  }
  console.log("MEMORY GAME");
  shuffleRunes()
  gameActive = true;
  for (let i=0; i<5; i++) { //Rune display
    if (gameActive===true) {
    await delay(interval);
    console.log(runes[i])
    displayCurrent(runes[i])
    }
    else if (gameActive===false) {
        console.log("Game deactivated!")
        return
    }
}
await delay(interval); // Extra delay
gameActive = false;
displayCurrent("clear");
checkSelection();
}

function checkSelection() {
  console.log("Next task!");
}

function shuffleRunes() {
    for (let i = 4; i > 0; i--) {
        const j = Math.floor(Math.random()*(i+1));
        [runes[i], runes[j]] = [runes[j], runes[i]]
    }
    console.log(runes)
}

function displayCurrent(rune) {
    let floatingRune = document.getElementById("current-icon");
    let current;
    switch (rune) {
        case "X":
            current="X.jpg";
            break;
        case "Circle":
            current="circle.jpg";
            break;
        case "Diamond":
            current="diamond.jpg";
            break;
        case "Triangle":
            current="triangle.jpg";
            break;
        case "T":
            current="T.jpg";
            break;
        case "clear":
            current = "";
            break;
    }

    floatingRune.style.backgroundImage = `url(./${current})`
}

const picker = document.getElementById("picker");
const runeSlots = document.querySelectorAll("div.rune");
picker.addEventListener("click", (e) => {
    let target;
    switch (e.target.id) {
        case "X":
            target="X.jpg";
            break;
        case "circle":
            target="circle.jpg";
            break;
        case "diamond":
            target="diamond.jpg";
            break;
        case "triangle":
            target="triangle.jpg";
            break;
        case "T":
            target="T.jpg";
            break;
    }
    selectRune(target)
})
function selectRune(target) {
    if (round > 5) {
        console.log("End!"); return
     }
    selection.push(target)
    runeSlots[round-1].style.backgroundImage = `url(./${target})`
    round++
}
const menuButtons = document.querySelector("nav");

menuButtons.addEventListener("click", (e) => {
    switch (e.target.id) {
        case ("restart"):
            resetGame();
            memoryGame();
            break;
            
    }
})
function resetGame() {
    gameActive = false;
    round = 1;
    selection = [];
    const currentIcon = document.getElementById("current-icon");
    currentIcon.style.backgroundImage = "";
    runeSlots.forEach((slot) => {
        slot.style.backgroundImage = "";
    })
}

memoryGame();