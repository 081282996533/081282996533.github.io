import { MHP_CONFIG } from './mhp-config.js';

let currentMode = 'CHAT';

// Fungsi Ganti Mode
const navItems = document.querySelectorAll('.nav-item');
navItems.forEach(item => {
    item.addEventListener('click', () => {
        navItems.forEach(i => i.classList.remove('active'));
        item.classList.add('active');
        currentMode = item.getAttribute('data-mode');
        
        const display = document.getElementById('display');
        display.innerHTML += `<div class="msg bot" style="color:#00e5ff"><b>MODE:</b> ${currentMode} Aktif!</div>`;
        display.scrollTop = display.scrollHeight;
    });
});

// Fungsi Eksekusi Mantra
document.getElementById('execute-btn').addEventListener('click', () => {
    const promptInput = document.getElementById('prompt');
    const display = document.getElementById('display');
    const prompt = promptInput.value;

    if(!prompt) return;

    display.innerHTML += `<div class="msg user">${prompt}</div>`;
    
    setTimeout(() => {
        display.innerHTML += `<div class="msg bot">Memproses ${currentMode}... <br> Menggunakan API: ${MHP_CONFIG.apiKey.substring(0,8)}*** <br> ASUUU!</div>`;
        promptInput.value = '';
        display.scrollTop = display.scrollHeight;
    }, 1000);
});
