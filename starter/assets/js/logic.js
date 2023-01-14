/* start button starts quiz
*/
const startButton = document.querySelector("#start");
const startScreen = document.querySelector("#start-screen");
const quizScreen = document.querySelector("#quiz-screen");
const questionEl = document.querySelector("#question-title");
const answerOne = document.querySelector("#answerOne");
const answerTwo = document.querySelector("#answerTwo");
const answerThree = document.querySelector("#answerThree");
const answerFour = document.querySelector("#answerFour");

const quiz = codeQuestions;
console.log(quiz);

startButton.addEventListener("click", function(event) {
    startScreen.setAttribute("class", "hide");
    startTheQuiz();
});
quizScreen.addEventListener("click", function(event) {
    console.log("quiz screen clicked");
    console.log(event.target.className);
    
})

function startTheQuiz() {
    quizScreen.setAttribute("class", "start");
    askQuestion();
}

function askQuestion(){
    let question = chooseQuestion();
    showQuestion(question);
}

function chooseQuestion() {
    return quiz[0];
}
 function showQuestion(question) {
    questionEl.textContent = question.question;
    answerOne.textContent = question.answer;
    answerTwo.textContent = question.dummy1;
    answerThree.textContent = question.dummy2;
    answerFour.textContent = question.dummy3;
 }

// createQuestionCard: create HTML question card and return its tag
function createQuestionCard(question) {
    let questionCardTag = document.createElement("div");
    questionCardTag.appendChild(createTextElement(question.question));
    questionCardTag.textContent = question.question;
    return questionCardTag
}