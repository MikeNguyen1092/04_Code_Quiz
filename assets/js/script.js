let startGame = document.querySelector("#start-button");
let highScore = document.querySelector("#high-score");
let questionsScript = document.querySelector("#questionsHTML");
let answersScritp = document.querySelector("#answersHTML")


function init(){

}


startGame.addEventListener("click", function() {
    questionsScript.textContent = questions[0].q;
    answersScritp.textContent = questions[0].a;

    init();
}) 