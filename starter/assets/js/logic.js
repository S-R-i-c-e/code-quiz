// CONSTANT AND VARIABLE DECLARATIONS
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
// quiz is the code questions array defined in questions.js file
let quiz = shuffleArray(codeQuestions); // pre-mix the questions
let timeHandle = undefined;             // used to clear main timer at the end
// variables required by code-quiz
let score = 0;
let timer = 50;                 // 50 seconds

// EVENT LISTENERS
// to start the quiz
startButton.addEventListener("click", function(event) {
    hideScreen(startScreen);
    startTheQuiz();
});
// listen to the displayed answers - send the given answer for processing
quizScreen.addEventListener("click", function(event) {
    if (event.target.className === "answer") {      // event delegation
        clearVerdict();                             // clears the previous answer verdict in case you have beaten the delay time
        processAnswer(event.target.textContent);
    } 
});
// listen for initials entered
initialsButton.addEventListener("click", function(event) {
    event.preventDefault();                 // used a form for <Return> function
    processScore();
});
// TIMING FUNCTIONS
// startTiming: show the main quiz timer and start creating time events
function startTiming() {
    timerEl.textContent = timer;            // show the time left
    timeHandle = window.setInterval(updateTimer, ONE_SECOND);
}
// updateTimer: update timer ands check if time has run out
function updateTimer() {
    decreaseTime(1);                        // one second
    timerEl.textContent = timer;            // show updated timer
    if (timer <= 0) {                       // if time has run out
        window.clearInterval(timeHandle);   // stop the timer
        endGame();                          // end the fun
    }
}
function decreaseTime(decrement) {
    timer = timer - decrement;
}
// DISPLAY FUNCTIONS
function hideScreen(screenHandle) {
    screenHandle.setAttribute("class", "hide");
}
function showScreen(screenHandle) {
    screenHandle.setAttribute("class", "start");
}
// CODE-QUIZ FUNCTIONS
// startTheQuiz: change the quiz from hidden class and start asking
function startTheQuiz() {
    showScreen(quizScreen);
    store("Hi-Scores", retrieve("Hi-Scores") || []); // initialize Hi_scores first time ever
    startTiming();
    askQuestion();
}
// endGame: clear the question, show the end screen
function endGame() {
    hideScreen(quizScreen);
    showScreen(endScreen);
    finalScoreEl.textContent = score;
}
// askQuestion: pop a question...object off the randomized array of questions
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
    showScreen(verdictEl);                      // verdictEl not strictly a screen in this games screen context
    window.setTimeout(clearVerdict, ONE_SECOND); // leave verdict for a second (also cleared by quizScreen click event)
}
// clearVerdict: clear the right/wrong display
function clearVerdict() {
    verdictEl.textContent = "";
    hideScreen(verdictEl);
}
// mixAnswers: slice the possible question answers into an array, return shuffled array
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
    scoreEl.textContent = score; // show new score
}
// HI-SCORE FUNCTIONS
// processScore: add to table, and back to start screen
function processScore() {
    let hiScore={                                   // this hi-score entry               
        initials: initialsEntryEl.value,
        score: score
    }   
    let hiScoreTable = retrieve("Hi-Scores");
    hiScoreTable = hiScoreTable.concat(hiScore);    // append current score to table
    store("Hi-Scores", hiScoreTable);
    hideScreen(endScreen);
    showScreen(startScreen);
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