import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const text = document.querySelector('#datetime-picker');
const timerOne = document.querySelector('.timer');
const buttonStart = document.querySelector('button[data-start]');
const seconds = document.querySelector('span[data-seconds]');
const minutes = document.querySelector('span[data-minutes]');
const hours = document.querySelector('span[data-hours]');
const days = document.querySelector('span[data-days]');

buttonStart.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < new Date()) {
      Notiflix.Notify.failure('Please choose a date in the future');
      buttonStart.disabled = true;
    } else {
      buttonStart.disabled = false;
    }
  },
};
flatpickr(text, options);
function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

buttonStart.addEventListener('click', () => {
  let timer = setInterval(() => {
    let last = new Date(text.value) - new Date();
    buttonStart.disabled = true;
    if (last >= 0) {
      let timeNewObject = convertMs(last);
      days.textContent = addLeadingZero(timeNewObject.days);
      hours.textContent = addLeadingZero(timeNewObject.hours);
      minutes.textContent = addLeadingZero(timeNewObject.minutes);
      seconds.textContent = addLeadingZero(timeNewObject.seconds);
      if (last <= 10000) {
        timerOne.style.color = 'red';
      }
    } else {
      Notiflix.Notify.success('Last finished');
      timerOne.style.color = 'green';
      clearInterval(timer);
    }
  }, 1000);
});
