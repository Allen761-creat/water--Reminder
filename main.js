// // ── Service Worker Register ──
// if ('serviceWorker' in navigator) {
//   navigator.serviceWorker.register('/sw.js')
//     .then(() => console.log('SW registered'))
//     .catch(err => console.log('SW error', err));
// }

// // ── Storage Keys ──
// const KEYS = {
//   count: 'wrt_count',
//   goal: 'wrt_goal',
//   interval: 'wrt_interval',
// };

// // ── State ──
// const state = {
//   count: parseInt(localStorage.getItem(KEYS.count) || '0', 10),
//   goal: parseInt(localStorage.getItem(KEYS.goal) || '8', 10),
//   timerId: null,
//   selectedMins: parseInt(localStorage.getItem(KEYS.interval) || '0', 10),
// };

// // ── DOM ──
// const countDisplay = document.getElementById('countDisplay');
// const goalLabel = document.getElementById('goalLabel');
// const goalDisplay = document.getElementById('goalDisplay');
// const progressText = document.getElementById('progressText');
// const ringFill = document.getElementById('ringFill');
// const drankBtn = document.getElementById('drankBtn');
// const skipBtn = document.getElementById('skipBtn');
// const resetBtn = document.getElementById('resetBtn');
// const goalMinus = document.getElementById('goalMinus');
// const goalPlus = document.getElementById('goalPlus');
// const intervalBtns = document.querySelectorAll('.interval-btn');
// const customMinutes = document.getElementById('customMinutes');
// const setCustomBtn = document.getElementById('setCustomBtn');
// const startReminder = document.getElementById('startReminder');
// const stopReminder = document.getElementById('stopReminder');
// const reminderStatus = document.getElementById('reminderStatus');
// const enableNotifBtn = document.getElementById('enableNotifBtn');
// const notifGranted = document.getElementById('notifGranted');

// // ── Ring ──
// const CIRCUMFERENCE = 402.12;

// function setRing(count, goal) {
//   const pct = goal > 0 ? Math.min(count / goal, 1) : 0;
//   const offset = CIRCUMFERENCE * (1 - pct);
//   ringFill.style.strokeDashoffset = offset;
// }

// // ── Render ──
// function render() {
//   const { count, goal } = state;

//   countDisplay.textContent = count;
//   goalLabel.textContent = `/ ${goal}`;
//   goalDisplay.textContent = goal;
//   setRing(count, goal);

//   if (count >= goal) {
//     progressText.textContent = 'Goal completed! 🎉';
//     progressText.classList.add('goal-met');
//   } else {
//     progressText.textContent = `${count} of ${goal} glasses`;
//     progressText.classList.remove('goal-met');
//   }
// }

// // ── Save ──
// function save() {
//   localStorage.setItem(KEYS.count, state.count);
//   localStorage.setItem(KEYS.goal, state.goal);
//   localStorage.setItem(KEYS.interval, state.selectedMins);
// }

// // ── Drank Button ──
// drankBtn.onclick = () => {
//   if (state.count >= state.goal) return;

//   state.count++;
//   save();
//   render();
// };

// // ── Skip ──
// skipBtn.onclick = () => {};

// // ── Reset ──
// resetBtn.onclick = () => {
//   state.count = 0;
//   save();
//   render();
// };

// // ── Goal ──
// goalPlus.onclick = () => {
//   state.goal++;
//   save();
//   render();
// };

// goalMinus.onclick = () => {
//   if (state.goal > 1) {
//     state.goal--;
//     save();
//     render();
//   }
// };

// // ── Interval ──
// function selectInterval(mins) {
//   state.selectedMins = mins;
//   intervalBtns.forEach(btn => {
//     btn.classList.toggle('active', parseInt(btn.dataset.minutes) === mins);
//   });
// }

// intervalBtns.forEach(btn => {
//   btn.onclick = () => selectInterval(parseInt(btn.dataset.minutes));
// });

// setCustomBtn.onclick = () => {
//   const val = parseInt(customMinutes.value);
//   if (!val) return;
//   selectInterval(val);
// };

// // ── Reminder Timer ──
// function startReminderTimer(mins) {
//   stopReminderTimer();

//   state.timerId = setInterval(() => {
//     fireReminder();
//   }, mins * 60000);

//   reminderStatus.textContent = `Every ${mins} min`;
// }

// function stopReminderTimer() {
//   clearInterval(state.timerId);
//   reminderStatus.textContent = 'Stopped';
// }

// // ── Buttons ──
// startReminder.onclick = () => {
//   if (!state.selectedMins) return;
//   save();
//   startReminderTimer(state.selectedMins);
// };

// stopReminder.onclick = () => {
//   stopReminderTimer();
// };

// // ── 🔥 FIRE NOTIFICATION ──
// function fireReminder() {
//   if (state.count >= state.goal) return;

//   if (navigator.serviceWorker && navigator.serviceWorker.controller) {
//     navigator.serviceWorker.controller.postMessage('show-notification');
//   }
// }

// // ── 🔥 RECEIVE MESSAGE FROM SW ──
// navigator.serviceWorker.addEventListener('message', (event) => {
//   if (event.data.type === 'DRANK') {
//     state.count++;
//     save();
//     render();
//   }
// });

// // ── Notification Permission ──
// enableNotifBtn.onclick = async () => {
//   const perm = await Notification.requestPermission();
//   if (perm === 'granted') {
//     enableNotifBtn.style.display = 'none';
//     notifGranted.style.display = 'inline';
//   }
// };

// // ── Init ──
// function init() {
//   render();
// }
// init();
// -------------------------------------------------




