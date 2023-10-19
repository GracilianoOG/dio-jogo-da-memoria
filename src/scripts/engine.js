const emojis = [
  "🐧",
  "🐧",
  "🦄",
  "🦄",
  "🦍",
  "🦍",
  "🐖",
  "🐖",
  "🐔",
  "🐔",
  "🐭",
  "🐭",
  "🐸",
  "🐸",
  "🐎",
  "🐎"
];

const pairMatchedAudio = document.querySelector("#success");
const CHECKING_TIME = 500;
let openCards = [];

function handleClick() {
  if(
    this.classList.contains("boxMatch") || 
    openCards.length === 1 && openCards[0].id === this.id
  ) {
    return;
  }

  if(openCards.length < 2) {
    const cardFlip = new Audio("src/assets/audios/flip.ogg");
    cardFlip.play();
    this.classList.add("boxOpen");
    openCards.push(this);
    if(openCards.length === 2) {
      setTimeout(checkMatch, CHECKING_TIME);
    }
  }
}

function checkMatch() {
  const firstCard = openCards[0];
  const secondCard = openCards[1];

  if(firstCard.innerHTML === secondCard.innerHTML) {
    firstCard.classList.add("boxMatch");
    secondCard.classList.add("boxMatch");
    pairMatchedAudio.currentTime = 0;
    pairMatchedAudio.play();
  } else {
    firstCard.classList.remove("boxOpen");
    secondCard.classList.remove("boxOpen");
  }

  openCards = [];

  if(document.querySelectorAll(".boxMatch").length === emojis.length) {
    setTimeout(() => document.querySelector("#game-results").classList.add("show"), CHECKING_TIME);
  }
}

function init() {
  let shuffleEmojis = emojis.sort(() => 
    (Math.random() > 0.5 ? 1 : -1)
  );

  for(let i = 0; i < emojis.length; i++) {
    let box = document.createElement("button");
    box.className = "item";
    box.id = i;
    box.innerHTML = shuffleEmojis[i];
    box.onclick = handleClick;
    document.querySelector(".game").appendChild(box);
  }
}

function restart() {
  window.location.reload();
}

init();