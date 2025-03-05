// Запуск после полной загрузки DOM
document.addEventListener('DOMContentLoaded', () => {
    // Анимация инфографики на главной странице
    const infographics = document.querySelectorAll('.infographics p');
    infographics.forEach((item, index) => {
        setTimeout(() => {
            item.classList.add('highlight');
        }, index * 500);
    });

    // Логика квиза на странице регистрации
    const urlParams = new URLSearchParams(window.location.search);
    const role = urlParams.get('role');
    const referralCodeFromUrl = urlParams.get('ref');
    const formTitle = document.getElementById('form-title');
    const quizDiv = document.getElementById('quiz');
    const referralInput = document.getElementById('referral-code');

    if (referralInput && referralCodeFromUrl) {
        referralInput.value = referralCodeFromUrl;
    }

    if (formTitle && quizDiv) {
        if (role === 'employee') {
            formTitle.textContent = 'Регистрация как сотрудник';
            quizDiv.innerHTML = `
                <label class="form-label">Сколько часов в день готовы работать?</label>
                <input type="range" class="form-range" min="1" max="12" value="1" id="hours">
                <p>Выбрано: <span id="hours-value">1</span> ч.</p>
                <div class="form-check mb-3">
                    <input type="checkbox" class="form-check-input" id="daily-work" required>
                    <label class="form-check-label" for="daily-work">Согласен работать стабильно каждый день</label>
                </div>
                <label class="form-label">Желаемое количество рабочих часов в день?</label>
                <input type="range" class="form-range" min="1" max="12" value="1" id="desired-hours">
                <p>Выбрано: <span id="desired-hours-value">1</span> ч.</p>
                <label class="form-label">Желаемый заработок в месяц?</label>
                <input type="range" class="form-range" min="3000" max="150000" step="1000" value="3000" id="desired-earnings">
                <p>Выбрано: <span id="desired-earnings-value">3,000</span> ₽</p>
            `;
            document.getElementById('hours')?.addEventListener('input', (e) => {
                document.getElementById('hours-value').textContent = e.target.value;
            });
            document.getElementById('desired-hours')?.addEventListener('input', (e) => {
                document.getElementById('desired-hours-value').textContent = e.target.value;
            });
            document.getElementById('desired-earnings')?.addEventListener('input', (e) => {
                document.getElementById('desired-earnings-value').textContent = e.target.value.toLocaleString();
            });
        } else if (role === 'blogger') {
            formTitle.textContent = 'Регистрация как блогер';
            quizDiv.innerHTML = `
                <label class="form-label">Укажите вашу социальную сеть</label>
                <select class="form-select mb-3" id="social">
                    <option value="tiktok">TikTok</option>
                    <option value="instagram">Instagram</option>
                    <option value="youtube">YouTube</option>
                </select>
                <label class="form-label">Сколько у вас подписчиков?</label>
                <input type="range" class="form-range" min="500000" max="50000000" step="500000" value="500000" id="followers">
                <p>Выбрано: <span id="followers-value">500,000</span></p>
                <label class="form-label">Вы готовы инвестировать рекламный бюджет?</label>
                <input type="range" class="form-range" min="10000" max="500000" step="50000" value="10000" id="budget">
                <p>Выбрано: <span id="budget-value">10,000</span> $</p>
            `;
            document.getElementById('followers')?.addEventListener('input', (e) => {
                document.getElementById('followers-value').textContent = e.target.value.toLocaleString();
            });
            document.getElementById('budget')?.addEventListener('input', (e) => {
                document.getElementById('budget-value').textContent = e.target.value.toLocaleString();
            });
        } else {
            formTitle.textContent = 'Ошибка регистрации';
            quizDiv.innerHTML = '<p class="text-center text-danger">Пожалуйста, выберите роль через реферальную ссылку на главной странице.</p>';
        }
    }

    // Горячие бонусы (bonuses.html)
    const bonusContainer = document.getElementById('hot-bonuses');
    if (bonusContainer) {
        const bonuses = [
            { text: 'Выполни 5 заданий за 24 часа и получи бонус 1000 рублей!', time: 24 },
            { text: 'Только сегодня! Выполни задание с максимальной ставкой и получи +20% к оплате!', time: 12 },
            { text: 'Заверши 10 заданий сегодня и получи эксклюзивный бонус в 150 рублей!', time: 24 }
        ];
        const randomBonus = bonuses[Math.floor(Math.random() * bonuses.length)];
        bonusContainer.innerHTML = `
            <div class="alert alert-success" role="alert">
                <strong>${randomBonus.text}</strong><br>
                <small>Осталось: <span id="bonus-timer">${randomBonus.time}</span> часов</small>
            </div>
        `;
        let timeLeft = randomBonus.time * 3600; // Время в секундах
        const timer = setInterval(() => {
            timeLeft--;
            const hours = Math.floor(timeLeft / 3600);
            const minutes = Math.floor((timeLeft % 3600) / 60);
            document.getElementById('bonus-timer').textContent = `${hours}:${minutes < 10 ? '0' : ''}${minutes}`;
            if (timeLeft <= 0) clearInterval(timer);
        }, 1000);
    }

    // Система дефицита (bonuses.html)
    const scarcityContainer = document.getElementById('scarcity-tasks');
    if (scarcityContainer) {
        const tasks = [
            { text: 'Осталось 5 заданий по 300 рублей — успей выполнить их за 2 часа!', slots: 5, time: 2 },
            { text: 'Пройди опрос и получи 150 рублей, осталось только 10 мест!', slots: 10, time: 1 }
        ];
        tasks.forEach((task, index) => {
            const taskDiv = document.createElement('div');
            taskDiv.className = 'alert alert-warning';
            taskDiv.innerHTML = `
                <strong>${task.text}</strong><br>
                <small>Осталось мест: <span id="slots-${index}">${task.slots}</span> | Время: <span id="timer-${index}">${task.time}</span> ч</small>
            `;
            scarcityContainer.appendChild(taskDiv);
            let timeLeft = task.time * 3600;
            const timer = setInterval(() => {
                timeLeft--;
                const hours = Math.floor(timeLeft / 3600);
                const minutes = Math.floor((timeLeft % 3600) / 60);
                document.getElementById(`timer-${index}`).textContent = `${hours}:${minutes < 10 ? '0' : ''}${minutes}`;
                if (timeLeft <= 0) clearInterval(timer);
            }, 1000);
        });
    }
});

