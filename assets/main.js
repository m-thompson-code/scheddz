'use strict';

let hour = 0;

function updateClockText (now) {
    const currentDayEle = document.getElementById('currentDay');

    currentDayEle.textContent = now.format("dddd, MMMM Do YYYY, h:mm:ss A");
}

function tick() {
    const now = moment();

    updateClockText(now);   
}

setInterval(tick, 1000);

tick();

const rowMap = [
    {
        rowEle: $('#hour-9am'),
        hour: 9,
    },
    {
        rowEle: $('#hour-10am'),
        hour: 10,
    },
    {
        rowEle: $('#hour-11am'),
        hour: 11,
    },
    {
        rowEle: $('#hour-12pm'),
        hour: 12,
    },
    {
        rowEle: $('#hour-1pm'),
        hour: 13,
    },
    {
        rowEle: $('#hour-2pm'),
        hour: 14,
    },
    {
        rowEle: $('#hour-3pm'),
        hour: 15,
    },
    {
        rowEle: $('#hour-4pm'),
        hour: 16,
    },
    {
        rowEle: $('#hour-5pm'),
        hour: 17,
    },
];

console.log(rowMap);

const currentHour = moment().hours();
console.log(currentHour);

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

for (let i = 0; i < rowMap.length; i++) {
    const ele = rowMap[i].rowEle;
    const hour = rowMap[i].hour;

    if (hour < currentHour) {
        addPastClass(ele);
    } else if (hour === currentHour) {
        addPresentClass(ele);
    } else {
        addFutureClass(ele);
    }
}