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

const days = document.querySelector('[data-days]');
const hours = document.querySelector('[data-hours]');
const minutes = document.querySelector('[data-minutes]');
const seconds = document.querySelector('[data-seconds]');
const startButton = document.querySelector('[data-start]');

let intervalId;

function updateTimer(chosenTime) {
  const timeDiff = chosenTime.getTime() - Date.now();

  const dayDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
  const hourDiff = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minuteDiff = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
  const secondDiff = Math.floor((timeDiff % (1000 * 60)) / 1000);

  days.textContent = dayDiff.toString().padStart(2, '0');
  hours.textContent = hourDiff.toString().padStart(2, '0');
  minutes.textContent = minuteDiff.toString().padStart(2, '0');
  seconds.textContent = secondDiff.toString().padStart(2, '0');
}

// function updateTimer({ days='00', hours='00', minutes='00', seconds='00' } = {}) {

// }

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