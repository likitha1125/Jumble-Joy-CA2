const playerName = localStorage.getItem("playerName");

const greetingElement = document.getElementById("greeting");
if (playerName) {
  greetingElement.innerText = `Hey, Good to see you, ${playerName}! 🫱🏻‍🫲🏻`;
} else {
  greetingElement.innerText = "Hey, Good to see you";
}

const backgroundMusic = new Audio("audio.mp3");
const timeUpAudio = new Audio("timeup.mp3");
const winPointAudio = new Audio("points.mp3");
const errorAudio = new Audio("error.mp3"); 
const playBackgroundMusic = () => {
  backgroundMusic.play();
  backgroundMusic.loop = true;
};

const stopBackgroundMusic = () => {
  backgroundMusic.pause();
  backgroundMusic.currentTime = 0;
};

const playTimeUpAudio = async () => {
    return new Promise((resolve) => {
      timeUpAudio.addEventListener("ended", resolve);
      timeUpAudio.play();
    });
  };

const wordText = document.querySelector(".word"),
  hintText = document.querySelector(".hint span"),
  timeText = document.querySelector(".time b"),
  inputField = document.querySelector("input"),
  refreshBtn = document.querySelector(".refresh-word"),
  checkBtn = document.querySelector(".check-word"),
  scoreDisplay = document.querySelector(".score-menu b");

let correctWord, timer, score = 0;

const initTimer = (maxTime) => {
    clearInterval(timer);
    timer = setInterval(() => {
      if (maxTime > 0) {
        maxTime--;
        timeText.innerText = maxTime;
      } else {
        stopBackgroundMusic();
        timeUpAudio.currentTime = 0; // Reset audio to the beginning
        timeUpAudio.play(); // Play the time-up audio
        alert(`Time off! ${correctWord.toUpperCase()} was the correct word`);
        if (score >= 100) {
          location.href = "./score.html?score=" + score;
        } else {
          location.href = "./score.html?score=" + score;
        }
        initGame();
      }
    }, 1000);
  };
const initGame = () => {
  playBackgroundMusic();
  initTimer(10);
  let randomObj = words[Math.floor(Math.random() * words.length)];
  let wordArray = randomObj.word.split("");
  for (let i = wordArray.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [wordArray[i], wordArray[j]] = [wordArray[j], wordArray[i]];
  }
  wordText.innerText = wordArray.join("");
  hintText.innerText = randomObj.hint;
  correctWord = randomObj.word.toLowerCase();
  inputField.value = "";
  inputField.setAttribute("maxlength", correctWord.length);
};

const checkWord = () => {
  let userWord = inputField.value.toLowerCase();
  if (!userWord) return alert("Please enter the word to check!");
  if (userWord !== correctWord) {
    backgroundMusic.pause();
    errorAudio.play();
    alert(`Oops! ${userWord} is not the correct word`);
    location.href = "./score.html?score=" + score;
  } else {
    winPointAudio.play();
    score += 10;
    localStorage.setItem("score", score);
    alert(`Congrats! ${correctWord.toUpperCase()} is the correct word`);
  }
  updateGameResultHTML(score);
  initGame();
};

const updateGameResultHTML = () => {
  scoreDisplay.innerText = score;
};

refreshBtn.addEventListener("click", initGame);
checkBtn.addEventListener("click", checkWord);

window.onload = () => {
  initGame();
  updateGameResultHTML();
};
