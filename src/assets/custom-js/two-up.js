window.onload = function () {
  console.log("Custom Javascript onload() called.");
  setup();
};

var coin1Boolean = false;
var coin2Boolean = false;
var coin3Boolean = false;

function setup() {
  coin1Boolean = getRandomBoolean();
  coin2Boolean = getRandomBoolean();
  coin3Boolean = getRandomBoolean();

  toggleHeadsTails('coin1', coin1Boolean);
  toggleHeadsTails('coin2', coin2Boolean);
  toggleHeadsTails('coin3', coin3Boolean);
  
  console.log('Coin 1: ' + coin1Boolean);
  console.log('Coin 2: ' + coin2Boolean);
  console.log('Coin 3: ' + coin3Boolean);
  console.log('Win? ' + isWin());
}

const animated = document.querySelector(".paddle");

animated.addEventListener("animationend", () => {
  document.getElementById("win").style.display = 'block';
  document.getElementById("win").innerHTML = isWin();
});

function reset() {
  setup();
  document.getElementById('throw').checked = false;
  document.getElementById('win').style.display = 'none';
}

function getRandomBoolean() {
  if ((Math.floor(Math.random() * 2)) == 0) { // either 0 or 1
    return true;
  } else {
    return false;
  }
}

function toggleHeadsTails(id, boolean) {
  var coin = document.getElementById(id);
  if (boolean) {
    coin.querySelector('.heads').style.display = 'block';
    coin.querySelector('.tails').style.display = 'none';
  } else {
    coin.querySelector('.heads').style.display = 'none';
    coin.querySelector('.tails').style.display = 'block';
  }
}

function isWin() {
  var win = (coin1Boolean && (coin2Boolean || coin3Boolean)) || (coin2Boolean && coin3Boolean);
  if (win) {
    return 'You Won!';
  } else {
    return 'You Lost';
  }
}
