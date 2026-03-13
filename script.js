
const target = document.getElementById("target");
const gameBox = document.getElementById("gameBox");

const scoreDisplay = document.getElementById("score");
const hitsDisplay = document.getElementById("hits");
const errorsDisplay = document.getElementById("errors");
const timeDisplay = document.getElementById("time");

const startBtn = document.getElementById("startBtn");
const pauseBtn = document.getElementById("pauseBtn");

let score = 0;
let hits = 0;
let errors = 0;
let time = 60;

let gameRunning = false;
let moveInterval;
let timerInterval;

// mover alvo
function moveTarget() {
    const maxX = gameBox.clientWidth - target.clientWidth;
    const maxY = gameBox.clientHeight - target.clientHeight;

    const randomX = Math.random() * maxX;
    const randomY = Math.random() * maxY;

    target.style.left = randomX + "px";
    target.style.top = randomY + "px";
}

// clique no alvo (acerto)
target.addEventListener("click", (e) => {
    if (!gameRunning) return;

    e.stopPropagation(); // impede contar como erro
    score += 1;
    hits += 1;

    updateDisplay();
    moveTarget();
});

// clique na caixa (erro)
gameBox.addEventListener("click", () => {
    if (!gameRunning) return;

    score -= 2;
    errors += 1;

    updateDisplay();
});

function updateDisplay() {
    scoreDisplay.textContent = score;
    hitsDisplay.textContent = hits;
    errorsDisplay.textContent = errors;
}

function startGame() {
    if (gameRunning) return;

    gameRunning = true;

    moveInterval = setInterval(moveTarget, 800);

    timerInterval = setInterval(() => {
        time--;
        timeDisplay.textContent = time;

        if (time <= 0) {
            endGame();
        }
    }, 1000);
}

function pauseGame() {
    gameRunning = false;
    clearInterval(moveInterval);
    clearInterval(timerInterval);
}

function endGame() {
    pauseGame();
    alert("Fim de jogo! Pontuação final: " + score);
}

startBtn.addEventListener("click", startGame);
pauseBtn.addEventListener("click", pauseGame);