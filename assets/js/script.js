let playerName = "";
let lives = 0;
let points = 0;
let turnNumber = 1;

let usernameInput = document.getElementById("username");
let startBtn = document.getElementById("start-btn");
let rollBtn = document.getElementById("roll-btn");
let restartBtn = document.getElementById("restart-btn");
let statusDiv = document.getElementById("status");
let resultDiv = document.getElementById("result");
let rollLogDiv = document.getElementById("roll-log");

let playerNameSpan = document.getElementById("player-name");
let livesSpan = document.getElementById("lives");
let pointsSpan = document.getElementById("points");

// INIT UI
function updateUI() {
    livesSpan.textContent = lives;
    pointsSpan.textContent = points;
}

// END GAME
function endGame(message) {
    rollBtn.classList.add("d-none");
    restartBtn.classList.remove("d-none");
    resultDiv.innerHTML = `<h4 class='text-warning'>${message}</h4>`;
}

// LOGIC AFTER ROLL
function playTurn() {
    if (lives <= 0 || points >= 50) return;

    // RANDOM DICE ROLL
    const dice1 = Math.floor(Math.random() * 6) + 1;
    const dice2 = Math.floor(Math.random() * 6) + 1;

    // SHAKE ANIMATION
    $("#dice1-img, #dice2-img").effect("shake", { times: 3, distance: 10 }, 300);

    // WAIT FOR FINISH ANIMATION
    setTimeout(() => {
        // UPDATE DICE IMAGES
        document.getElementById("dice1-img").src = `assets/img/${dice1}.png`;
        document.getElementById("dice2-img").src = `assets/img/${dice2}.png`;

        // SHOW ROLL RESULT
        const sum = dice1 + dice2;
        let actionLog = `🎲 Tirada ${turnNumber}: ${dice1} y ${dice2} → `;
        lives--;

        // LOGIC FOR POINTS AND LIVES
        let previousPoints = points;

        if (dice1 === dice2) {
            lives++;
            actionLog += `¡Números iguales! +1 vida. `;
        }

        if (sum % 2 === 0) {
            points += 20;
            actionLog += `Suma par. +20 puntos. `;
        } else {
            points -= 5;
            if (points < 0) points = 0;
            actionLog += `Suma impar. -5 puntos. `;
        }

        if (Math.floor(previousPoints / 30) < Math.floor(points / 30)) {
            lives++;
            actionLog += `🎉 Bonus por acumular 30 puntos. +1 vida.`;
        }

        updateUI();

        // UPDATE LOG AND FEEDBACK
        const logEntry = document.createElement("p");
        logEntry.textContent = actionLog + ` → Total: ${points} puntos, ${lives} vidas.`;
        rollLogDiv.prepend(logEntry);

        const feedback = document.getElementById("feedback-message");
        if (dice1 === dice2 || sum % 2 === 0 || Math.floor(previousPoints / 30) < Math.floor(points / 30)) {
            feedback.innerHTML = `<span class="text-success fs-4"><i class="bi bi-emoji-laughing-fill"></i> ¡Buena tirada!</span>`;
        } else {
            feedback.innerHTML = `<span class="text-danger fs-4"><i class="bi bi-emoji-frown-fill"></i> Mala suerte...</span>`;
        }

        if (points >= 50) {
            endGame("🎉 ¡Felicidades! Alcanzaste 50 puntos. ¡Ganaste! 🏆");
        } else if (lives <= 0) {
            endGame("💔¡Juego terminado! Te quedaste sin vidas.💀");
        }

        // UPDATE TURN NUMBER
        turnNumber++;
    }, 300);
}


// START GAME
startBtn.addEventListener("click", () => {
    // VALIDATE USERNAME
    playerName = usernameInput.value.trim();
    if (!playerName) return alert("Por favor ingresa tu nombre.");

    // INIT GAME
    lives = Math.floor(Math.random() * 5) + 1;
    points = 0;
    turnNumber = 1;

    // UPDATE UI
    playerNameSpan.textContent = playerName;
    statusDiv.classList.remove("d-none");
    document.getElementById("game-controls").classList.remove("d-none");
    document.getElementById("start-section").classList.add("d-none");

    // RESET UI
    rollBtn.disabled = false;
    rollBtn.classList.remove("d-none");
    restartBtn.classList.add("d-none");
    resultDiv.innerHTML = "";
    rollLogDiv.innerHTML = "";
    document.getElementById("feedback-message").innerHTML = "";
    updateUI();

    // INIT LOG
    let startEntry = document.createElement("p");
    startEntry.textContent = `🟢 Juego iniciado con ${lives} vidas y ${points} puntos.`;
    rollLogDiv.prepend(startEntry);
});

// ROLL DICE
rollBtn.addEventListener("click", playTurn);

// RESTART GAME
restartBtn.addEventListener("click", () => {
    playerName = "";
    lives = 0;
    points = 0;
    turnNumber = 1;

    usernameInput.value = "";
    document.getElementById("start-section").classList.remove("d-none");
    document.getElementById("game-controls").classList.add("d-none");
    statusDiv.classList.add("d-none");
    restartBtn.classList.add("d-none");
    rollBtn.classList.remove("d-none");
    resultDiv.innerHTML = "";
    rollLogDiv.innerHTML = "";
    document.getElementById("feedback-message").innerHTML = "";
    updateUI();
});
