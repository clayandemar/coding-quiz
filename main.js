var qnumber = 0

// var timeEl = document.querySelector(".time");

var numberCount = 60;

// var questionsDiv = document.getElementById("questions");

// var answerLiTag = document.getAnimations("answerList");






//Begin the quiz
function beginQuiz() {
  startTimer();
  showQuestion();
  document.getElementById("beginButton").style.display = "none";
  document.getElementById("qAndAText").style.display = "block";
}

//array of questions
var questions = [
  {
    question: "Which is used to end a line of code in JavaScript?",
    answers: [
      { text: ";", correct: true },
      { text: "/>", correct: false },
      { text: "!", correct: false },
      { text: "//", correct: false },
    ]
  },
  {
    question: "Which tag do you use to add a JavaScript file to an HTML file?",
    answers: [
      { text: "<link>", correct: false },
      { text: "<type>", correct: false },
      { text: "<input>", correct: false },
      { text: "<script>", correct: true },
    ]
  },

];

//timer starts
function startTimer() {
  var countdown = document.getElementById("countdown");
  handler = setInterval(updatetimer, 1000);

}

//timer runs
function updatetimer() {
  console.log(numberCount)
  if (numberCount > 0)
    numberCount = numberCount - 1;
  var countdown = document.getElementById("countdown");
  countdown.innerHTML = numberCount;

  if (numberCount === 0)
    quizForcedEnd();
}

//show the question and answers on screen
function showQuestion() {
  var q = document.getElementById("questions");
  q.innerHTML = questions[qnumber].question;
  console.log(questions[qnumber]);
  //answers
  var a = document.getElementById("q1a1");
  a.innerText = questions[qnumber].answers[0].text;
  a = document.getElementById("q1a2");
  a.innerText = questions[qnumber].answers[1].text;
  a = document.getElementById("q1a3");
  a.innerText = questions[qnumber].answers[2].text;
  a = document.getElementById("q1a4");
  a.innerText = questions[qnumber].answers[3].text;

  if (qnumber === questions.length)
    clearInterval(qnumber);


}
console.log(questions);
//question is answered and is captured, determined if right or wrong, then next question appears
function gradeAnswer() {
  var right = false;
  var userAnswer = document.getElementById("answer1");
  if (document.getElementById("answer1").checked) {
    console.log("first answer clicked")
    if (questions[qnumber].answers[0].correct)
      right = true;
  }
  userAnswer = document.getElementById("answer2");
  if (document.getElementById("answer2").checked) {
    console.log("second answer clicked")
    if (questions[qnumber].answers[1].correct)
      right = true;
  }
  userAnswer = document.getElementById("answer3");
  if (document.getElementById("answer3").checked) {
    console.log("third answer clicked")
    if (questions[qnumber].answers[2].correct)
      right = true;
  }
  userAnswer = document.getElementById("answer4");
  if (document.getElementById("answer4").checked) {
    console.log("fourth answer clicked")
    if (questions[qnumber].answers[3].correct)
      right = true;
  }
  // Once all questions have been answered, go to quizComplete
  qnumber++;
  if (qnumber > questions.length - 1)
    quizComplete();
  else {
    showQuestion();
    //time is added to clock if answer is wrong
    console.log(right);
    if (right === false)
      (numberCount = numberCount - 10);
  }
}

//quiz ends and user is able to write their name to be put into the leaderboard

function quizForcedEnd() {
  clearInterval(handler);
  var audio = new Audio("Assets/YouLose.mp3");
  audio.play();

}

function quizComplete() {
  clearInterval(handler);
  document.getElementById("winMessage").style.display = "block";
  //textbox for name to be put on the leaderboard

}

//Highscore leaderboard appears with all scores

function submitName() {
  var nameSubmitted = document.getElementById("playerName").value;
  var quizScore = (numberCount + 40);
  var quizLeaderboard = localStorage.getItem("Quiz Leaderboard");
  quizLeaderboard = quizLeaderboard + nameSubmitted + "   " + quizScore + "   ,";
  localStorage.setItem("Quiz Leaderboard", quizLeaderboard);
  var leaderboardElement = document.getElementById("leaderboard");
  leaderboardElement.style.display = "block";
  leaderboardElement.innerHTML = quizLeaderboard;


}


