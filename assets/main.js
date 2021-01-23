'use strict';


function updateClockText () {
    const currentDayEle = document.getElementById('currentDay');

    currentDayEle.textContent = moment().format("dddd, MMMM Do YYYY, h:mm:ss A");
}

setInterval(updateClockText, 1000);

updateClockText();

