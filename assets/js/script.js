let startGame = document.querySelector("#start-button");
let highScore = document.querySelector("#high-score");
let questionsScript = document.querySelector("#questionsHTML");
let answerScript = document.querySelector("#answersHTML")
let questionImage = document.querySelector("#imageContainer")
let questionNumber = 0



    // adds adds question and answer to page
function quizGame(){
    // clears the answers so there is no doubles.
    answerScript.innerHTML = "";
    questionImage.innerHTML = "";

    // get the question from the question js and make it appear on the page
 

      // Check if the current question has an image
  if (questions[questionNumber].q.includes("./assets/images/")) {
    const image = document.createElement("img");
    image.src = questions[questionNumber].q;
    // Append the image element to the HTML where you want it to be displayed
    questionImage.appendChild(image);
  } else {
  questionsScript.textContent = questions[questionNumber].q;
  }
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
    console.log(questions.length)
}

function correctAnswer(element) {
    let clickedAnswer = element.textContent
    if (clickedAnswer == questions[questionNumber].c) {
        console.log("correct!")
    } else {console.log("incorrect");
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

// Click button to start game - calls the function quizGame
startGame.addEventListener("click", function() {
quizGame();
// randomQuestion();
});