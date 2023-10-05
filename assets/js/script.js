

// hooks
const currTime = document.getElementById("current-time");
const currDay = document.getElementById("current-day");
const day = dayjs().format("D")
const loadingHour = Array.from(document.querySelectorAll(".time-block"));

// global var
var hours, minutes, seconds;
var dayText, month, dayNum;

let hour = 0;
let text = "";

// global arr
let schedule = [];

// on start up func
$(function () {

    console.log("hi we started");

    // display time 
    displayTime();

    // init func 
    init();


    // button 
    $(".saveBtn").on("click", setSavedData);

    // interval to update 
    setInterval(function () {
        displayTime();
    }, 1000);
});

// func to update hour every 15 min 
function updateHour() {

}

// func to get stored data
function getSavedData() {

}

// func to save new data to storage
function setSavedData() {

}

// func to display curr time 
function displayTime() {
    console.log("hi we made it here");
    // var for running time
    let date = new Date();

    dayNum = date.getDay() + 1;
    month = date.getMonth() + 1;

    hours = rolloverTimes(date.getHours(), true);
    minutes = rolloverTimes(date.getMinutes());
    seconds = rolloverTimes(date.getSeconds());

    date = month + "/" + dayNum;

    console.log(date);
    // set current Day Month and Date
    currDay.innerText = dayjs().format("dddd, MMMM D");

    // call postfix to add appropriate ending
    postfixDay();
    currTime.innerText = hours + ":" + minutes + ":" + seconds + postFix;
}

// func to am to pm 
function rolloverTimes(num, hours) {

}


// func to initalize app
function init() {

}

// func to get postfix 
function postfixDay(day){

}