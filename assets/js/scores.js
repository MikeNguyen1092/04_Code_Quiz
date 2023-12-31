


function renderScore() {
    var lastScore = JSON.parse(localStorage.getItem("score"));
    if (lastGrade !== null) {
      document.querySelector(".message").textContent = lastGrade.student + 
      " received a/an " + lastGrade.grade
    }
  }