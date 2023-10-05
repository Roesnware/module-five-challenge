

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
    // for comparing
    var currHour = dayjs().format("HH");
    
    // iterate divs
    for(let i = 9; i <= 17; i++){
        // see if curr hour is over div id
            // add past 
        // see if equal 
            // add present
        // otherwise in future
        if(currHour > i) {
            $(`#${i}`).addClass("past");
            console.log("past");
        } else if (currHour == i) {
            $(`#${i}`).addClass("present");
            console.log("present");
        } else {
            $(`#${i}`).addClass("future");
            console.log("future");
        }
    }
}

// func to get stored data
function getSavedData() {

    // get adn parse local storage data
    let retrieved = JSON.parse(localStorage.getItem("scheduleForWeek"));

    console.log(retrieved);

    // iterate divs 
    loadingHour.forEach(element => {

        // empty string
        var returnedData = "";

        // iterate stored data
        retrieved.forEach(e => {

            // conditional if div id matches stored data
            if(element.id == e.id){

                // set string to stored data
                returnedData = e.data;
            }
        }) 
        // set stored data to screen 
        $(element).children("textarea").text(returnedData);
    });
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
function postfixDay(day){
    // modulus to get remainder 
    // check for 1s etc..
    if((day % 10) == 1) {
        currDay.innerText += "st";
        // add st at end
    } else if((day % 10) == 2) {
        currDay.innerText += "nd";
        // add nd at end
    } else if ((day % 10) == 3) {
        currDay.innerText += "rd";
        // add rd at end
    } else {
        currDay.innerText += "th";
    }
}