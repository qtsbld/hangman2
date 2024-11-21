const words = ["кот", "собака", "птица", "лошадь"];
const hint = "Животное";
let selectedWord = words[Math.floor(Math.random() * words.length)];
let guessedLetters = [];
let wrongGuesses = 0;
const maxWrongGuesses = 5; // Максимальное количество неправильных попыток

document.getElementById("hint").innerText = `Подсказка: ${hint}`;
drawHangman();
createLetterButtons();
updateWordDisplay();

function drawHangman() {
    const canvas = document.getElementById("hangman");
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.moveTo(50, 150);
    ctx.lineTo(150, 150); // основание
    ctx.moveTo(100, 150);
    ctx.lineTo(100, 20); // вертикальная линия
    ctx.moveTo(100, 20);
    ctx.lineTo(150, 20); // верхняя линия
    ctx.moveTo(150, 20);
    ctx.lineTo(150, 50); // перекладина
    ctx.stroke();

    if (wrongGuesses > 0) {
        ctx.beginPath();
        ctx.arc(150, 70, 20, 0, Math.PI * 2, true); // голова
        ctx.stroke();
    }
    if (wrongGuesses > 1) {
        ctx.beginPath();
        ctx.moveTo(150, 90);
        ctx.lineTo(150, 130); // тело
        ctx.stroke();
    }
    if (wrongGuesses > 2) {
        ctx.beginPath();
        ctx.moveTo(150, 100);
        ctx.lineTo(130, 110); // левая рука
        ctx.moveTo(150, 100);
        ctx.lineTo(170, 110); // правая рука
        ctx.stroke();
    }
    if (wrongGuesses > 3) {
        ctx.beginPath();
        ctx.moveTo(150, 130);
        ctx.lineTo(130, 150); // левая нога
        ctx.moveTo(150, 130);
        ctx.lineTo(170, 150); // правая нога
        ctx.stroke();
    }
}

function updateWordDisplay() {
    const wordDisplay = selectedWord.split('').map(letter => (guessedLetters.includes(letter) ? letter : "_")).join(' ');
    const wordElement = document.getElementById("word");
    if (wordElement) {
        wordElement.innerText = wordDisplay;
    }

    if (!wordDisplay.includes("_")) {
        alert("Вы угадали слово: " + selectedWord + "! Вы выиграли!");
        resetGame(); // Сброс игры после выигрыша
    }
}

function handleGuess(letter) {
    if (guessedLetters.includes(letter)) return;

    guessedLetters.push(letter);

    if (!selectedWord.includes(letter)) {
        wrongGuesses++;
        drawHangman();

        if (wrongGuesses === maxWrongGuesses) {
            alert("Вы проиграли! Загаданное слово: " + selectedWord);
            resetGame(); // Сброс игры после проигрыша
        }
    }
    updateWordDisplay();
}

function createLetterButtons() {
    const lettersContainer = document.getElementById("letters");
    if (!lettersContainer) return; 

    const alphabet = "абвгдежзийклмнопрстуфхцчшщъыьэюя";

    alphabet.split('').forEach(letter => {
        const button = document.createElement("button");
        button.innerText = letter;
        button.onclick = () => handleGuess(letter);
        lettersContainer.appendChild(button);
    });
}

function resetGame() {
    selectedWord = words[Math.floor(Math.random() * words.length)];
    guessedLetters = [];
    wrongGuesses = 0;
    drawHangman();
    updateWordDisplay();
    document.getElementById("letters").innerHTML = ''; // Очистка кнопок
    createLetterButtons(); // Создание новых кнопок
}