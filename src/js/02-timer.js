import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

const dateTimePicker = flatpickr('#datetime-picker', {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates.length > 0) {
      startTimer(selectedDates[0]);
    }
  },
});

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
  },
};

const days = document.querySelector('[data-days]');
const hours = document.querySelector('[data-hours]');
const minutes = document.querySelector('[data-minutes]');
const seconds = document.querySelector('[data-seconds]');
const startButton = document.querySelector('[data-start]');

let intervalId;

function updateTimer(chosenTime) {
  const timeDiff = chosenTime.getTime() - Date.now();

  if (timeDiff <= 0) {
    clearInterval(intervalId);
    days.textContent = '00';
    hours.textContent = '00';
    minutes.textContent = '00';
    seconds.textContent = '00';
    return;
  }

  const { days: dayDiff, hours: hourDiff, minutes: minuteDiff, seconds: secondDiff } = convertMs(timeDiff);

  days.textContent = dayDiff.toString().padStart(2, '0');
  hours.textContent = hourDiff.toString().padStart(2, '0');
  minutes.textContent = minuteDiff.toString().padStart(2, '0');
  seconds.textContent = secondDiff.toString().padStart(2, '0');
}

function startTimer(chosenTime) {
  if (intervalId) {
    clearInterval(intervalId);
  }

  updateTimer(chosenTime);
  intervalId = setInterval(() => updateTimer(chosenTime), 1000);
}

startButton.addEventListener('click', () => {
  const selectedDates = dateTimePicker.selectedDates;
  if (selectedDates.length > 0) {
    startTimer(selectedDates[0]);
  }
});

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}