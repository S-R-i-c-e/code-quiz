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
    if (event.target.className === "answer") {
        console.log(checkAnswer(event.target.textContent));
    }   
});

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
    quizScreen.setAttribute("correctAnswer", question.answer);
    console.log("quizScreen.value" + quizScreen.getAttribute("correctAnswer"));
    questionEl.textContent = question.question;
    answerOne.textContent = question.answer;
    answerTwo.textContent = question.dummy1;
    answerThree.textContent = question.dummy2;
    answerFour.textContent = question.dummy3;
 }

 function checkAnswer(answer) {
    return (quizScreen.getAttribute("correctAnswer") === answer);
 }