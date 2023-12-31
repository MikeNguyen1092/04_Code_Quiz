let startGame = document.querySelector(".start-button");
let highScore = document.querySelector("#high-score");
let questionsScript = document.querySelector(".questionsHTML");
let answerScript = document.querySelector("#answersHTML");
let questionImage = document.querySelector(".imageContainer");
let timer = document.querySelector("#timer");
let prompt = document.querySelector(".prompt");
let correct = document.querySelector(".correct");
let saveForm = document.querySelector(".save-form")


let questionIndex = 5;
let secondsLeft = 70;

// First function to run. Makes start button, prompt, and random questions
function init() {
    startGame.textContent = "Start Game";
    prompt.textContent =
        "This is a Pokemon trivia game. Fastest time wins. You are deducted 10 seconds for every question you get wrong. Good luck!";
    randomQuestion();
}

// Random question every time games start
function randomQuestion() {
    for (let i = 0; i < questions.length; i++) {
        const j = Math.floor(Math.random() * questions.length);
        const temp = questions[i];
        questions[i] = questions[j];
        questions[j] = temp;
    }
}

// Main function to run the game
function quizGame() {
    // Clears the answers so there is no doubles.
    answerScript.innerHTML = "";
    questionImage.innerHTML = "";
    correct.innerHTML = "";
    

    // Check if the current question has an image
    if (questions[questionIndex].q.includes("./assets/images/")) {
        const image = document.createElement("img");
        image.src = questions[questionIndex].q;
        questionsScript.textContent = "Who's that Pokemon?";

        //Append the image element to the HTML where you want it to be displayed
        questionImage.appendChild(image);

        // Get the question from the question.js and make it appear on the page
    } else {
        questionsScript.textContent = questions[questionIndex].q;
    }

    // get the corresponding answers and make it appear on the page as li element
    questions[questionIndex].a.forEach((element) => {
        const listItem = document.createElement("li");
        listItem.textContent = element;
        answerScript.appendChild(listItem);

        // Add a click event listener to each list item
        listItem.addEventListener("click", function () {
            questionIndex++;
            correctAnswer(this);
        });
    });
    console.log(questionIndex);
}

// TODO: maybe play sound? Check if question is correct. Update question index and 1s delay before next question is displayed
function correctAnswer(element) {
    let i = questionIndex - 1;
    let clickedAnswer = element.textContent;

    if (clickedAnswer == questions[i].c) {
        // questionIndex++;
        correct.textContent = "Correct!";
        secondsLeft = secondsLeft + 1
        setTimeout(quizGame, 1000);

        // if question is wrong, subtract 10 seconds
    } else {
        secondsLeft = secondsLeft - 10;
        // questionIndex++;
        correct.textContent = "Incorrect!";
        secondsLeft = secondsLeft + 1
        setTimeout(quizGame, 1000);
    }
}
// TODO: Get this to work. Input initials, save to local storage
function inputInitials() {
    questionsScript.innerHTML = "";
    answerScript.innerHTML = "";
    questionImage.innerHTML = "";
    correct.innerHTML = "";

    let h2El = document.createElement("h2");
    let initials = document.createElement("p");
    let form = document.createElement("input");
    let saveButton = document.createElement("button");

    h2El.textContent = "Your score is " + secondsLeft;
    initials.textContent = "Please input your initials";
    saveButton.textContent = "Save"

    saveForm.appendChild(h2El)
    saveForm.appendChild(initials);
    saveForm.appendChild(form);
    saveForm.appendChild(saveButton);

    saveButton.addEventListener("click", function(event) {
        event.preventDefault();
        
        let scores = {
            playerInitials: form.value,
            hs: secondsLeft,
        }
        localStorage.setItem("scores", JSON.stringify(scores));
        window.location.href = "highscores.html"
    })


}

// Click button to start game - calls the function quizGame, clears message, and start timer
startGame.addEventListener("click", function () {
    // inputInitials();
    quizGame();
    startGame.innerHTML = "";
    prompt.innerHTML = "";

    // Set timer to count down every 1 second
    var timerInterval = setInterval(function () {
        secondsLeft--;
        timer.textContent = secondsLeft;

        if (secondsLeft <= 0 || questionIndex == questions.length) {
            clearInterval(timerInterval);
            questionsScript.innerHTML = "";
            answerScript.innerHTML = "";
            questionImage.innerHTML = "";
            correct.innerHTML = "";

            // When timer is done go to input high score function
            setTimeout(inputInitials,1000);
        }
    }, 1000);

    // Removes the border of the "start game"
    startGame.setAttribute("style", "border: 0px");
});

init();
