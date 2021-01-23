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

$('#hour-9am').addClass('past');
$('#hour-10am').addClass('present');
$('#hour-11am').addClass('future');
