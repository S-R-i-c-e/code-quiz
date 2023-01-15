// CONSTANT AND VARIABLE DECLERATIONS
// name the html element handles
const startButton = document.querySelector("#start");
const startScreen = document.querySelector("#start-screen");
const quizScreen = document.querySelector("#quiz-screen");
const questionEl = document.querySelector("#question-title");
const answerList = document.querySelector("#answer-list");
const scoreEl = document.querySelector("#score");
const timerEl = document.querySelector("#time");
// time is constant
const ONE_SECOND = 1000; // (ms)
// the quiz is is the code questions array defined in questions.js file
let quiz = shuffleArray(codeQuestions);   // pre-mix the questions
let timeHandle = undefined;
// variables required by code-quiz
let score = 0;
let timer = 10;                 // 10 seconds

// EVENT LISTENERS
// to start the quiz
startButton.addEventListener("click", function(event) {
    startScreen.setAttribute("class", "hide");
    startTheQuiz();
});

// listen to the displayed answers
quizScreen.addEventListener("click", function(event) {
    if (event.target.className === "answer") {
        if (isAnswerCorrect(event.target.textContent)) {
            incrementScore();
        };
        askQuestion();
    }   
});
// TIMING FUNCTIONS
// startTiming: show the timer and start creating time events
function startTiming() {
    timerEl.textContent = timer;
    timeHandle = window.setInterval(updateTimer, ONE_SECOND);
}
// updateTimer: update timer ands check if time has run out
function updateTimer() {
    timer = timer - 1;
    timerEl.textContent = timer; 
    if (timer === 0) {
        window.clearInterval(timeHandle);
        endGame();
    }

}
// CODE-QUIZ FUNCTIONS
// startTheQuiz: change the quiz from hidden class and start asking
function startTheQuiz() {
    quizScreen.setAttribute("class", "start");  // TODO - arcane
    startTiming();
    askQuestion();
}
function endGame() {
    quizScreen.setAttribute("class", "hide");
    
}
// askQuestion: pop a question object off the random array of questions
function askQuestion() {  
    let question = quiz.pop();     // the questions are pre-mixed
    showQuestion(question);
}
// put the possible question answers into an array and call shuffle on it
function mixAnswers(questionObject) {
    answersArray = Object.values(questionObject).slice(questionObjectAnswerStartIndex, // start/end defined in questions.js
                                                    questionObjectAnswerEndIndex);
    return shuffleArray(answersArray);
    }
// showQuestion: store the answer in the HTML element, show the question, mix-up the possible answers and show them
 function showQuestion(question) {
    quizScreen.setAttribute("data-answer", question.answer);        // store the correct answer
    questionEl.textContent = question.question;                     // ask the question
    answerElements = answerList.children;                           // place the four answer display elements into an array
    answerArray = mixAnswers(question);                             // mix the four possible answers into an array
    for (index=0; index < answerElements.length; index++) {         // display the mixed possible answers 
        answerElements[index].textContent = answerArray[index];
    }
 }
// isAnswerCorrect: does the selected answer text match the stored correct answer text
 function isAnswerCorrect(answer) {
    return (quizScreen.getAttribute("data-answer") === answer);
 }
// incrementScore: show the incremented score in the score element
function incrementScore() {
    score = score + 1;
    scoreEl.textContent = score;
}
// GENERIC FUNCTIONS
// randomIndex: generate a random integer in the range 0 to length-1.
function getRandomIndex(length) {
    return Math.floor(Math.random()*(length));
}
// shuffleArray: shuffle the elements of an array - good enough for this quiz
function shuffleArray(anArray) {
    for (index=0; index<anArray.length; index++) {
        let randomIndex = getRandomIndex(anArray.length);
        [anArray[index], anArray[randomIndex]] = [anArray[randomIndex], anArray[index]];
    }
    return anArray;
}
