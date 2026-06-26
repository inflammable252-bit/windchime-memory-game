const runes = ["T", "X", "Diamond", "Circle", "Triangle"];
const interval = 500

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function memoryGame() {
  console.log("MEMORY GAME");
  shuffleRunes()
  for (let i=0; i<5; i++) { //Rune display
    await delay(interval);
    console.log(runes[i])
    displayCurrent(runes[i])
  }
  await delay(interval) // Extra delay

  doSomething();
}

function doSomething() {
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
    }

    floatingRune.style.backgroundImage = `url(./${current})`
}

const buttons = document.getElementById("picker")
buttons.addEventListener("click", (e) => {
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
        case "t":
            target="T.jpg";
            break;
    }
})

memoryGame();