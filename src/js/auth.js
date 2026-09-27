// Utilitários de Data para verificar o Streak
const getTodayStr = () => new Date().toISOString().split('T')[0];
const getYesterdayStr = () => {
    const d = new Date();
    d.setDate(d.getDate() - 1);
    return d.toISOString().split('T')[0];
};

let currentUser = null;

// Inicialização: Verifica se já tem alguém logado no Local Storage
window.onload = () => {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
        currentUser = savedUser;
        showScreen('profile-screen');
        updateProfileUI();
    } else {
        showScreen('login-screen');
    }
};

function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(el => el.style.display = 'none');
    document.getElementById(screenId).style.display = 'block';
}

function handleAuth() {
    const user = document.getElementById('username').value.trim().toLowerCase();
    const pass = document.getElementById('password').value.trim();
    const errorEl = document.getElementById('login-error');

    if (!user || !pass) {
        errorEl.innerText = "🤨Preencha usuário e senha.";
        errorEl.style.display = "block";
        return;
    }

    let db = JSON.parse(localStorage.getItem('meditaUsers')) || {};

    if (db[user]) {
        // Usuário existe, verifica senha
        if (db[user].password === pass) {
            loginSuccess(user);
        } else {
            errorEl.innerText = "Senha incorreta.";
            errorEl.style.display = "block";
        }
    } else {
        // Cadastra novo usuário
        db[user] = {
            password: pass,
            streak: 0,
            total: 0,
            lastDate: null
        };
        localStorage.setItem('meditaUsers', JSON.stringify(db));
        loginSuccess(user);
    }
}

function loginSuccess(user) {
    currentUser = user;
    localStorage.setItem('currentUser', user);
    document.getElementById('login-error').style.display = "none";
    showScreen('profile-screen');
    updateProfileUI();
}

function logout() {
    currentUser = null;
    localStorage.removeItem('currentUser');
    document.getElementById('username').value = '';
    document.getElementById('password').value = '';
    showScreen('login-screen');
}

function updateProfileUI() {
    document.getElementById('user-display-name').innerText = currentUser;
    let db = JSON.parse(localStorage.getItem('meditaUsers'));
    let userData = db[currentUser];

    // Verifica quebra de streak (se a última data for mais antiga que ontem e que hoje)
    const today = getTodayStr();
    const yesterday = getYesterdayStr();
    
    if (userData.lastDate && userData.lastDate !== today && userData.lastDate !== yesterday) {
        userData.streak = 0; // Streak zerado por inatividade
        localStorage.setItem('meditaUsers', JSON.stringify(db));
    }

    document.getElementById('streak-count').innerText = userData.streak;
    document.getElementById('total-count').innerText = userData.total;

    // Trava de meditação diária
    const startBtn = document.getElementById('start-meditation-btn');
    const msg = document.getElementById('daily-message');
    
    if (userData.lastDate === today) {
        startBtn.style.display = 'none';
        msg.style.display = 'block';
    } else {
        startBtn.style.display = 'inline-block';
        msg.style.display = 'none';
    }
}

function startMeditation() {
    showScreen('meditation-screen');
    // Aqui você chama a função que reseta/inicia seu slider atual (ex: currentSlide = 0; showSlider();)
}

function finishMeditation() {
    let db = JSON.parse(localStorage.getItem('meditaUsers'));
    let userData = db[currentUser];
    const today = getTodayStr();
    const yesterday = getYesterdayStr();

    if (userData.lastDate !== today) {
        userData.total += 1;
        
        // Lógica do Streak
        if (userData.lastDate === yesterday) {
            userData.streak += 1;
        } else {
            userData.streak = 1;
        }
        
        userData.lastDate = today;
        localStorage.setItem('meditaUsers', JSON.stringify(db));
    }

    alert("Meditação concluída! Excelente trabalho.");
    showScreen('profile-screen');
    updateProfileUI();
}