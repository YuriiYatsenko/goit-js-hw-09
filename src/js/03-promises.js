const form = document.querySelector('.form');

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const delay = parseInt(event.target.elements.delay.value);
  const step = parseInt(event.target.elements.step.value);
  const amount = parseInt(event.target.elements.amount.value);

  const promises = [];

  for (let i = 1; i <= amount; i++) {
    const position = i;
    const promiseDelay = delay + (i - 1) * step;
    const promise = createPromise(position, promiseDelay)
      .then(({ position, delay }) => {
        console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        console.log(`❌ Rejected promise ${position} in ${delay}ms`);
      });
    promises.push(promise);
  }

  Promise.all(promises)
    .then(() => {
      console.log('All promises fulfilled');
    })
    .catch(() => {
      console.log('At least one promise rejected');
    });
});

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}
