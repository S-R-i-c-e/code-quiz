// CONSTANT AND VARIABLE DECLERATIONS
// name the html element handles
const startButton = document.querySelector("#start");
const initialsButton = document.querySelector("#submit");
const startScreen = document.querySelector("#start-screen");
const quizScreen = document.querySelector("#quiz-screen");
const endScreen = document.querySelector("#end-screen");
const questionEl = document.querySelector("#question-title");
const verdictEl = document.querySelector("#answer-verdict");
const answerList = document.querySelector("#answer-list");
const scoreEl = document.querySelector("#score");
const initialsEntryEl = document.querySelector("#initials");
const finalScoreEl = document.querySelector("#final-score");
const timerEl = document.querySelector("#time");
// time is constant
const ONE_SECOND = 1000; // (ms)
// the quiz is is the code questions array defined in questions.js file
let quiz = shuffleArray(codeQuestions);   // pre-mix the questions
let timeHandle = undefined;
// variables required by code-quiz
let score = 0;
let timer = 50;                 // 10 seconds

// EVENT LISTENERS
// to start the quiz
startButton.addEventListener("click", function(event) {
    startScreen.setAttribute("class", "hide");
    startTheQuiz();
});
// listen to the displayed answers - send the given answer for processing
quizScreen.addEventListener("click", function(event) {
    if (event.target.className === "answer") {
        clearVerdict();                             // clears the previous answer verdict in case you have beaten the timer to it
        processAnswer(event.target.textContent);
    } 
});
// listen for initials entered
initialsButton.addEventListener("click", function(event) {
    event.preventDefault();
    processScore();
});
// TIMING FUNCTIONS
// startTiming: show the main quiz timer and start creating time events
function startTiming() {
    timerEl.textContent = timer;
    timeHandle = window.setInterval(updateTimer, ONE_SECOND);
}
// updateTimer: update timer ands check if time has run out
function updateTimer() {
    decreaseTime(1);                        // one second
    timerEl.textContent = timer;            // show updated timer
    if (timer <= 0) {                      // if time has run out
        window.clearInterval(timeHandle);   // stop the timer
        endGame();                          // end the fun
    }
}
function decreaseTime(decrement) {
    timer = timer - decrement;
}
// CODE-QUIZ FUNCTIONS
// startTheQuiz: change the quiz from hidden class and start asking
function startTheQuiz() {
    quizScreen.setAttribute("class", "start");
    store("Hi-Scores", retrieve("Hi-Scores") || []); // initialize Hi_scores first time ever
    startTiming();
    askQuestion();
}
// endGame: clear the question, show the end screen
function endGame() {
    quizScreen.setAttribute("class", "hide");
    endScreen.setAttribute("class", "start");
    finalScoreEl.textContent = score;
}
// askQuestion: pop a question object off the random array of questions
function askQuestion() {  
    let question = quiz.pop();     // the questions are pre-mixed
    showQuestion(question);
}
// processAnswer: check the answer -  right - inc. score, wrong dec. time
function processAnswer(givenAnswer) {
    if (isAnswerCorrect(givenAnswer)) {
        incrementScore();
        answerVerdict("Correct!");
    } else {
        decreaseTime(10);
        answerVerdict("Wrong - 10 seconds subtracted");
    }
    askQuestion();
}
// answerVerdict: displays right or wrong to the user
function answerVerdict(verdict) {
    verdictEl.textContent = verdict;
    verdictEl.setAttribute("class", "start");
    window.setTimeout(clearVerdict, ONE_SECOND); // pause for a second
}
// clearVerdict: clear the right/wrong display
function clearVerdict() {
    verdictEl.textContent = "";
    verdictEl.setAttribute("class", "hide");
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
// HI-SCORE FUNCTIONS
// processScore: store, i.e. add to table, and back to start screen
function processScore() {
    let hiScore={                                   // this hi-score entry               
        initials: initialsEntryEl.value,
        score: score
    }   
    let hiScoreTable = retrieve("Hi-Scores");
    hiScoreTable = hiScoreTable.concat(hiScore);    // append current score to table
    store("Hi-Scores", hiScoreTable);
    endScreen.setAttribute("class", "hide");        // close end-game screen
    startScreen.setAttribute("class", "start");     // reopen start screen
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
// set and get local storage
function store(storageName, obj) {
    localStorage.setItem(storageName, JSON.stringify(obj));    
}
function retrieve(storageName) {
    return JSON.parse(localStorage.getItem(storageName));
}