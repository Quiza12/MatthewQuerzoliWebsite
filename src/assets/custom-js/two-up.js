var twoCoinGame = true;

var coin1Boolean = false;
var coin2Boolean = false;
var coin3Boolean = false;

var wager = 0;
var winCount = 0;

var totalSpins = 0;
var totalWins = 0;
var totalDraws = 0;
var totalLosses = 0;
var totalWins = 0;

const RESULT = {
    WIN: "win",
    DRAW: "draw",
    LOSS: "loss"
};

function setup() {
  coin1Boolean = getRandomBoolean();
  coin2Boolean = getRandomBoolean();
  coin3Boolean = getRandomBoolean();

  document.getElementById("win").innerHTML = "Come in spinner!";

  captureWager(Number(document.getElementById("wager").value));
}

function captureWager(capturedWager) {
  if (winCount == 0) {
    if (capturedWager == 0) {
      wager = 0;
      document.getElementById("wagerWrapper").style.display = "none";
    } else {
      wager = capturedWager;
      document.getElementById("wagerWrapper").style.display = "block";
    }
    document.getElementById("wager").disabled = true;
    document.getElementById("totalWager").innerHTML = "Staked $" + wager;
  } 
}

const coin = document.querySelector(".coin");

coin.addEventListener("animationend", () => { // only show result on coin animation end
  var win = isWin();
  processResult(win)
  updateStats();
  
  document.getElementById("win").innerHTML = logWin(win);

  // Disable trigger/hover of paddle when there is none visible.
  document.getElementById("throw").disabled = true;
  document.querySelector('.paddle').classList.add('no-hover');

  logResult(win);
});

function processResult(win) {
  totalSpins += 1;

  if (win == RESULT.WIN) {
    totalWins += 1; 
    winCount += 1;
    wager = wager * 2;
    if (winCount == 3) { 
      winCount = 0;
      document.getElementById("wager").disabled = false;
      if (wager > 0) {
        document.getElementById("totalWager").innerHTML = "You won $" + wager + "!";
      }
    }
  } else if (win == RESULT.DRAW)  {
    totalDraws += 1; 
  } else if (win == RESULT.LOSS)  {
    totalLosses += 1; 
    winCount = 0;
    document.getElementById("wager").disabled = false;
    document.getElementById("totalWager").innerHTML = "Lost $" + wager + "..." ;
  }
}

function updateStats() {
  document.getElementById("totalSpins").innerHTML = totalSpins;
  document.getElementById("totalWins").innerHTML = totalWins;
  document.getElementById("totalDraws").innerHTML = totalDraws;
  document.getElementById("totalLosses").innerHTML = totalLosses;
}

const wagerInput = document.getElementById("wager");
wagerInput.addEventListener("input", () => {
  wagerInput.value = wagerInput.value.replace(/[^0-9]/g, "");
});

const gameTypeInputs = document.querySelectorAll('input[name="gameType"]');
const coin3 = document.getElementById("coin3");

gameTypeInputs.forEach((input) => {
  input.addEventListener("change", () => {
    var selectedOption = document.querySelector('input[name="gameType"]:checked').value;

    // Perform actions based on the selectedOption value
    if (selectedOption === "two") {
      console.log("Two coin game type selected");
      coin3.style.display = "none";
      twoCoinGame = true;
    } else if (selectedOption === "three") {
      console.log("Three coin game type selected");
      coin3.style.display = "block";
      twoCoinGame = false;
      winCount = 0;
    }

    resetGame();
    resetScores();
  });
});

function resetGame() {
  document.getElementById("win").innerHTML = "Click the paddle to play";

  // Re-enable paddle on hover and trigger.
  document.getElementById("throw").checked = false;
  document.getElementById("throw").disabled = false;
  document.querySelector(".paddle").classList.remove("no-hover");
}

function resetScores() {
  winCount = 0;
  document.getElementById("totalSpins").innerHTML = 0;
  document.getElementById("totalWins").innerHTML = 0;
  document.getElementById("totalDraws").innerHTML = 0;
  document.getElementById("totalLosses").innerHTML = 0;
  document.getElementById("wager").innerHTML = 0;
}

function getRandomBoolean() {
  return Math.random() < 0.5;
}

function logWin(win) {
  if (win == RESULT.WIN) {
    return "You won!";
  } else if (win == RESULT.DRAW)  {
    return "Draw";
  } else if (win == RESULT.LOSS)  {
    return "You lost";
  } else {
    return "You lost";
  }
}

function logResult(win) {
  if (twoCoinGame) {
    console.log((coin1Boolean ? 'Heads' : 'Tails') + ' + ' + (coin2Boolean ? 'Heads' : 'Tails') + ' = ' + logWin(win));
  } else {
    console.log((coin1Boolean ? 'Heads' : 'Tails') + ' + ' + (coin2Boolean ? 'Heads' : 'Tails') + ' + ' + (coin3Boolean ? 'Heads' : 'Tails') + ' = ' + logWin(win));
  }
}

function isWin() {
  if (twoCoinGame) {
    if (coin1Boolean && coin2Boolean) {
      return RESULT.WIN;
    } else if (coin1Boolean || coin2Boolean) {
      return RESULT.DRAW;
    } else {
      return RESULT.LOSS;
    }
  } else {
    var threeGameWin = (coin1Boolean && (coin2Boolean || coin3Boolean)) || (coin2Boolean && coin3Boolean);
    return threeGameWin ? RESULT.WIN : RESULT.LOSS;
  }
}

