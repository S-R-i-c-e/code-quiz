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
// chooseQuestion: pick a question from the quiz at random.
function chooseQuestion() {
    return quiz[getRandomIndex(quiz.length)];
}
// rnd: generate a random integer in the range 0 to length-1.
function getRandomIndex(length) {
    return Math.floor(Math.random()*(length));
}
// shuffle: shuffle the elements of an array 
function shuffleArray(anArray) {
    const iterations = anArray.length;
    for (index=0;index<iterations;index++) {
        let randomIndex = getRandomIndex(anArray.length);
        console.log("index = " + index + " randomIndex = " + randomIndex);
        [anArray[index], anArray[randomIndex]] = [anArray[randomIndex], anArray[index]];
        console.log(anArray);
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
    answerArray = mixAnswers(question);
    answerOne.textContent = answerArray[0];
    answerTwo.textContent = answerArray[1];
    answerThree.textContent = answerArray[2];
    answerFour.textContent = answerArray[3];
 }

 function checkAnswer(answer) {
    return (quizScreen.getAttribute("correctAnswer") === answer);
 }
 