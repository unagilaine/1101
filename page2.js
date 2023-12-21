let correctNames = [
    "Ethan Skyler",
    "Eleanor Scarlett",
    "Euven Samuel",
    "Elena Shay",
    "Emir Shane",
    "Emma Sophia",
    "Elliot Saint",
    "Evie Serenity",
    "Enrique Sebastian",
    "Elaine Sophie",
    "Eric Steven"
];

function checkNames() {
    const errorMessage = document.getElementById("error-message");
    const nameInputs = document.getElementById("name-inputs").getElementsByTagName("input");
    const proceedBtn = document.getElementById("proceed-btn");

    let allCorrect = true;
    for (let i = 0; i < nameInputs.length; i++) {
        const enteredName = nameInputs[i].value.trim();
        let nameMatched = false;

        for (let j = 0; j < correctNames.length; j++) {
            if (enteredName.toLowerCase() === correctNames[j].toLowerCase()) {
                nameMatched = true;
                break;
            }
        }

        if (!nameMatched) {
            allCorrect = false;
            break;
        }
    }

    if (allCorrect) {
        errorMessage.textContent = "all names entered correctly!";
        proceedBtn.disabled = false;
    } else {
        errorMessage.textContent = "not all names are entered correctly. please try again.";
        proceedBtn.disabled = true;
    }
}

function proceedToGame() {
	 const hasCompletedPage1 = localStorage.getItem('indexCompleted');
   setTimeout(function () {
     window.location.href = "game.html";
    }, 100);
	}
