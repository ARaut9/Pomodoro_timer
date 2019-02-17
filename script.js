const sessionIncrement = document.getElementById("session-increment");
const sessionDecrement = document.getElementById("session-decrement");
const breakIncrement = document.getElementById("break-increment");
const breakDecrement = document.getElementById("break-decrement");

sessionIncrement.addEventListener("click", setTime);
sessionDecrement.addEventListener("click", setTime);
breakIncrement.addEventListener("click", setTime);
breakDecrement.addEventListener("click", setTime);

const sessionTime = document.getElementById("session-time");
const breakTime = document.getElementById("break-time");

// increment and decrements time based on button clicked
function setTime(e) {
    if(e.target.id == "session-increment" || e.target.id == "session-decrement") {
        time = Number(sessionTime.textContent);
        if(e.target.id == "session-increment") {
            time += 1;
        } else {
            if(time > 1) {
                time -= 1;
            }
        }

        if (time < 10) {
            sessionTime.textContent = `0${time}`;
        } else {
            sessionTime.textContent = time;
        }
    } else {
        time = Number(breakTime.textContent);
        if(e.target.id == "break-increment") {
            time += 1;
        } else {
            if(time > 1) {
                time -= 1;
            }
        }

        if (time < 10) {
            breakTime.textContent = `0${time}`;
        } else {
            breakTime.textContent = time;
        }
    }

    if (sessionFocused === true) {
        DisplayTime.textContent = `${sessionTime.textContent}:00`;
    } else {
        DisplayTime.textContent = `${breakTime.textContent}:00`;
    }
}

const startBtn = document.getElementById("start-btn");
const DisplayTime = document.getElementById("display-time");
let timer;
paused = false;
let sessionFocused = true;

startBtn.addEventListener("click", () => {
    let time = DisplayTime.textContent.split(":");
    let minutes;
    let seconds;
    if (paused) {
        minutes = Number(time[0]);
        seconds = Number(time[1]);
    } else {
        minutes = Number(time[0] - 1);
        seconds = 60;
    }
    
    timer = setInterval(() => {
       seconds -= 1;
       // conditions to apply padding or not
       if (seconds < 10 && minutes < 10) {
            DisplayTime.textContent = `0${minutes}:0${seconds}`
       } else if (seconds < 10) {
            DisplayTime.textContent = `${minutes}:0${seconds}`
       } else if (minutes < 10) {
            DisplayTime.textContent = `0${minutes}:${seconds}`
       } else {
            DisplayTime.textContent = `${minutes}:${seconds}`;
       }

       if (seconds == 0) {
           if(minutes == 0) {
                clearInterval(timer);
                let audio = new Audio("alarm-tone.mp3");
                audio.play();
                if (sessionFocused == true) {
                    alert("Session is complete, go take a short break");
                } else {
                    alert("Break is complete, start a new session and start working");
                }
           }
            seconds = 60;
            minutes -= 1;
        }
    }, 1000);

    sessionIncrement.disabled = true;
    sessionDecrement.disabled = true;
    breakIncrement.disabled = true;
    breakDecrement.disabled = true;
    startBtn.disabled = true;
    pauseBtn.disabled = false;
});

const pauseBtn = document.getElementById("pause-btn");
pauseBtn.disabled = true;
pauseBtn.addEventListener("click", () => { 
    paused = true;
    clearInterval(timer);
    startBtn.disabled = false;
});

const restartBtn = document.getElementById("restart-btn");
restartBtn.addEventListener("click", () => {
    clearInterval(timer);
    if(sessionFocused == true) {
        DisplayTime.textContent = `${sessionTime.textContent}:00`
    } else {
        DisplayTime.textContent = `${breakTime.textContent}:00`
    }
    paused = false;

    sessionIncrement.disabled = false;
    sessionDecrement.disabled = false;
    breakIncrement.disabled = false;
    breakDecrement.disabled = false;
    pauseBtn.disabled = true;
    startBtn.disabled = false;
});

const sessionBtn = document.getElementById("session-btn");
const breakBtn = document.getElementById("break-btn");

sessionBtn.addEventListener("click", setFocus);
breakBtn.addEventListener("click", setFocus);

// function to determine if user wants to start session or take a break
function setFocus(e) {
    if (e.target.id == "session-btn") {
        DisplayTime.textContent = `${sessionTime.textContent}:00`;
        sessionFocused = true;
        breakBtn.style.border = "none";
        sessionBtn.style.border = "1px solid white";
    } else {
        DisplayTime.textContent = `${breakTime.textContent}:00`;
        sessionFocused = false;
        sessionBtn.style.border = "none";
        breakBtn.style.border = "1px solid white";
    }

    clearInterval(timer);
    sessionIncrement.disabled = false;
    sessionDecrement.disabled = false;
    breakIncrement.disabled = false;
    breakDecrement.disabled = false;
}