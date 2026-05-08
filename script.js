const easyWords = [
  "りんご",
  "みかん",
  "ねこ",
  "いぬ",
  "さくら"
];

const normalWords = [
  "しんかんせん",
  "パソコン",
  "ゲーム",
  "とうきょう",
  "きょうと"
];

const hardWords = [
  "ぷろぐらみんぐ",
  "あーてぃふぃしゃる",
  "でぃーぷらーにんぐ",
  "こんぴゅーたー",
  "てくのろじー"
];


  train = document.getElementById("train");

  if (!train) {
    gameArea.innerHTML = `<div id="train"></div>`;
    train = document.getElementById("train");
  }

  train.textContent = currentWord;

  position = -300;
  train.style.left = position + "px";

  moveInterval = setInterval(() => {

    position += speed;
    train.style.left = position + "px";

    if (position > window.innerWidth) {

      clearInterval(moveInterval);

      answerTimeout = setTimeout(() => {
        miss();
      }, 3000);
    }

  }, 20);
}


function correct() {

  clearInterval(moveInterval);
  clearTimeout(answerTimeout);

  score++;
  combo++;

  if (combo >= 10) {
    combo = 0;
    life++;
    alert("ライフ回復！");
  }

  if (score >= 20) {
    alert("ゲームクリア！");
    createStartScreen();
    return;
  }

  updateUI();
  startRound();
}

function miss() {

  if (gameOver) return;

  combo = 0;
  life--;

  updateUI();

  if (life <= 0) {

    gameOver = true;

    clearInterval(moveInterval);
    clearTimeout(answerTimeout);

    gameArea.innerHTML = `
      <div id="gameOverScreen">
        <h2>ゲームオーバー</h2>
        <p>スペースキーで再スタート</p>
      </div>
    `;

    return;
  }

  startRound();
}

function checkAnswer() {

  if (gameOver) return;

  const userAnswer = answerInput.value.trim();

  if (userAnswer === currentWord) {
    correct();
  } else {
    miss();
  }

  answerInput.value = "";
}

submitBtn.addEventListener("click", checkAnswer);

answerInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    checkAnswer();
  }
});

window.addEventListener("keydown", (event) => {

  if (gameOver && event.code === "Space") {
    createStartScreen();
  }

});
}

function miss() {

  combo = 0;
  life--;

  updateUI();

  if (life <= 0) {
    alert("💀 ゲームオーバー");
    clearInterval(moveInterval);
    return;
  }

  startRound();
}

function checkAnswer() {

  const userAnswer = answerInput.value.trim();

  if (userAnswer === currentWord) {
    correct();
  } else {
    miss();
  }

  answerInput.value = "";
}

submitBtn.addEventListener("click", checkAnswer);

answerInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    checkAnswer();
  }
});

updateUI();
startRound();
