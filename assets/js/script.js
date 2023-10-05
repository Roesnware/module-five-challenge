

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

    // pull and parse stored data
    let retrieved = JSON.parse(localStorage.getItem("scheduleForWeek"));

    console.log(retrieved);

    // declare target buttons parent to see divs
    let dataParent = $(this).parent();

    // text hook 
    let data = dataParent.children("textarea").val();
    console.log(data);

    // id hook
    let id = dataParent.attr("id");
    console.log(id);

    // object declaration with id and data 
    var hourlySchedule = {
        id: id,
        data: data
    };

    console.log(retrieved);

    // check if stored data is null
    if(retrieved == null){
        // if null set empty
        retrieved = [];
    }

    // iterate stored data
    retrieved.forEach(element => {
        // check if ids match  with new input id
        if(element == id){
            // if so then splice old out of stored data
            retrieved.splice(i, 1);
        }
    });

    console.log(hourlySchedule);
    // push input to store 
    schedule.push(hourlySchedule);

    console.log(schedule);

    // store data in local storage
    localStorage.setItem("scheduleForWeek", JSON.stringify(schedule));
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