/* ----------------------------------------------------------
   COIN EDGE (rim) — built once at load time.

   Each coin gets a ring of thin <span> strips inside its
   .coin-edge container. Every strip is rotated to a position
   around the circle, pushed out to the coin's radius, then
   tipped onto its side so its CSS `height` becomes the coin's
   depth. See the SCSS for what each strip looks like; this is
   just what places each one around the ring.
---------------------------------------------------------- */

const EDGE_SEGMENTS = 24;
const COIN_RADIUS = 30;

function buildCoinEdges() {
  document.querySelectorAll('.coin').forEach((coin) => {
    for (let i = 0; i < EDGE_SEGMENTS; i++) {
      const angle = (360 / EDGE_SEGMENTS) * i;
      const span = document.createElement('span');
      span.className = 'coin-edge-segment';
      span.style.transform = `rotateZ(${angle}deg) translateY(-${COIN_RADIUS}px) rotateX(90deg)`;
      coin.appendChild(span);
    }
  });
}

/* ----------------------------------------------------------
   RANDOMNESS ENGINE FOR COINS (controlled ranges)
---------------------------------------------------------- */

function rand(min, max) {
  return min + Math.random() * (max - min);
}

function randPx(min, max) {
  return rand(min, max) + 'px';
}

function randDeg(min, max) {
  return rand(min, max) + 'deg';
}

function randSign() {
  return Math.random() < 0.5 ? -1 : 1;
}

function randomiseCoin(sign, coin, landsHeads) {

  /*

  Heads - ends on 720 degrees - {120, 240, 360, 480, 600}, 720
  Tails - ends on 900 degrees - {150, 300, 450, 600, 750}, 900
  
  With sharper start:
  Heads - ends on 720 degrees - {200, 300, 400, 500, 600}, 720
  Tails - ends on 900 degrees - {200, 300, 450, 600, 750}, 900

  20 degree variation for randomness in above ranges.

  */

  const root = document.documentElement;

  // 20%
  root.style.setProperty('--' + coin + '-x-20', sign * rand(3, 8) + 'px');
  root.style.setProperty('--' + coin + '-y-20', randPx(0, 0));

  // 28.6%
  root.style.setProperty('--' + coin + '-x-28', sign * rand(8, 13) + 'px');
  root.style.setProperty('--' + coin + '-y-28', randPx(-91, -120));
  root.style.setProperty('--' + coin + '-r-28', randDeg(190, 210));

  // 42.9%
  root.style.setProperty('--' + coin + '-x-42', sign * rand(17, 21) + 'px');
  root.style.setProperty('--' + coin + '-y-42', randPx(-121, -150));
  root.style.setProperty('--' + coin + '-r-42', randDeg(290, 310));

  // 57.2%
  root.style.setProperty('--' + coin + '-x-57', sign * rand(21, 25) + 'px');
  root.style.setProperty('--' + coin + '-y-57', randPx(-91, -120));
  if (landsHeads) {
    root.style.setProperty('--' + coin + '-r-57', randDeg(390, 410));
  } else {
    root.style.setProperty('--' + coin + '-r-57', randDeg(440, 460));
  }

  // 71.5%
  root.style.setProperty('--' + coin + '-x-71', sign * rand(25, 29) + 'px');
  root.style.setProperty('--' + coin + '-y-71', randPx(-61, -90));
  if (landsHeads) {
    root.style.setProperty('--' + coin + '-r-71', randDeg(490, 510));
  } else {
    root.style.setProperty('--' + coin + '-r-71', randDeg(590, 610));
  }

  // 85.8%
  root.style.setProperty('--' + coin + '-x-85', sign * rand(29, 33) + 'px');
  root.style.setProperty('--' + coin + '-y-85', randPx(-30, -60));
  if (landsHeads) {
    root.style.setProperty('--' + coin + '-r-85', randDeg(590, 610));
  } else {
    root.style.setProperty('--' + coin + '-r-85', randDeg(740, 760));
  }

  /*
  2 full spins, then +0deg for heads or +180deg for tails, so the
  animation's own rotation is what determines the visible result
  (no more swapping display after the fact).
  */

  root.style.setProperty('--' + coin + '-x-100', sign * rand(33, 40) + 'px');
  const finalAngle = 720 + (landsHeads ? 0 : 180);
  root.style.setProperty('--' + coin + '-r-100', finalAngle + 'deg');

}

/* ----------------------------------------------------------
   TRIGGER FLIP (inject randomness + restart animation)
---------------------------------------------------------- */

function triggerFlip() {
  setup();

  randomiseCoin(randSign(), 'c1', coin1Boolean);
  randomiseCoin(randSign(), 'c2', coin2Boolean);
  randomiseCoin(randSign(), 'c3', coin3Boolean);
}

document.getElementById('throw').addEventListener('change', () => {
  if (document.getElementById('throw').checked) {
    triggerFlip();
  }
});

// This script is injected by Angular well after the page's own `load`
// event has already fired, so a `window.onload` handler here would never
// run. The DOM elements are already present by the time this script
// executes (Angular has rendered the template first), so just call these
// directly, once every function/const above has been declared.
buildCoinEdges();
