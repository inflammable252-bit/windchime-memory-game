const runes = ["T", "X", "diamond", "circle", "triangle"];
const colors = ["normal", "red", "blue"];
const colorRegular = "rgb(47, 43, 53)";
const colorRed = "rgb(119, 79, 88)";
const colorBlue = "rgb(91, 87, 124)";
// const gameLengthSeconds = 5;
// const interval = (gameLengthSeconds*1000) / 8;
const interval = 1500;
let selection = [];
let pickCount = 0;

let mode = "normal";

let locations = ["upstairs", "red", "blue"];
let playerLoc = "upstairs";

let result = "loss";
let resultText ;

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function Pull() {    
    let restartGame = false;

    console.log("MEMORY GAME");
    updateMessages().clear()
    memoryGame()

    async function memoryGame() {
        shuffleRunes()
        locationRandomizer()
        updateLoc(playerLoc)
        await delay(interval);
        let counter = 0;
        while (restartGame===false && counter < 5) { //Rune display
            if (playerLoc === "blue" && counter !== 2) {
                selectRune(runes[counter]);
            }
            if (playerLoc === "red" && (counter !== 1 && counter !==4)) {
                selectRune(runes[counter]);
            }
            displayCurrent(runes[counter]);
            console.log("Icon ", counter , ": ", runes[counter])
            counter++
            console.log("pickCount: ", pickCount)
            await delay(interval);
        }
        if (restartGame===true) {
            console.log("Game restarted!")
            restartGame=false;
            return;
        }
        displayCurrent("clear");
        await delay(interval*2); // Extra delay
        if (restartGame===false) {
        checkSelection(playerLoc)
        updateLoc("upstairs")
        updateMessages().winOrLoss()
        // console.log("resetGame: ", restartGame)
        }
    }

    function getRestart() {
        return restartGame
    }
    function updateRestart(boolean) {
        restartGame = boolean;
    }
    return {getRestart, updateRestart}
}
function locationRandomizer() {
    playerLoc = locations[Math.floor(Math.random() * locations.length)]
}
function updateLoc(color) {
    const bg = document.getElementById("bg-colorizer");
    switch (color) {
        case ("upstairs"):
            bg.style.backgroundColor = "var(--bg)";
            break;
        case ("blue"):
            bg.style.backgroundColor = "var(--blue-bg)";
            break;
        case ("red"): 
            bg.style.backgroundColor = "var(--red-bg)";
            break;
    }
}
function checkSelection(color="upstairs") {
    selection.forEach((item, index) => {
        if (item === runes[index]) {
            result = "win";
        } 
        else if (item !== runes[index]) {
            result = "lose";
            return
        }
        if (selection.length < runes.length) {
            result = "lose"
        }
    })
    console.log("Windchime: ", runes);
    console.log("Player color: ", playerLoc)
    console.log("Player: ", selection);
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
    if (rune === "clear") {
        floatingRune.style.backgroundImage = "";
        return
    }
    floatingRune.style.backgroundImage = `url(./${rune}.jpg)`
}

const picker = document.getElementById("picker");
const runeSlots = document.querySelectorAll("div.rune");
picker.addEventListener("click", (e) => {
    if (e.target.id === "picker") return;
    selectRune(e.target.id)
})
function selectRune(runeName) {
    if (pickCount === 5) {
        console.log("End!"); return
    }
    selection.push(runeName);
    runeSlots[pickCount].style.backgroundImage = `url(./${runeName}.jpg)`;
    pickCount++
}
const menuButtons = document.querySelector("nav");

menuButtons.addEventListener("click", (e) => {
    switch (e.target.id) {
        case ("restart"):
            console.log("restart clicked!")
            currentGame.updateRestart(true);
            clearUI();
            currentGame = Pull()
            break;
    }
})
function clearUI() {
    const currentIcon = document.getElementById("current-icon");
    currentIcon.style.backgroundImage = "";
    runeSlots.forEach((slot) => {
        slot.style.backgroundImage = "";
    })
    selection = [];
    pickCount = 0
}
// function refreshRestartButton() {
//     const button = document.getElementById("restart");
//     if (currentGame.getRestart === true) {
//         button.classList.add("wait");
//     }
//     else button.classList.remove("wait");
// }
function updateMessages() {
    const alert = document.getElementById("alert");
    const window = document.getElementById("message-area");
    const message = document.getElementById("message");
    
    let winMessagesArr = ["Great prog!", "Now we can see the rest of P1!", "The rest of the fight is easy, right?", "n i c e", "100 parse for sure."]
    let loseMessagesArr = ["Should have flasked.", "Did you forget to repair?", "So much lag.", "Hearthing saves repairs.", "Definitely RNG.", "Anyone logging?", "You were pumping.", "They should have given you PI."]
    let winMessage = () => {
        const randomMsg = winMessagesArr[Math.floor(Math.random() * winMessagesArr.length)]
        return randomMsg;
        }
    let loseMessage = () => {
        const randomMsg = loseMessagesArr[Math.floor(Math.random() * loseMessagesArr.length)]
        return randomMsg;
        }
    
    function determineResultText() {
    result === "win" ? resultText = winMessage() : resultText = loseMessage()
    }

    function winOrLoss() {
        let alertText;
        if (result === "win") {
            alertText = "SUCCESS";
            message.textContent = winMessage();
            alert.classList.add("great-success");
        }
        else {
            alertText = "YOU ARE DEAD";
            message.textContent = loseMessage();
            alert.classList.add("whoops")
            }
        alert.textContent = alertText;
        console.log(alert.textContent)
        
        // then style.animation
    }

    function clear() {
        result = loseMessage;
        alert.textContent = "";
        message.textContent = "";
        alert.classList.remove("great-success");
        alert.classList.remove("whoops");
    }

    return {winOrLoss, clear}
}

function postResults() {
    
}

/* Adapted from https://dev.to/thormeier/old-school-tech-how-to-animate-the-classic-dvd-logo-bouncing-11d9 */

let glaive = document.querySelector("div.glaive-wrapper");
function addGlaiveBounce() {
    let body = document.querySelector("body")
    let topDelta = 1;
    let leftDelta = 1;

    setInterval(() => {
        const currentTop = parseInt(glaive.style.top) || 0;
        const currentLeft = parseInt(glaive.style.left) || 0;
        const currentRight = currentLeft + glaive.clientWidth;
        const currentBottom = currentTop + glaive.clientWidth;

        if (currentBottom >= body.clientHeight) {
            topDelta = -2;
        }
        if (currentTop <= 0) {
            topDelta = 2
        }
        if (currentRight >= body.clientWidth) {
            leftDelta = -2
        }
        if (currentLeft <= 0) {
            leftDelta = 2
        }
        glaive.style.top = currentTop + topDelta + "px";
        glaive.style.left = currentLeft + leftDelta + "px"
    }, 5)
}
function addGlaiveMouseover() {
    glaive.addEventListener("mouseover", () => {
        glaive.style.backgroundColor = "blue"
    })
}
// addGlaiveBounce()
addGlaiveMouseover()
let currentGame = Pull();
