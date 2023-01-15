// element handles declared
const highTableEl = document.querySelector("#highscores");
const clearButton = document.querySelector("#clear");

// retrieve stored high scores
let highScoresData = retrieve("Hi-Scores");

// add listener - clear button flushes data and reloads the page to refresh the non-existent table
clearButton.addEventListener("click", function() {
    window.localStorage.clear();
    window.location.reload();
})
// loop through table
for (hiScoreIndex in highScoresData) {
    let scoreEntry = highScoresData[hiScoreIndex];
    console.log(scoreEntry);
    listElement = document.createElement("li");
    listElement.textContent = scoreEntry.initials + " : " + scoreEntry.score;
    highTableEl.appendChild(listElement);
}
// copied from logic.js
function retrieve(storageName) {
    return JSON.parse(localStorage.getItem(storageName));
}