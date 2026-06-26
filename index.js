const runes = ["T", "X", "diamond", "circle", "triangle"];
const colors = ["normal", "red", "blue"];
const colorRegular = "rgb(47, 43, 53)";
const colorRed = "rgb(119, 79, 88)";
const colorBlue = "rgb(91, 87, 124)";
const gameLengthSeconds = 10;
const interval = (gameLengthSeconds*1000) / 8;
let restartGame = false;

let selection = [];
let pickCount = 0;

let winMessagesArr = ["Great prog!", "Now we can see the rest of P1!", "The rest of the fight is easy, right?"]
let loseMessagesArr = ["Should have flasked.", "Did you forget to repair?", "So much lag.", "Hearthing saves repairs."]
let winMessage = `Success! ${winMessagesArr[Math.floor(Math.random() * winMessagesArr.length)]}`
let loseMessage = `Wipe! ${loseMessagesArr[Math.floor(Math.random() * loseMessagesArr.length)]}`
let result = loseMessage;

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}



async function memoryGame() {
    await delay(interval)
    pickCount = 0;
    selection = [];
    console.log("MEMORY GAME");
    shuffleRunes()
    for (let i=0; i<5; i++) { //Rune display
        if (restartGame===true) {
            break;
        }
        else if (restartGame===false) {
            await delay(interval);
            console.log("Icon " + i + ": " + runes[i])
            displayCurrent(runes[i])
        }
        console.log("resetGame: ", restartGame)
        }
    if (restartGame===true) {
        console.log("Game restarted!")
        restartGame=false;
        return;
    }
    displayCurrent("clear");
    await delay(interval); // Extra delay
    checkSelection()
    console.log(result);
    console.log("resetGame: ", restartGame)
}

function checkSelection() {
    selection.forEach((item, index) => {
        if (item === runes[index]) {
            result = winMessage;
        } 
        else {
            result = loseMessage;
            return
        }
        console.log(selection[index], "vs", runes[index])
    })
    console.log(selection)
    console.log(runes)
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
        case "circle":
            current="circle.jpg";
            break;
        case "diamond":
            current="diamond.jpg";
            break;
        case "triangle":
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
    let url;
    switch (e.target.id) {
        case "picker":
            return;
        case "X":
            url="X.jpg";
            break;
        case "circle":
            url="circle.jpg";
            break;
        case "diamond":
            url="diamond.jpg";
            break;
        case "triangle":
            url="triangle.jpg";
            break;
        case "T":
            url="T.jpg";
            break;
    }
    selectRune(url, e.target.id)
})
function selectRune(url, target) {
    if (pickCount === 5) {
        console.log("End!"); return
     }
    selection.push(target)
    runeSlots[pickCount].style.backgroundImage = `url(./${url})`
    pickCount++
    console.log(selection)
}
const menuButtons = document.querySelector("nav");

menuButtons.addEventListener("click", (e) => {
    refreshRestartButton()
    switch (e.target.id) {
        case ("restart"):
            console.log("restart clicked!")
            restartGame = true;
            clearUI();
            memoryGame()
            break;
    }
})
function clearUI() {
    const currentIcon = document.getElementById("current-icon");
    currentIcon.style.backgroundImage = "";
    runeSlots.forEach((slot) => {
        slot.style.backgroundImage = "";
    })
}
function refreshRestartButton() {
    const button = document.getElementById("restart");
    if (restartGame === true) {
        button.classList.add("wait");
    }
    else button.classList.remove("wait");
}

memoryGame()