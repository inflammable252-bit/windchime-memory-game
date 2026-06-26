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
  }
  await delay(interval) // Extra delay

  console.log("Delay complete");
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

memoryGame();