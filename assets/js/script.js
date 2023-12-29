let startGame = document.querySelector("#start-button");
let highScore = document.querySelector("#high-score");
let questionsScript = document.querySelector("#questionsHTML");
let answerScript = document.querySelector("#answersHTML");
let questionImage = document.querySelector("#imageContainer");
let timer = document.querySelector("#timer");
let prompt = document.querySelector("#prompt");
let correct = document.querySelector("#correct");


let questionIndex = 0;
let secondsLeft = 70;

// First function to run. Makes start button, prompt, and random questions
function init() {
    startGame.textContent = "Start Game";
    prompt.textContent =
        "This is a Pokemon trivia game. Fastest time wins. You are deducted 10 seconds for every question you get wrong. Good luck!";
    randomQuestion();
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
            correctAnswer(this);
        });
    });
    console.log(questionIndex);
}

// TODO: maybe play sound? Check if question is correct.
function correctAnswer(element) {
    let clickedAnswer = element.textContent;

    if (clickedAnswer == questions[questionIndex].c) {
        questionIndex++;
        correct.textContent = "Correct!";
        setTimeout(quizGame, 1000);

        // if question is wrong, subtract 10 seconds
    } else {
        secondsLeft = secondsLeft - 10;
        questionIndex++;
        correct.textContent = "Incorrect!";
        setTimeout(quizGame, 1000);
    }
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

// Click button to start game - calls the function quizGame, clears message, and start timer
startGame.addEventListener("click", function () {
    quizGame();
    startGame.innerHTML = "";
    prompt.innerHTML = "";

    // Set timer to count down every 1 second
    var timerInterval = setInterval(function () {
        secondsLeft--;
        timer.textContent = secondsLeft;

        if (secondsLeft <= 0 || questionIndex == questions.length) {
            clearInterval(timerInterval);

            // When timer is done go to scores page
            // window.location.href = "highscores.html"
        }
    }, 1000);

    // removes the border of the "start game"
    startGame.setAttribute("style", "border: 0px");
});

init();
