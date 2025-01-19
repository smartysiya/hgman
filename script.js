const words = ['python', 'java', 'kotlin', 'javascript'];
let selectedWord = words[Math.floor(Math.random() * words.length)];
let tries = 6;
let guessed = [];
let wordDisplay = Array(selectedWord.length).fill('_');

document.getElementById('word').textContent = wordDisplay.join(' ');

function updateDisplay() {
    document.getElementById('word').textContent = wordDisplay.join(' ');
    document.getElementById('hangman').textContent = `Tries left: ${tries}`;
}

function createKeyboard() {
    const alphabet = 'abcdefghijklmnopqrstuvwxyz';
    const keyboard = document.getElementById('keyboard');
    keyboard.innerHTML = '';

    alphabet.split('').forEach(letter => {
        const key = document.createElement('span');
        key.textContent = letter;
        key.className = 'key';
        key.onclick = () => handleGuess(letter);
        keyboard.appendChild(key);
    });
}

function handleGuess(letter) {
    if (guessed.includes(letter) || tries === 0) return;

    guessed.push(letter);
    document.querySelectorAll('.key').forEach(key => {
        if (key.textContent === letter) key.classList.add('disabled');
    });

    if (selectedWord.includes(letter)) {
        selectedWord.split('').forEach((char, index) => {
            if (char === letter) wordDisplay[index] = letter;
        });
    } else {
        tries--;
    }

    updateDisplay();
    checkGameStatus();
}

function checkGameStatus() {
    if (!wordDisplay.includes('_')) {
        document.getElementById('message').textContent = 'Congrats! You guessed the word!';
    } else if (tries === 0) {
        document.getElementById('message').textContent = `Sorry, you ran out of tries. The word was ${selectedWord}.`;
    }
}

createKeyboard();
updateDisplay();