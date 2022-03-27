let wordList = ["patio", "darts", "piano", "tired", "horse", "cynic"];

function buildGrid() {
  for (let i = 0; i < 6; i++) {
    const row = document.createElement("div");

    for (let j = 0; j < 5; j++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      cell.textContent = "";
      row.appendChild(cell);
    }
    grid.appendChild(row);
  }
}

let randomIndex = Math.floor(Math.random() * wordList.length);
let secret = wordList[randomIndex];

let history = [""];
let currentAttempt = "";

function updateGrid() {
  let row = grid.firstChild;
  for (let attempt of history) {
    drawAttempt(row, attempt, false);
    row = row.nextSibling;
  }
  drawAttempt(row, currentAttempt, true);
}

const grid = document.getElementById("grid");
buildGrid();
updateGrid();

window.addEventListener("keydown", handleKeyDown);

function handleKeyDown() {
  let letter = e.key.toLowerCase();
  if (letter === "enter") {
    if (currentAttempt.length < 5) {
      return;
    }
    if (!wordList.includes(currentAttempt)) {
      alert("Not in my thesaurus");
      return;
    }
    history.push(currentAttempt);
    currentAttempt = "";
  } else if (letter === "backspace") {
    currentAttempt = currentAttempt.slice(0, currentAttempt.length - 1);
  } else if (/[a-z]/.test(letter)) {
    if (currentAttempt.length < 5) {
      currentAttempt += letter;
    }
  }
  updateGrid();
}

function drawAttempt(row, attempt, isCurrent) {
  for (let i = 0; i < 5; i++) {
    let cell = row.children[i];
    if (attempt[i] !== undefined) {
      cell.textContent = attempt[i];
    } else {
      cell.innerHTML = '<div style="opacity: 0">X</div>';
    }
    if (isCurrent) {
      cell.style.backgroundColor = "#111";
    } else {
      cell.style.backgroundColor = getBgColor(attempt, i);
    }
  }
}

function getBgColor(attempt, i) {
  let correctLetter = secret[i];
  let attemptLetter = attempt[i];
  if (attemptLetter === undefined || secret.indexOf(attemptLetter) === -1) {
    return "#212121";
  }
  if (correctLetter === attemptLetter) {
    return "#538d4e";
  }
  return "#b59f3b";
}
