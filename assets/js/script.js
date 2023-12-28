let startGame = document.querySelector("#start-button");
let highScore = document.querySelector("#high-score");
let questionsScript = document.querySelector("#questionsHTML");
let answerScript = document.querySelector("#answersHTML");
let questionImage = document.querySelector("#imageContainer");
let timer = document.querySelector("#timer");
let prompt = document.querySelector("#prompt")

let questionNumber = 5
let secondsLeft = 70

function init() {
    startGame.textContent = "Start Game";
    prompt.textContent = "This is a game where to see if you know your pokemon. Fastest time wins. You are deducted 10 seconds for every question you get wrong. Good luck!";

}



    // adds adds question and answer to page
function quizGame(){
    // clears the answers so there is no doubles.
    answerScript.innerHTML = "";
    questionImage.innerHTML = "";


      // Check if the current question has an image
  if (questions[questionNumber].q.includes("./assets/images/")) {
    const image = document.createElement("img");
    image.src = questions[questionNumber].q;
    questionsScript.textContent = "Who's that Pokemon?"
    // Append the image element to the HTML where you want it to be displayed
    questionImage.appendChild(image);

    // get the question from the question js and make it appear on the page
  } else {
  questionsScript.textContent = questions[questionNumber].q;
  }
    // get the corresponding answers and make it appear on the page as li element
    questions[questionNumber].a.forEach(element => {
    const listItem = document.createElement("li");
    listItem.textContent = element;
    answerScript.appendChild(listItem);

    // Add a click event listener to each list item
    listItem.addEventListener("click", function() {
        correctAnswer(this);
        // questionNumber++;
      });
    });
    console.log(questionNumber)
}

// FIXME: when questionNumber runs out of questions, it returns undefined. how do we fix?
function correctAnswer(element) {
    let clickedAnswer = element.textContent
 if (clickedAnswer == questions[questionNumber].c) {
        console.log("correct!")
        
    // if question is wrong, subtract 10 seconds 
    } else {console.log("incorrect");
        secondsLeft = secondsLeft - 10
    }
}
//TODO: try to get random question to work at the start of game

// function randomQuestion() {
//     for (let i=0; i<questions.length;i++){
//         const j = Math.floor(Math.random() * questions.length);
//         const temp = questions[i];
//         questions[i] = questions[j]
//         questions[j] = temp;
//     }
// } 
//

// TODO: make text disappear when game starts. refer to Day4-09
init();


// Click button to start game - calls the function quizGame, clears message, and start timer
startGame.addEventListener("click", function() {
quizGame();
    startGame.innerHTML = "";
    prompt.innerHTML = "";
    // set timer
    var timerInterval = setInterval(function() {
        secondsLeft--;
        timer.textContent = secondsLeft;

        if(secondsLeft <= 0){
            clearInterval(timerInterval);
            // TODO: when timer is done go to scores page
            console.log("Done!")
        } 
    }, 1000)
// randomQuestion();
});