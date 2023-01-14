
const startButton = document.querySelector("#start");
const startScreen = document.querySelector("#start-screen");
const quizScreen = document.querySelector("#quiz-screen");
const questionEl = document.querySelector("#question-title");
const answerList = document.querySelector("#answer-list");
const scoreEl = document.querySelector("#score");

const quiz = codeQuestions;

let score = 0;
let timer = 0;


// EVENT LISTENERS
// ready, steady, GO!
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

// startTheQuiz: change the quiz from hidden class and start asking
function startTheQuiz() {
    quizScreen.setAttribute("class", "start");
    askQuestion();
}

// askQuestion: choose a question object at random from the array
// TODO shuffle the quiz to start and pop questions so none is asked twice
function askQuestion(){
    let question = chooseQuestion();
    showQuestion(question);
}
// chooseQuestion: pick a question from the quiz at random.
function chooseQuestion() {
    return quiz[getRandomIndex(quiz.length)];
}
// randomIndex: generate a random integer in the range 0 to length-1.
function getRandomIndex(length) {
    return Math.floor(Math.random()*(length));
}
// shuffleArray: shuffle the elements of an array 
function shuffleArray(anArray) {
    for (index=0; index<anArray.length; index++) {
        let randomIndex = getRandomIndex(anArray.length);
        [anArray[index], anArray[randomIndex]] = [anArray[randomIndex], anArray[index]];
    }
    return anArray;
}

function mixAnswers(questionObject) {
    answersArray = Object.values(questionObject).slice(questionObjectAnswerStartIndex, // start/end defined immediately before the quiz in questions.js
                                                    questionObjectAnswerEndIndex);
    console.log(answersArray);
    return shuffleArray(answersArray);
    }

 function showQuestion(question) {
    quizScreen.setAttribute("correctAnswer", question.answer);
    questionEl.textContent = question.question;
    answerElements = answerList.children;
    answerArray = mixAnswers(question);
    for (index=0; index < answerElements.length; index++) {
        answerElements[index].textContent = answerArray[index];
    }
 }

 function isAnswerCorrect(answer) {
    // TODO supposed to be using data-
    return (quizScreen.getAttribute("correctAnswer") === answer);
 }
 
 function displayScore() {
    scoreEl.textContent = score;
 }
 function incrementScore() {
    score += 1;
    displayScore();
 }