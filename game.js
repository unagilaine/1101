const words = [
    { word: "bumble", hint: "to bungle or blunder awkwardly; muddle" },
    { word: "11 january 2023", hint: "\"11 months ago\"" },
	{ word: "discord", hint: "#5865F2" },
	{ word: "bala", hint: "elaine, why are you so stupid?" }, 
    { word: "helicopter", hint: "whirlybird" },
	{ word: "plato", hint: "battleship and snooker" },
	{ word: "ghost", hint: "noun: hantu / verb: something sophie did to elaine" },
	{ word: "this love", hint: "our song" }, 
	{ word: "love you to the moon and to saturn", hint: "(last song, line 13) too" }, 
	{ word: "something", hint: "you're _______" }, 
    { word: "will you be my girlfriend", hint: "possibly the second most important question i’ll ever ask you" }
];

let currentRound = 0;
let incorrectGuesses = 0;

let word = "";
let guessedLetters = [];

function startRound() {
    console.log("Starting round:", currentRound);
    word = words[currentRound].word.toLowerCase().trim();
    console.log("Current word:", word);
    guessedLetters = [];
    incorrectGuesses = 0;
    updateHangman();
    updateWord();
    updateHint();
    updateRound();
	document.getElementById("next-button").style.display = "none";
    document.getElementById("end-game-button").style.display = "none";
}

function updateHangman() {
    const hangmanDiv = document.getElementById("hangman");
    hangmanDiv.textContent = "💣".repeat(incorrectGuesses);
}

function updateWord() {
    const wordDiv = document.getElementById("word");
    const isLastRound = currentRound === words.length - 1;

    wordDiv.textContent = word
        .split('')
        .map((letter, index) => {
            if (guessedLetters.includes(letter)) {
                return letter;
            } else if (letter === ' ' && isLastRound && index === word.length - 1) {
                return '?';
            } else {
                return '_';
            }
        })
        .join(' ');

    const hangmanContainer = document.getElementById("hangman-container");
    const previewDiv = document.getElementById("preview");
    hangmanContainer.insertBefore(previewDiv, hangmanContainer.firstChild);
}

function updateHint() {
    const hintDiv = document.getElementById("hint");
    hintDiv.textContent = `hint: ${words[currentRound].hint.toLowerCase()}`;
}

function updateRound() {
    const roundDiv = document.getElementById("round");
    roundDiv.textContent = `round ${currentRound + 1}/11`;
}

function wordIsGuessed() {
    return word.split('').every(letter => guessedLetters.includes(letter) || letter === ' ');
}

function showAnswer() {
    const wordDiv = document.getElementById("word");
    wordDiv.textContent = `${word}`;
}

function displayGuessedLetter(letter) {
    const previewDiv = document.getElementById("preview");
    previewDiv.textContent = letter;
    previewDiv.style.opacity = 1;
    previewDiv.style.color = "white";
    previewDiv.style.fontSize = "36px";

    setTimeout(() => {
        previewDiv.style.opacity = 0;
    }, 1000);
}

function guess(letter) {
    if (guessedLetters.includes(letter) || !/^[a-zA-Z0-9]$/.test(letter)) {
        return;
    }

    guessedLetters.push(letter);
    displayGuessedLetter(letter);

    if (!word.includes(letter)) {
        incorrectGuesses++;
        updateHangman();
    } else {
        updateWord();
    }

    if (wordIsGuessed()) {
        showAnswer();
        if (currentRound < words.length - 1) {
            document.getElementById("next-button").style.display = "block";
        } else {
            document.getElementById("end-game-button").style.display = "block";
        }
    }
}

document.addEventListener('keydown', function (event) {
    if (event.key.match(/^[a-zA-Z0-9]$/)) {
        guess(event.key.toLowerCase());
    }
});

function nextRound() {
    document.getElementById("next-button").style.display = "none";
    document.getElementById("end-game-button").style.display = "none";

    currentRound++;
    if (currentRound < words.length) {
        startRound();
    } else {
        displayEndGameButton();
    }
}

function displayEndGameButton() {
    const endGameButton = document.getElementById("end-game-button");
    endGameButton.style.display = "block";
}

function endGame() {
    displayYay();
}

function displayYay() {
    const yayDiv = document.createElement("div");
    yayDiv.textContent = "YAYYYYYYYYYYYYY";
    yayDiv.style.position = "absolute";
    yayDiv.style.fontSize = "36px";
    yayDiv.style.color = "#c475d9";
    document.body.appendChild(yayDiv);

    let position = 0;
    const animation = setInterval(() => {
        if (position > window.innerWidth) {
            clearInterval(animation);
            document.body.removeChild(yayDiv);
        } else {
            position += 5;
            yayDiv.style.left = position + "px";
        }
    }, 10);
}

startRound();