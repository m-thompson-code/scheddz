'use strict';

/* main function that updates the ui over time */


// Manipulate now to start at Sun Jan 24 2021 12:59:55 GMT-0800
const fixedStartMoment = moment(`Sun Jan 24 2021 12:59:55 GMT-0800`);
const fixedNow = moment();

function getNow() {
    // return moment();

    return moment().subtract(fixedNow.diff(fixedStartMoment));
}

function tick() {
    const now = getNow();

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

    // If JSON.parse fails (like when passing an empty string), let's return an array with a default text value
    try {
        return JSON.parse(serializedValue);
    } catch(error) {
        // console.error(error);
        return ['Update the text for 9am here'];
    }
}

function setStorage(storage) {
    const serializedValue = JSON.stringify(storage);

    localStorage.setItem('storage', serializedValue);
}

/* END LocalStorage helpers */

const times = [
    '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm',
];

/* Appending elements to dom */

function appendScheduleElementsToDOM() {
    for (let i = 0; i < times.length; i++) {
        const time = times[i];

        // const row = `<div id="row-${time}" class="row">
        //     <div class="col-md-1 hour">${time}</div>
        //     <div class="col-md-10 textarea-container">
        //         <textarea id="textarea-${time}"></textarea>
        //     </div>
        //     <div id="save-button-${time}" class="col-md-1 save-button"><i class="fa fa-save"></i></div>
        // </div>`;

        // const row = `<div id="row-${time}" class="row">
        //     <div class="col-md-1 hour">${time}</div>
        //     <div class="col-md-10 textarea-container">
        //         <textarea id="textarea-${time}"></textarea>
        //     </div>
        //     <div tabindex="0" id="save-button-${time}" class="col-md-1 save-button"><i class="fa fa-save"></i></div>
        // </div>`;

        const row = `<div id="row-${time}" class="row">
            <label class="col-md-1 hour" for="textarea-${time}">${time}</label>
            <div class="col-md-10 textarea-container">
                <textarea id="textarea-${time}"></textarea>
            </div>
            <div tabindex="0" id="save-button-${time}" class="col-md-1 save-button"><i class="fa fa-save"></i></div>
        </div>`;

        $('#schedule-container').append(row);
    }
}

/* END Appending elements to dom */



/* Getting reference to elements */

function getScheduleElements() {
    const eles = [];

    // const times = [
    //     '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm',
    // ];

    // Starting hour value (9am)
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
    const currentDayEle = $('#currentDay');

    currentDayEle.text(now.format("dddd, MMMM Do YYYY, h:mm:ss A"));
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

/* Getting and saving text for textareas */

function setTextareaTexts(source, scheduleElements) {
    for (let i = 0; i < scheduleElements.length; i++) {
        const textareaEle = scheduleElements[i].textareaEle;
        textareaEle.val(source[i] || '');
    }
}

function bindSaveFuncs(storage, scheduleElements) {
    for (let i = 0; i < scheduleElements.length; i++) {
        const saveButtonEle = scheduleElements[i].saveButtonEle;
        const textareaEle = scheduleElements[i].textareaEle;

        console.log(saveButtonEle);

        saveButtonEle.click(() => {
            storage[i] = textareaEle.val() || '';

            setStorage(storage);
            console.log(storage);

            addAlert('Schedule has been updated!', 'success');
        });
    }
}

/* END Getting and saving text for textareas */



/* Managing alerts */

let alertTimeout;

function removeAlerts() {
    clearTimeout(alertTimeout);

    $( ".alert" ).each(function () {
        $(this).remove();
    });
}

function addAlert(message, type) {
    removeAlerts();

    $('body').append(`<div class="alert alert-${type} role="alert">${message}</div`);

    alertTimeout = setTimeout(() => {
        fadeAlertsOut();
    }, 2000);
}

function fadeAlertsOut() {
    $( ".alert" ).each(function () {
        $(this).addClass('fade-out');
    });

    clearTimeout(alertTimeout);

    alertTimeout = setTimeout(() => {
        removeAlerts();
    }, 400);
}

/* END Managing alerts */



// Store the current hour (used to update the past, present, future classes on the row divs)
let currentHour;

// Get storage from LocalStorage
const storage = getStorage();

// Append schedule elements
appendScheduleElementsToDOM();

// Get jQuery reference to schedule elements to set textarea texts and bind save functions to save buttons
const scheduleElements = getScheduleElements();

// Set the text of all the textareas from storage
setTextareaTexts(storage, scheduleElements);

// Bind save functions to save buttons
bindSaveFuncs(storage, scheduleElements);

// Call tick ever second
setInterval(tick, 1000);

// Call tick asap to update ui asap
tick();
