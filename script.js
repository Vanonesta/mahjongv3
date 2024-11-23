const symbols = [
  { image: "mahjong1.png", value: 100 },
  { image: "mahjong2.png", value: 200 },
  { image: "mahjong3.png", value: 500 },
  { image: "mahjong4.png", value: 1000 },
  { image: "mahjong5.png", value: 5000 },
];

const creditsDisplay = document.getElementById("credits");
const jackpotDisplay = document.getElementById("jackpot");
const totalBetDisplay = document.getElementById("totalBet");
const betAmountSelector = document.getElementById("betAmount");
const spinButton = document.getElementById("spinButton");
const toggleMusicButton = document.getElementById("toggleMusic");
const backgroundMusic = document.getElementById("backgroundMusic");
const spinSound = document.getElementById("spinSound");
const winSound = document.getElementById("winSound");

let credits = 500;
let jackpot = 10000;

// Spin Reels
function spinReel(reel) {
  const results = Array(3)
    .fill()
    .map(
      () =>
        symbols[Math.floor(Math.random() * symbols.length)].image
    );

  reel.innerHTML = results
    .map((symbol) => `<div><img src="assets/images/${symbol}" alt="Symbol"></div>`)
    .join("");

  return results;
}

// Spin Button Logic
spinButton.addEventListener("click", () => {
  if (credits <= 0) {
    alert("Kredit tidak cukup!");
    return;
  }

  const reels = [
    spinReel(document.getElementById("reel1")),
    spinReel(document.getElementById("reel2")),
    spinReel(document.getElementById("reel3")),
  ];

  spinSound.play();

  setTimeout(() => {
    const win = checkPaylines(reels);
    if (win > 0) {
      credits += win;
      winSound.play();
      alert(`Selamat! Anda menang ${win} kredit!`);
    } else {
      credits -= Number(betAmountSelector.value);
    }
    creditsDisplay.textContent = credits;
  }, 1500);
});

// Check Paylines
function checkPaylines(reels) {
  const topRow = [reels[0][0], reels[1][0], reels[2][0]];
  const middleRow = [reels[0][1], reels[1][1], reels[2][1]];
  const bottomRow = [reels[0][2], reels[1][2], reels[2][2]];
  const diagonal1 = [reels[0][0], reels[1][1], reels[2][2]];
  const diagonal2 = [reels[0][2], reels[1][1], reels[2][0]];

  const paylines = [topRow, middleRow, bottomRow, diagonal1, diagonal2];
  let winAmount = 0;

  paylines.forEach((line) => {
    if (line[0] === line[1] && line[1] === line[2]) {
      const winSymbol = symbols.find((symbol) => symbol.image === line[0]);
      winAmount += winSymbol.value;
    }
  });

  return winAmount;
}