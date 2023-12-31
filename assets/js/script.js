// ================ DOM Traversal =============== //
let startGame = document.querySelector(".start-button");
let highScore = document.querySelector("#high-score");
let questionsScript = document.querySelector(".questionsHTML");
let answerScript = document.querySelector("#answersHTML");
let questionImage = document.querySelector(".imageContainer");
let timer = document.querySelector("#timer");
let prompt = document.querySelector(".prompt");
let correct = document.querySelector(".correct");
let saveForm = document.querySelector(".save-form");

// ==== Variables ==== //
let questionIndex = 0;
let secondsLeft = 90;

// First function to run. Makes start button, prompt, and random questions
function init() {
    startGame.textContent = "Start Game";
    prompt.innerHTML =
        "This is a Pokemon trivia game. You are deducted 10 seconds for every question you get wrong. <br>Fastest time wins. <br>Good luck!";
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

        //Append the image element to the HTML
        questionImage.appendChild(image);

        // Get the question from the question.js and make it appear on the page
    } else {
        questionsScript.textContent = questions[questionIndex].q;
    }

    // Get the corresponding answers and make it appear on the page as li element
    questions[questionIndex].a.forEach((element) => {
        const listItem = document.createElement("li");
        listItem.textContent = element;
        answerScript.appendChild(listItem);

        // Add a click event listener to each list item. Update questionIndex by 1.
        listItem.addEventListener("click", function () {
            questionIndex++;
            correctAnswer(this);
        });
    });
} // End of quizGame function

// Check if question is correct. Update question index and. The `element` is from the `this` from where it is called. 
function correctAnswer(element) {
    
    // Added this b/c questionIndex is increased before answer check. 
    let i = questionIndex - 1;
    let clickedAnswer = element.textContent;

    // 1s delay before next question is displayed. Also add back the 1s delay to timer.
    if (clickedAnswer == questions[i].c) {
        correct.textContent = "Correct!";
        correct.style.color = "green"
        secondsLeft = secondsLeft + 1;
        setTimeout(quizGame, 1000);

        // If question is wrong, subtract 10 seconds
    } else {
        secondsLeft = secondsLeft - 10;
        correct.textContent = "Incorrect!";
        correct.style.color = "red"
        secondsLeft = secondsLeft + 1;
        setTimeout(quizGame, 1000);
    } // end of if
} // End of correctAnswer function

// Input initials, save to local storage
function inputInitials() {

    // Clears any questions/answers out.
    questionsScript.innerHTML = "";
    answerScript.innerHTML = "";
    questionImage.innerHTML = "";
    correct.innerHTML = "";

    // Using the DOM to create elements
    let h2El = document.createElement("h2");
    let initials = document.createElement("h3");
    let form = document.createElement("input");
    let saveButton = document.createElement("button");

    // Add text
    h2El.textContent = "Your score is " + secondsLeft;
    initials.textContent = "Please input your initials";
    saveButton.textContent = "Save";

    // Append to HTML
    saveForm.appendChild(h2El);
    saveForm.appendChild(initials);
    saveForm.appendChild(form);
    saveForm.appendChild(saveButton);

    // Event listener to add high scores to local storage
    saveButton.addEventListener("click", function (event) {
        event.preventDefault();

        // Get existing scores
        let existingScores = JSON.parse(localStorage.getItem("scores"));

        // Put that into an array
        if (!Array.isArray(existingScores)) {
            existingScores = [];
        }

        // Take new score and put it as an object
        let newScore = {
            playerInitials: form.value,
            hs: secondsLeft,
        };

        // Add the new object to existing array
        existingScores.push(newScore);

        // Store the newly added high score to local storage
        localStorage.setItem("scores", JSON.stringify(existingScores));

        // Go to high score html page
        window.location.href = "highscores.html";

    }); // End of event listener 
} // End of inputInitials 

// Click button to start game - calls the function quizGame, clears message, and start timer
startGame.addEventListener("click", function() {
    quizGame();
    startGame.innerHTML = "";
    prompt.innerHTML = "";

    // Set timer to count down every 1 second
    var timerInterval = setInterval(function() {
        secondsLeft--;
        timer.textContent = secondsLeft;

        if (secondsLeft <= 0 || questionIndex == questions.length) {
            clearInterval(timerInterval);
            questionsScript.innerHTML = "";
            answerScript.innerHTML = "";
            questionImage.innerHTML = "";
            correct.innerHTML = "";

            // When timer is done go to input high score function
            setTimeout(inputInitials, 1000);
        }
    }, 1000);

    // Removes the border of the "start game"
    startGame.setAttribute("style", "border: 0px");
});

init();
