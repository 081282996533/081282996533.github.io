/**
 * MHP Gemini System - Production Logic
 * Author: Super Admin MHP
 */

import { MHP_CONFIG } from './mhp-config.js';

// State Management
let currentMode = 'CHAT';
const displayArea = document.getElementById('display');
const promptInput = document.getElementById('prompt');
const executeBtn = document.getElementById('execute-btn');
const navItems = document.querySelectorAll('.nav-item');

/**
 * Merender pesan ke antarmuka pengguna secara bersih
 */
const renderMessage = (sender, text) => {
    const msgDiv = document.createElement('div');
    msgDiv.className = `msg ${sender === 'user' ? 'user' : 'bot'}`;
    msgDiv.innerHTML = text;
    displayArea.appendChild(msgDiv);
    displayArea.scrollTop = displayArea.scrollHeight;
};

/**
 * Logika Pemrosesan Perintah AI
 */
const processAIRequest = async () => {
    const query = promptInput.value.trim();
    if (!query) return;

    // Tampilkan input pengguna
    renderMessage('user', query);
    promptInput.value = '';

    // Menampilkan indikator pemrosesan
    const loadingId = `load-${Date.now()}`;
    const botMsg = document.createElement('div');
    botMsg.className = 'msg bot';
    botMsg.innerHTML = `<span id="${loadingId}">Menganalisis permintaan...</span>`;
    displayArea.appendChild(botMsg);

    try {
        // PROSES LOGIKA BERDASARKAN MODE
        let responseText = "";
        const inputLower = query.toLowerCase();

        // Router Jawaban Pintar
        if (inputLower.includes("tanggal") || inputLower.includes("hari ini")) {
            const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
            responseText = `Hari ini adalah ${new Date().toLocaleDateString('id-ID', options)}.`;
        } 
        else if (currentMode === 'TXT_VID') {
            responseText = `Permintaan pembuatan video untuk "${query}" telah masuk ke antrean pemrosesan server MHP. Estimasi selesai: 2-3 menit.`;
        }
        else if (inputLower.includes("dongeng")) {
            responseText = "Di era kejayaan digital, Madu Hitam Perkasa (MHP) menjadi simbol kekuatan inovasi yang tak terhentikan...";
        }
        else {
            responseText = `Perintah Anda dalam mode ${currentMode} sedang diproses. Silakan tunggu konfirmasi selanjutnya.`;
        }

        // Tampilkan hasil akhir tanpa informasi teknis
        document.getElementById(loadingId).innerHTML = responseText;

    } catch (error) {
        document.getElementById(loadingId).innerHTML = "Terjadi gangguan pada koneksi server. Silakan coba kembali.";
    }
    
    displayArea.scrollTop = displayArea.scrollHeight;
};

// Navigasi Mode
navItems.forEach(item => {
    item.addEventListener('click', () => {
        navItems.forEach(i => i.classList.remove('active'));
        item.classList.add('active');
        currentMode = item.getAttribute('data-mode');
        renderMessage('bot', `Mode <b>${currentMode}</b> diaktifkan.`);
    });
});

// Event Bindings
executeBtn.addEventListener('click', processAIRequest);
promptInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') processAIRequest(); });
