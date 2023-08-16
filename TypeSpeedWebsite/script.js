// Selecting HTML elements using their IDs
const textDisplay = document.getElementById('textToType');
const userInput = document.getElementById('userInput');
const startBtn = document.getElementById('startBtn');
const timerDisplay = document.getElementById('timer');
const resultsDisplay = document.getElementById('results');
const difficultySelector = document.getElementById('difficulty');

// Variables to hold text, index, timer, and time values
let textArray = [];
let currentIndex = 0;
let timer;
let startTime;
let endTime;

// Sample texts for different difficulty levels
const texts = {
  easy: ["The sun was warm on her face as she walked through the park, enjoying the gentle breeze and the chirping of birds in the trees.","The fluffy kitten pounced playfully on the ball of yarn, batting it around the room with its tiny paws.","The smell of freshly baked cookies wafted through the air, making everyone's mouths water in anticipation."],
  medium: ["The scientist peered through the microscope, carefully observing the intricate patterns of cells as they divided and multiplied.","The detective scanned the crime scene for clues, his trained eye catching the tiniest details that could unravel the mystery.","The artist dipped the brush into a palette of vibrant colors, then swept it across the canvas, bringing to life a breathtaking masterpiece."],
  difficult: ["The astronaut gazed out of the space station's window, awestruck by the vastness of the cosmos stretching out before them.","The philosopher pondered the nature of existence, delving into complex metaphysical concepts that challenged conventional understanding.","The virtuoso pianist's fingers danced across the keys in a flurry of intricate melodies, leaving the audience spellbound by the sheer technical prowess displayed."]
};

// Event listener for the START button
startBtn.addEventListener('click', startTest);

// Function to start the typing test
function startTest() {
  const selectedDifficulty = difficultySelector.value;
  const randomIndex = Math.floor(Math.random() * texts[selectedDifficulty].length);
  textArray = texts[selectedDifficulty][randomIndex].split('');
  currentIndex = 0;
  userInput.value = '';
  updateUserInterface();
  startTimer();
}

// Function to update the displayed text and highlighting
function updateUserInterface() {
  const textToShow = textArray.map((char, index) => {
    let colorClass = '';
    if (index < currentIndex) colorClass = 'green';
    else if (index === currentIndex) colorClass = 'current';
    return `<span class="${colorClass}">${char}</span>`;
  }).join('');
  textDisplay.innerHTML = textToShow;
}

// Function to update the timer display
function updateTimer() {
  const elapsedTime = Math.floor((Date.now() - startTime) / 1000);
  timerDisplay.textContent = `Time: ${elapsedTime}s`;
}

// Function to start the countdown timer
function startTimer() {
  startTime = Date.now();
  timer = setInterval(updateTimer, 1000);
  userInput.disabled = false;
  userInput.focus();
}

// Function to stop the timer and display results
function stopTimer() {
  clearInterval(timer);
  endTime = Date.now();
  userInput.disabled = true;
  displayResults();
}

// Event listener for user input
userInput.addEventListener('input', () => {
  const userText = userInput.value;
  if (userText === textArray.slice(0, userText.length).join('')) {
    currentIndex = userText.length;
    updateUserInterface();
    if (currentIndex === textArray.length) {
      stopTimer();
    }
  }
});

// Function to display typing test results
function displayResults() {
  const elapsedTimeInSeconds = (endTime - startTime) / 1000;
  const wordsTyped = textArray.join('').split(' ').length;
  const wordsPerMinute = Math.floor((wordsTyped / elapsedTimeInSeconds) * 60);
  resultsDisplay.innerHTML = `
    <p>Words per Minute: ${wordsPerMinute}</p>
    <p>Accuracy: ${calculateAccuracy()}%</p>
  `;
}

// Function to calculate accuracy percentage
function calculateAccuracy() {
  const correctChars = textArray.slice(0, currentIndex).join('');
  const userChars = userInput.value;
  let accurateChars = 0;
  for (let i = 0; i < correctChars.length; i++) {
    if (correctChars[i] === userChars[i]) {
      accurateChars++;
    }
  }
  return ((accurateChars / correctChars.length) * 100).toFixed(2);
}
