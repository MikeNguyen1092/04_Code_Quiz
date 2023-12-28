let startGame = document.querySelector("#start-button");
let highScore = document.querySelector("#high-score");
let questionsScript = document.querySelector("#questionsHTML");
let answerScript = document.querySelector("#answersHTML")
let questionNumber = 2



    // adds adds question and answer to page
function quizGame(){
    // clears the answers so there is no doubles.
    answerScript.innerHTML = "";

    // get the question from the question js and make it appear on the page
    questionsScript.textContent = questions[questionNumber].q;

    // get the corresponding answers and make it appear on the page as button element
    questions[questionNumber].a.forEach(element => {
    const listItem = document.createElement("li");
    listItem.textContent = element;
    answerScript.appendChild(listItem);

    // Add a click event listener to each list item
    listItem.addEventListener("click", function() {
        // Handle the click event here
        correctAnswer(this)
        // You can perform any actions you want when an item is clicked
      });
    });
}

function correctAnswer(element) {
    let clickedAnswer = element.textContent
    if (clickedAnswer === questions[questionNumber].c) {
        console.log("correct!")
    } else {console.log("incorrect");
    }
}


// Click button to start game - calls the function quizGame
startGame.addEventListener("click", function() {
quizGame();
});