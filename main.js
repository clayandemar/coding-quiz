//global variables

var qnumber = 0

var numberCount = 60;

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
  {
    question: "Where do you reference your CSS file in your HTML",
    answers: [
      { text: "<head>", correct: true },
      { text: "<header>", correct: false },
      { text: "<body>", correct: false },
      { text: "<script>", correct: false },
    ]
  },
  {
    question: "What's it the smallest possible <h> tag can you have",
    answers: [
      { text: "4", correct: false },
      { text: "6", correct: true },
      { text: "8", correct: false },
      { text: "10", correct: false },
    ]
  },
  {
    question: "How do you create a new variable in JavaScript?",
    answers: [
      { text: "new xxx", correct: false },
      { text: "new var xxx", correct: false },
      { text: "var xxx", correct: true },
      { text: "function var xxx", correct: false },
    ]
  },
  {
    question: "What does JSON stand for?",
    answers: [
      { text: "JavaScript Object Notation", correct: true },
      { text: "Java Subject Oriented Notification", correct: false },
      { text: "JavaScript Object Notification", correct: false },
      { text: "Java Subject Oriented Notation", correct: false },
    ]
  },
  {
    question: "Which is a proper file name for CSS?",
    answers: [
      { text: "script.Java", correct: false },
      { text: "main.html", correct: false },
      { text: "style.css", correct: true },
      { text: "css.js", correct: false },
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

//question is answered and is captured, determined if right or wrong, then next question appears
function gradeAnswer() {
  var right = false;
  if (document.getElementById("answer1").checked) {
    if (questions[qnumber].answers[0].correct)
      right = true;
  }
  if (document.getElementById("answer2").checked) {
    if (questions[qnumber].answers[1].correct)
      right = true;
  }
  if (document.getElementById("answer3").checked) {
    if (questions[qnumber].answers[2].correct)
      right = true;
  }
  if (document.getElementById("answer4").checked) {
    if (questions[qnumber].answers[3].correct)
      right = true;
  } 

  // reset all answers to unchecked
  document.getElementById("answer1").checked = false;
  document.getElementById("answer2").checked = false;
  document.getElementById("answer3").checked = false;
  document.getElementById("answer4").checked = false;

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
//if timer runs out
function quizForcedEnd() {
  clearInterval(handler);
  var audio = new Audio("Assets/YouLose.mp3");
  audio.play();

}
// if time doesn't run out
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
  var leaderboardArray = JSON.parse(quizLeaderboard);
  var leaderboardElement = document.getElementById("leaderboard");
  if (!leaderboardArray)
    leaderboardArray = [];
  leaderboardArray.push({ name: nameSubmitted, score: quizScore });
  leaderboardElement.style.display = "block";
  localStorage.setItem("Quiz Leaderboard", JSON.stringify(leaderboardArray));
  for (i = 0; i < leaderboardArray.length; i++) {
    leaderboardElement.innerHTML += "<p>" + leaderboardArray[i].name +  "   " + leaderboardArray[i].score +  "</p>";
  }
}
