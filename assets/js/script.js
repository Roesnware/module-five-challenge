/*
Office Hours Todo:
    - local storage bug
    - update every 15 min?
*/

// hooks
const currTime = document.getElementById("current-time");
const currDay = document.getElementById("current-day");
const day = dayjs().format("D");
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

    // console.log("hi we started");

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
    // for comparing
    var currHour = dayjs().format("HH");

    // iterate divs
    for (let i = 9; i <= 17; i++) {
        // see if curr hour is over div id
        // add past 
        // see if equal 
        // add present
        // otherwise in future
        if (currHour > i) {
            $(`#${i}`).addClass("past");
            //console.log("past");
        } else if (currHour == i) {
            $(`#${i}`).addClass("present");
            //console.log("present");
        } else {
            $(`#${i}`).addClass("future");
            //console.log("future");
        }
    }
}

// func to display curr time 
function displayTime() {
    //console.log("hi we made it here");
    // var for running time
    let date = new Date();

    dayNum = date.getDay() + 1;
    month = date.getMonth() + 1;

    hours = rolloverTimes(date.getHours(), true);
    minutes = rolloverTimes(date.getMinutes());
    seconds = rolloverTimes(date.getSeconds());

    date = month + "/" + dayNum;

    //console.log(date);
    // set current Day Month and Date
    currDay.innerText = dayjs().format("dddd, MMMM D");

    // call postfix to add appropriate ending
    postfixDay();
    // currTime.innerText = hours + ":" + minutes + ":" + seconds + postFix;
}

// func to am to pm 
function rolloverTimes(num, hours) {
    // if time less than 10
    if (num < 10) {
        // morning time
        postFix = "AM"
        return "0" + num;
    } else {
        if (hours) {
            // evening time
            postFix = "PM"
            // update var for visibility
            return num - 12;
        }
        return num;
    }
}

// func to initalize app
function init() {

    // reset class stylings
    $(loadingHour).removeClass("past");
    $(loadingHour).removeClass("present");
    $(loadingHour).removeClass("future");

    // add class styles based on curr hour
    updateHour();

    // load saved data
    getSavedData();
}

// func to get postfix 
function postfixDay(day) {
    // modulus to get remainder 
    // check for 1s etc..
    if ((day % 10) == 1) {
        currDay.innerText += "st";
        // add st at end
    } else if ((day % 10) == 2) {
        currDay.innerText += "nd";
        // add nd at end
    } else if ((day % 10) == 3) {
        currDay.innerText += "rd";
        // add rd at end
    } else {
        currDay.innerText += "th";
    }
}

// func to save data
function setSavedData() {

    // load stored data 
    let retrieved = JSON.parse(localStorage.getItem("scheduleForWeek"));

    // this button pressed
    let dataParent = $(this).parent();

    // for inner text
    let data = dataParent.children("textarea").val();

    // get parent id
    let id = dataParent.attr("id");

    // make sure its empty if null
    if (retrieved == null) {
        // if null set empty
        retrieved = [];
    }

    // store data for each id
    localStorage.setItem(`${id}`, JSON.stringify(data));
}

// fucn to get saved data 
function getSavedData() {

    // iterate divs
    loadingHour.forEach(element => {

        // set text to data form mem
        $(element).children("textarea").text(JSON.parse(localStorage.getItem(element.id)));
    });
}
