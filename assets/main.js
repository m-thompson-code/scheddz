'use strict';

/* main function that updates the ui over time */

function tick() {
    const now = moment();

    const newCurrentHour = now.hours();

    if (newCurrentHour !== currentHour) {
        currentHour = now.hours();
        updateRowClasses(currentHour);
    }

    updateClockText(now);   
}

/* END main function that updates the ui over time */



/* LocalStorage helpers */

function getStorage() {
    const serializedValue = localStorage.getItem('storage') || '';

    try {
        return JSON.parse(serializedValue);
    } catch(error) {
        return ['Click here to update schedule'];
    }
}

function setStorage() {
    const serializedValue = JSON.stringify(storage);

    localStorage.setItem('storage', serializedValue);
}

/* END LocalStorage helpers */



/* Getting reference to elements */

function getScheduleElements() {
    const eles = [];

    const times = [
        '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm',
    ];

    let hour = 9;

    for (let i = 0; i < times.length; i++) {
        const time = times[i];

        eles.push({
            rowEle: $(`#row-${time}`),
            textareaEle: $(`#textarea-${time}`),
            saveButtonEle: $(`#save-button-${time}`),
            hour: hour,
        });

        hour += 1;
    }

    return eles;
}

/* END Getting reference to elements */



/* Handle clock text */

function updateClockText (now) {
    const currentDayEle = document.getElementById('currentDay');

    currentDayEle.textContent = now.format("dddd, MMMM Do YYYY, h:mm:ss A");
}

/* END Handle clock text */



/* Past, present, future class helpers */

function removeClasses(ele) {
    ele.removeClass('past');
    ele.removeClass('present');
    ele.removeClass('future');
}

function addPastClass(ele) {
    removeClasses(ele);
    ele.addClass('past');
}

function addPresentClass(ele) {
    removeClasses(ele);
    ele.addClass('present');
}

function addFutureClass(ele) {
    removeClasses(ele);
    ele.addClass('future');
}

/* End Past, present, future class helpers */

/* Updating row classes for past, present, future */

function updateRowClasses(currentHour) {
    for (let i = 0; i < scheduleElements.length; i++) {
        const ele = scheduleElements[i].rowEle;
        const hour = scheduleElements[i].hour;
    
        if (hour < currentHour) {
            addPastClass(ele);
        } else if (hour === currentHour) {
            addPresentClass(ele);
        } else {
            addFutureClass(ele);
        }
    }
}

/* END Updating row classes for past, present, future */



let currentHour;

const storage = getStorage();

const scheduleElements = getScheduleElements();

console.log(scheduleElements);


// function bindSaveFunc(textarea, saveButton) {
//     saveButton.onclick = () => {

//     }
// }




setInterval(tick, 1000);

tick();