// Переключение на условия использования
function showTerms() {
    const registerForm = document.getElementById('register-form');
    const terms = document.getElementById('terms');
    const referralCode = document.getElementById('referral-code')?.value;
    const name = document.getElementById('name')?.value;
    const email = document.getElementById('email')?.value;
    const password = document.getElementById('password')?.value;

    if (!referralCode || referralCode.trim() === '') {
        alert('Пожалуйста, введите реферальный код!');
        return;
    }
    if (!name || !email || !password) {
        alert('Пожалуйста, заполните все поля!');
        return;
    }

    if (registerForm && terms) {
        registerForm.style.display = 'none';
        terms.style.display = 'block';
    }
}

// Активация кнопки "Завершить"
document.getElementById('accept-terms')?.addEventListener('change', (e) => {
    const submitBtn = document.getElementById('submit-btn');
    if (submitBtn) {
        submitBtn.disabled = !e.target.checked;
    }
});

// Завершение регистрации
document.getElementById('submit-btn')?.addEventListener('click', () => {
    const role = new URLSearchParams(window.location.search).get('role');
    alert('Регистрация завершена!');
    window.location.href = role === 'employee' ? 'tasks.html' : 'blogger.html';
});

// Показ деталей задания
function showTaskDetails(taskId) {
    const tasks = {
        1: { title: 'Просмотр Reels #1', description: 'Посмотрите короткое видео в TikTok.', points: 10 },
        2: { title: 'Просмотр Reels #2', description: 'Оцените ролик и оставьте комментарий.', points: 15 },
        3: { title: 'Просмотр Reels #3', description: 'Поделитесь видео в соцсетях.', points: 20 }
    };
    const task = tasks[taskId];
    const taskTitle = document.getElementById('task-title');
    const taskDescription = document.getElementById('task-description');
    const taskPoints = document.getElementById('task-points');
    const taskList = document.getElementById('task-list');
    const taskDetails = document.getElementById('task-details');

    if (taskTitle && taskDescription && taskPoints && taskList && taskDetails) {
        taskTitle.textContent = task.title;
        taskDescription.textContent = task.description;
        taskPoints.textContent = task.points;
        taskList.style.display = 'none';
        taskDetails.style.display = 'block';
    }
}

// Выполнение задания
function completeTask() {
    const taskDetails = document.getElementById('task-details');
    const taskList = document.getElementById('task-list');
    if (taskDetails && taskList) {
        alert('Задание выполнено!');
        taskDetails.style.display = 'none';
        taskList.style.display = 'flex';
    }
}

// Отправка заявки на вывод средств
function submitWithdrawal() {
    alert('Заявка на вывод отправлена!');
}

// Переключение бокового меню настроек
function toggleSettings() {
    const settingsContent = document.getElementById('settings-content');
    if (settingsContent) {
        settingsContent.classList.toggle('show');
    }
}

// Выход из системы
function logout() {
    alert('Вы вышли из системы!');
    window.location.href = 'index.html';
}

// Отправка сообщения в поддержку
function sendSupportMessage() {
    alert('Ваше сообщение отправлено в поддержку!');
}

// Регистрация через реферальный код
function joinAs(role) {
    const referralCode = document.getElementById('referral-code')?.value;
    if (!referralCode || referralCode.trim() === '') {
        alert('Пожалуйста, введите реферальный код!');
    } else {
        window.location.href = `register.html?role=${role}&ref=${referralCode}`;
    }
}

// Функция для воспроизведения видео
function playVideo(videoId) {
    const videoContainer = document.getElementById('video-container');
    const videoSource = document.getElementById('video-source');
    const videoPlayer = document.getElementById('video-player');

    const videos = {
        'video1': 'path/to/video1.mp4',
        'video2': 'path/to/video2.mp4',
        'video3': 'path/to/video3.mp4',
        'video4': 'path/to/video4.mp4',
        'video5': 'path/to/video5.mp4'
    };

    if (videoContainer && videoSource && videoPlayer && videos[videoId]) {
        videoSource.src = videos[videoId];
        videoPlayer.load();
        videoContainer.style.display = 'block';
        videoPlayer.play();
    } else {
        alert('Видео временно недоступно. Пожалуйста, попробуйте позже.');
    }
}

// Функция для закрытия видео
function closeVideo() {
    const videoContainer = document.getElementById('video-container');
    const videoPlayer = document.getElementById('video-player');

    if (videoContainer && videoPlayer) {
        videoPlayer.pause();
        videoContainer.style.display = 'none';
    }
}