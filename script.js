/**
 * MHP Gemini System - Core Logic
 * Author: Super Admin MHP
 */

import { MHP_CONFIG } from './mhp-config.js';

// State Management
let currentMode = 'CHAT';

// Initialize Elements
const displayArea = document.getElementById('display');
const promptInput = document.getElementById('prompt');
const executeBtn = document.getElementById('execute-btn');
const navItems = document.querySelectorAll('.nav-item');

/**
 * Mengelola perpindahan mode fitur
 */
const setAppMode = (mode, element) => {
    currentMode = mode;
    
    // Update UI Navigation
    navItems.forEach(item => item.classList.remove('active'));
    element.classList.add('active');

    // System Notification
    renderMessage('system', `Sistem beralih ke mode: ${mode}`);
};

/**
 * Merender pesan ke antarmuka pengguna
 */
const renderMessage = (sender, text) => {
    const msgDiv = document.createElement('div');
    msgDiv.className = `msg ${sender === 'user' ? 'user' : 'bot'}`;
    msgDiv.innerHTML = text;
    displayArea.appendChild(msgDiv);
    displayArea.scrollTop = displayArea.scrollHeight;
};

/**
 * Logika pemrosesan perintah AI
 */
const processInquiry = async () => {
    const query = promptInput.value.trim();
    if (!query) return;

    // Render User Input
    renderMessage('user', query);
    promptInput.value = '';

    // Simulate Network Latency
    const loadingId = Date.now();
    renderMessage('bot', `<span id="load-${loadingId}">Memproses permintaan...</span>`);

    setTimeout(() => {
        const responseElement = document.getElementById(`load-${loadingId}`);
        let finalResponse = "";

        // Logic Router berdasarkan Mode & Input
        const inputLower = query.toLowerCase();

        if (inputLower.includes("tanggal") || inputLower.includes("hari ini")) {
            finalResponse = `Hari ini adalah ${new Date().toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}.`;
        } else if (inputLower.includes("dongeng")) {
            finalResponse = "Di sebuah kerajaan digital, terdapat sistem kuat bernama MHP yang mengelola data dengan presisi tinggi...";
        } else {
            finalResponse = `Permintaan Anda untuk mode ${currentMode} telah diterima dan sedang dianalisis oleh server inti.`;
        }

        responseElement.parentElement.innerHTML = finalResponse;
    }, 1200);
};

// Event Listeners
navItems.forEach(item => {
    item.addEventListener('click', () => setAppMode(item.getAttribute('data-mode'), item));
});

executeBtn.addEventListener('click', processInquiry);

promptInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') processInquiry();
});
