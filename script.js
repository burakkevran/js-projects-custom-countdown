const inputContainer = document.getElementById('input-container');
const countdownForm = document.getElementById('countdownForm');
const dateElement = document.getElementById('date-picker');


function returnLocalISOToday() {
  let year = new Date().getFullYear().toString();
  let month = (new Date().getMonth() + 1).toString();
  if (month.length <2) {
    month = `0${month}`; 
  } 
  let day = new Date().getDate().toString();
  if (day.length <2) {
    day = `0${day}`; 
  } 
  const today =`${year}-${month}-${day}`;
  return today;
}

dateElement.setAttribute('min', returnLocalISOToday());

