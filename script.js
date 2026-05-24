import { availableSites } from './data.js';

let state = { name: '', theme: '', links: [] };

window.saveName = () => {
    state.name = document.getElementById('userName').value;
    transition('step1', 'step2');
};

window.setTheme = (theme) => {
    state.theme = theme;
    document.body.className = theme;
    transition('step2', 'step3');
    renderSites();
};

function renderSites() {
    const container = document.getElementById('site-list');
    availableSites.forEach(site => {
        container.innerHTML += `<label><input type="checkbox" value="${site.url}"> ${site.name}</label><br>`;
    });
}

window.finishSetup = () => {
    const checkboxes = document.querySelectorAll('#site-list input:checked');
    checkboxes.forEach(cb => state.links.push(cb.value));
    localStorage.setItem('userDash', JSON.stringify(state));
    document.body.classList.add('swirl');
    setTimeout(() => location.reload(), 500);
};

window.resetApp = () => {
    localStorage.clear();
    location.reload();
};

function transition(hideId, showId) {
    document.getElementById(hideId).classList.add('hidden');
    document.getElementById(showId).classList.remove('hidden');
}

// Initial Load check
if (localStorage.getItem('userDash')) {
    const saved = JSON.parse(localStorage.getItem('userDash'));
    document.getElementById('onboarding').classList.add('hidden');
    document.getElementById('home').classList.remove('hidden');
    document.getElementById('welcomeDisplay').innerText = `Welcome, ${saved.name}`;
}