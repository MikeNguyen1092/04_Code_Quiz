clearScores = document.querySelector("#clearScore");
savScores = document.querySelector(".savScores");
playAgain = document.querySelector("#playAgain");


function renderScore() {
    var savedScores = JSON.parse(localStorage.getItem('scores'));
  
    if (savedScores !== null) {
         savedScores.forEach((score) => {
         var listScore = document.createElement("li");
         listScore.textContent = score.playerInitials + " - " + score.hs;
         savScores.appendChild(listScore);
      });
    }
  }

renderScore();

clearScores.addEventListener("click", function (event) {
    event.preventDefault();

    localStorage.removeItem("scores");

    document.querySelector(".savScores").innerHTML = "";
});

playAgain.addEventListener("click", function(event) {
    event.preventDefault();
    window.location.href = "index.html";
})