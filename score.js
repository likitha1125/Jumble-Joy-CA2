const lostmusic = new Audio("lost.mp3");
    const winningmusic = new Audio("win.wav");


var score=localStorage.getItem("score");

var scoreBoard=document.getElementById("score");
scoreBoard.innerHTML=score;



document.addEventListener("DOMContentLoaded", function (score) {

    const winningPhrases = [
        "Awesome!",
        "Outstanding!",
        "Fantastic!",
        "Impressive!",
        "Bravo!",
        "Superb!"
    ];

    const losingPhrases = [
        "Time ran out!",
        "Give it another shot!",
        "Keep practicing!",
        "You'll get it next time.",
        "Don't give up!",
        "It's okay to lose!",
        "Failure is not the opposite of success; it's part of success."

        
    ];

    const winningLine = "You Win❤️";
    const losingLine = "Game Over💔";

    function getRandomPhrase(phrasesArray) {
        var randomIndex = Math.floor(Math.random() * phrasesArray.length);
        return phrasesArray[randomIndex];
    }

    function updateGameResultHTML() {
        
        var resultElement = document.getElementById("Message");
        var resultElement1 = document.getElementById("line");
        var score=localStorage.getItem("score");
        var randomPhrase = "";
        if (score>=50) {
            randomPhrase = getRandomPhrase(winningPhrases);
            resultElement1.innerHTML = winningLine;
            localStorage.setItem("score",0);
            console.log(score,"winner");
            winningmusic.play();
        } else {
            
            randomPhrase = getRandomPhrase(losingPhrases);
            resultElement1.innerHTML = losingLine;
            localStorage.setItem("score",0);
            console.log(score,"looser");
            lostmusic.play();
            
        }

        resultElement.innerHTML = randomPhrase;
    }

    const start = document.getElementById("playAgain")

    start.onclick = () => {
        location.href = "./game.html"
    }

    updateGameResultHTML();

});