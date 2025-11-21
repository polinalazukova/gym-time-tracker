const statusText = document.getElementById('status');

let startTime = null;
let timerInterval = null;

function formatTime(date) {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

function getDuration(start, end) {
    const diff = end - start;
    const hours = Math.floor(diff / 1000 / 60 / 60);
    const minutes = Math.floor((diff / 1000 / 60) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    return `${hours}ч ${minutes}м ${seconds}с`;
}

function checkIn() {
    if (timerInterval) {
        return; /
    }

    startTime = new Date();
    statusText.textContent = `Начало тренировки: ${formatTime(startTime)}\nПрошло: 0ч 0м 0с`;

    timerInterval = setInterval(() => {
        const now = new Date();
        const duration = getDuration(startTime, now);
        statusText.textContent = `Начало тренировки: ${formatTime(startTime)}\nПрошло: ${duration}`;
    }, 1000);
}

function checkOut() {
    if (!startTime) {
        statusText.textContent = 'Сначала нажмите "Зашёл"';
        return;
    }
    const endTime = new Date();
    const finalDuration = getDuration(startTime, endTime);

    clearInterval(timerInterval);
    timerInterval = null;
    startTime = null;

    statusText.textContent = `Тренировка завершена!\nДлительность: ${finalDuration}`;
}