// ── SERVICE WORKER REGISTER ──
// if ('serviceWorker' in navigator) {
//   navigator.serviceWorker.register('/sw.js')
//     .then(() => console.log('SW registered'))
//     .catch(err => console.log('SW error', err));
// }

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js')
    .then(() => console.log('SW registered'))
    .catch(err => console.log(err));
}

// ── STORAGE KEYS ──
const KEYS = {
  count: 'wrt_count',
  goal: 'wrt_goal',
  interval: 'wrt_interval',
};

// ── STATE ──
const state = {
  count: parseInt(localStorage.getItem(KEYS.count) || '0', 10),
  goal: parseInt(localStorage.getItem(KEYS.goal) || '8', 10),
  timerId: null,
  selectedMins: parseInt(localStorage.getItem(KEYS.interval) || '0', 10),
};

// ── DOM ──
const countDisplay = document.getElementById('countDisplay');
const goalLabel = document.getElementById('goalLabel');
const goalDisplay = document.getElementById('goalDisplay');
const progressText = document.getElementById('progressText');
const ringFill = document.getElementById('ringFill');

const drankBtn = document.getElementById('drankBtn');
const skipBtn = document.getElementById('skipBtn');
const resetBtn = document.getElementById('resetBtn');

const goalMinus = document.getElementById('goalMinus');
const goalPlus = document.getElementById('goalPlus');

const intervalBtns = document.querySelectorAll('.interval-btn');
const customMinutes = document.getElementById('customMinutes');
const setCustomBtn = document.getElementById('setCustomBtn');

const startReminder = document.getElementById('startReminder');
const stopReminder = document.getElementById('stopReminder');
const reminderStatus = document.getElementById('reminderStatus');

const enableNotifBtn = document.getElementById('enableNotifBtn');
const notifGranted = document.getElementById('notifGranted');

// ── RING ──
const CIRCUMFERENCE = 402.12;

function setRing(count, goal) {
  const pct = goal > 0 ? Math.min(count / goal, 1) : 0;
  const offset = CIRCUMFERENCE * (1 - pct);
  ringFill.style.strokeDashoffset = offset;
}

// ── RENDER ──
function render() {
  const { count, goal } = state;

  countDisplay.textContent = count;
  goalLabel.textContent = `/ ${goal}`;
  goalDisplay.textContent = goal;

  setRing(count, goal);

  if (count >= goal) {
    progressText.textContent = 'Goal completed! 🎉';
    progressText.classList.add('goal-met');
  } else {
    progressText.textContent = `${count} of ${goal} glasses`;
    progressText.classList.remove('goal-met');
  }
}

// ── SAVE ──
function save() {
  localStorage.setItem(KEYS.count, state.count);
  localStorage.setItem(KEYS.goal, state.goal);
  localStorage.setItem(KEYS.interval, state.selectedMins);
}

// ── DRANK BUTTON ──
drankBtn.onclick = () => {
  if (state.count >= state.goal) return;

  state.count++;
  save();
  render();
};

// ── SKIP BUTTON ──
skipBtn.onclick = () => {
  console.log('Skipped manually');
};

// ── RESET ──
resetBtn.onclick = () => {
  state.count = 0;
  save();
  render();
};

// ── GOAL CONTROL ──
goalPlus.onclick = () => {
  state.goal++;
  save();
  render();
};

goalMinus.onclick = () => {
  if (state.goal > 1) {
    state.goal--;
    save();
    render();
  }
};

// ── INTERVAL SELECT ──
function selectInterval(mins) {
  state.selectedMins = mins;

  intervalBtns.forEach(btn => {
    btn.classList.toggle(
      'active',
      parseInt(btn.dataset.minutes) === mins
    );
  });
}

intervalBtns.forEach(btn => {
  btn.onclick = () => selectInterval(parseInt(btn.dataset.minutes));
});

setCustomBtn.onclick = () => {
  const val = parseInt(customMinutes.value);
  if (!val) return;

  selectInterval(val);
};

// ── REMINDER TIMER ──
function startReminderTimer(mins) {
  stopReminderTimer();

  state.timerId = setInterval(() => {
    fireReminder();
  }, mins * 60000);

  reminderStatus.textContent = `Every ${mins} min`;
}

function stopReminderTimer() {
  clearInterval(state.timerId);
  reminderStatus.textContent = 'Stopped';
}

// ── BUTTONS ──
startReminder.onclick = () => {
  if (!state.selectedMins) return;

  save();
  startReminderTimer(state.selectedMins);
};

stopReminder.onclick = () => {
  stopReminderTimer();
};

// ── 🔥 FIRE NOTIFICATION ──
function fireReminder() {
  if (state.count >= state.goal) return;

  if (Notification.permission !== 'granted') return;

  navigator.serviceWorker.ready.then(reg => {
    if (reg.active) {
      reg.active.postMessage('show-notification');
    }
  });
}

// ── 🔥 RECEIVE MESSAGE FROM SW ──
navigator.serviceWorker.addEventListener('message', (event) => {
  const action = event.data.action;

  if (action === 'drink') {
    if (state.count >= state.goal) return;

    state.count++;
    save();
    render();
  }

  if (action === 'skip') {
    console.log('User skipped from notification');
  }
});

// ── NOTIFICATION PERMISSION ──
enableNotifBtn.onclick = async () => {
  console.log("hello")
  const perm = await Notification.requestPermission();

  if (perm === 'granted') {
    enableNotifBtn.style.display = 'none';
    notifGranted.style.display = 'inline';
  }
};

// ── INIT ──
function init() {
  render();

  // restore interval selection UI
  if (state.selectedMins) {
    selectInterval(state.selectedMins);

    // auto restart timer after reload
    startReminderTimer(state.selectedMins);
  }
}

init();



