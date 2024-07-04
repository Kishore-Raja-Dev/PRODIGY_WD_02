// script.js
let startTime, updatedTime, difference, tInterval, savedTime;
let running = false;
let lapCount = 0;

const display = document.getElementById('display');
const startStopButton = document.getElementById('startStop');
const resetButton = document.getElementById('reset');
const lapButton = document.getElementById('lap');
const laps = document.getElementById('laps');

function startStopwatch() {
    if (!running) {
        startTime = new Date().getTime();
        tInterval = setInterval(getShowTime, 1);
        startStopButton.textContent = "Stop";
        running = true;
    } else {
        clearInterval(tInterval);
        savedTime = difference;
        startStopButton.textContent = "Start";
        running = false;
    }
}

function resetStopwatch() {
    clearInterval(tInterval);
    savedTime = 0;
    difference = 0;
    display.textContent = "00:00:00";
    running = false;
    startStopButton.textContent = "Start";
    laps.innerHTML = '';
    lapCount = 0;
}

function lapStopwatch() {
    if (running) {
        lapCount++;
        const li = document.createElement('li');
        li.textContent = `Lap ${lapCount}: ${display.textContent}`;
        laps.appendChild(li);
    }
}

function getShowTime() {
    updatedTime = new Date().getTime();
    if (savedTime) {
        difference = updatedTime - startTime + savedTime;
    } else {
        difference = updatedTime - startTime;
    }
    let hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((difference % (1000 * 60)) / 1000);
    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;
    display.textContent = hours + ":" + minutes + ":" + seconds;
}

startStopButton.addEventListener('click', startStopwatch);
resetButton.addEventListener('click', resetStopwatch);
lapButton.addEventListener('click', lapStopwatch);
