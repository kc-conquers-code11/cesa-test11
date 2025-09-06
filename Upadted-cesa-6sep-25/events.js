// Countdown Flip Clock
const flipElements = [
  {top: 'days-top', bottom: 'days-bottom'},
  {top: 'hours-top', bottom: 'hours-bottom'},
  {top: 'minutes-top', bottom: 'minutes-bottom'},
  {top: 'seconds-top', bottom: 'seconds-bottom'}
];

const nextEvent = new Date('2025-09-20T12:30:00');

function updateFlipCountdown() {
  const now = new Date();
  let diff = nextEvent - now;
  if(diff < 0) diff = 0;

  const d = Math.floor(diff / (1000*60*60*24));
  const h = Math.floor((diff / (1000*60*60)) % 24);
  const m = Math.floor((diff / (1000*60)) % 60);
  const s = Math.floor((diff / 1000) % 60);

  const timeArr = [d, h, m, s];

  flipElements.forEach((el, idx) => {
    const topEl = document.getElementById(el.top);
    const bottomEl = document.getElementById(el.bottom);
    const newValue = String(timeArr[idx]).padStart(2,'0');

    if(topEl.textContent !== newValue) {
      topEl.textContent = newValue;
      bottomEl.textContent = newValue;
      topEl.classList.add('flip-animation');
      setTimeout(() => topEl.classList.remove('flip-animation'), 700);
    }
  });
}

setInterval(updateFlipCountdown, 1000);
updateFlipCountdown();

// Footer Year
document.getElementById('year').textContent = new Date().getFullYear();
