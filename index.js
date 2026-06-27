const runes = ["T", "X", "diamond", "circle", "triangle"];
const colors = ["normal", "red", "blue"];
const colorRegular = "rgb(47, 43, 53)";
const colorRed = "rgb(119, 79, 88)";
const colorBlue = "rgb(91, 87, 124)";
const gameLengthSeconds = 5;
const interval = (gameLengthSeconds*1000) / 8;
let selection = [];
let pickCount = 0;

let result = "loss";
let resultText ;

//add another win check variable

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
        await delay(interval);
        let counter = 0;
        while (restartGame===false && counter < 5) { //Rune display
            console.log("Icon " + counter + ": " + runes[counter])
            displayCurrent(runes[counter])
            console.log("resetGame: ", restartGame)
            counter++
            await delay(interval);
            }
        if (restartGame===true) {
            console.log("Game restarted!")
            restartGame=false;
            return;
        }
        displayCurrent("clear");
        await delay(interval); // Extra delay
        checkSelection()
        updateMessages().winOrLoss()
        console.log(result);
        console.log("resetGame: ", restartGame)
    }

    function getRestart() {
        return restartGame
    }
    function updateRestart(boolean) {
        restartGame = boolean;
    }
    return {getRestart, updateRestart}
}
function checkSelection() {
    selection.forEach((item, index) => {
        if (item === runes[index]) {
            result = "win";
        } 
        else {
            result = "lose";
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
function refreshRestartButton() {
    const button = document.getElementById("restart");
    if (currentGame.getRestart === true) {
        button.classList.add("wait");
    }
    else button.classList.remove("wait");
}
function updateMessages() {
    const alert = document.getElementById("alert");
    const window = document.getElementById("message-area");
    const message = document.getElementById("message");
    
    let winMessagesArr = ["Great prog!", "Now we can see the rest of P1!", "The rest of the fight is easy, right?"]
    let loseMessagesArr = ["Should have flasked.", "Did you forget to repair?", "So much lag.", "Hearthing saves repairs."]
    let winMessage = () => {
        const randomMsg = winMessagesArr[Math.floor(Math.random() * winMessagesArr.length)]
        return `Win! ${randomMsg}`
        }
    let loseMessage = () => {
        const randomMsg = loseMessagesArr[Math.floor(Math.random() * loseMessagesArr.length)]
        return `Wipe! ${randomMsg}`
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

let currentGame = Pull();