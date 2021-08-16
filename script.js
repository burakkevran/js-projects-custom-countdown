const inputContainer = document.getElementById('input-container');
const countdownForm = document.getElementById('countdownForm');
const dateElement = document.getElementById('date-picker');
const countdownElement = document.getElementById('countdown');
const countdownElementTitle = document.getElementById('countdown-title');
const countdownElementButton = document.getElementById('countdown-button');
const timeElements = document.querySelectorAll('span');
const completeElement = document.getElementById('complete');
const completeElementInfo = document.getElementById('complete-info');
const completeButton = document.getElementById('complete-button');

let countdownTitle = '';
let countdownDate = '';
let countdownValue = Date;
let countdownActive;
let savedCountdown;

//timer values
const SECOND = 1000;
const MINUTE = SECOND * 60;
const HOUR = MINUTE * 60;
const DAY = HOUR * 24;

//The Date part here has a logic error if the date is the last day of the month, need to fix it some time
function returnLocalISOToday(isTomorrow) {
  let year = new Date().getFullYear().toString();
  let month = (new Date().getMonth() + 1).toString();
  if (month.length <2) {
    month = `0${month}`; 
  } 
  let day = isTomorrow ? (new Date().getDate() + 1).toString() : new Date().getDate().toString();
  if (day.length <2) {
    day = `0${day}`; 
  } 
  const today =`${year}-${month}-${day}`;
  return today;
}

function updateDOM() {
  if(countdownValue && countdownTitle){
    countdownActive = setInterval(()=> {
      const now = new Date().getTime();
      const distance = countdownValue - now;
    
      let days = Math.floor(distance/DAY).toString();
      let hours = Math.floor(distance % DAY / HOUR).toString();
      if (hours.length <2) {
        hours = `0${hours}`; 
      } 
      let minutes = Math.floor(distance % HOUR / MINUTE).toString();
      if (minutes.length <2) {
        minutes = `0${minutes}`; 
      } 
      let seconds = Math.floor(distance % MINUTE / SECOND).toString();
      if (seconds.length <2) {
        seconds = `0${seconds}`; 
      } 
      
      countdownElementTitle.textContent = `${countdownTitle}`;
      timeElements[0].textContent = `${days}`;
      timeElements[1].textContent = `${hours}`;
      timeElements[2].textContent = `${minutes}`;
      timeElements[3].textContent = `${seconds}`;
    
      inputContainer.hidden = true;
      countdownElement.hidden = false;

      if(distance < 0){
        countdownElement.hidden = true;
        completeElementInfo.textContent = `${countdownTitle} finished on ${countdownDate}`;
        completeElement.hidden = false;
        clearInterval(countdownActive);
      }
    }, SECOND);
  } else{
    alert('Please enter a valid title and date'.toUpperCase());
  }
}

function updateCountdown(event) {
  event.preventDefault();
  countdownTitle = event.srcElement[0].value;
  countdownDate = event.srcElement[1].value;
  countdownValue = new Date(countdownDate).getTime() + new Date(countdownDate).getTimezoneOffset() * MINUTE;
  savedCountdown = {title: countdownTitle, date: countdownDate,};
  localStorage.setItem('countdown', JSON.stringify(savedCountdown));
  updateDOM();

}

function reset() {

  inputContainer.hidden = false;
  countdownElement.hidden = true;
  completeElement.hidden = true;
  clearInterval(countdownActive);
  countdownTitle = '';
  countdownDate = '';
  localStorage.removeItem('countdown');
}

function loadSavedCountdown() {
  if(localStorage.getItem('countdown')){
    inputContainer.hidden = true;
    savedCountdown = JSON.parse(localStorage.getItem('countdown'));
    countdownTitle = savedCountdown.title;
    countdownDate = savedCountdown.date;
    countdownValue = new Date(countdownDate).getTime() + new Date(countdownDate).getTimezoneOffset() * MINUTE;
    updateDOM();
  }
}

dateElement.setAttribute('value', returnLocalISOToday(true));
dateElement.setAttribute('min', returnLocalISOToday(true));

countdownForm.addEventListener('submit', updateCountdown);
countdownElementButton.addEventListener('click', reset);
completeButton.addEventListener('click', reset);

loadSavedCountdown();