import { MHP_CONFIG } from './mhp-config.js';

let currentMode = 'CHAT';
const displayArea = document.getElementById('display');
const promptInput = document.getElementById('prompt');

// Fungsi utama kirim perintah ke AI
async function panggilAI(prompt) {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${MHP_CONFIG.apiKey}`;
    
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
        });
        const data = await response.json();
        return data.candidates[0].content.parts[0].text;
    } catch (error) {
        return "Gagal gedor server. Cek kuota API Key Anda.";
    }
}

document.getElementById('execute-btn').addEventListener('click', async () => {
    const query = promptInput.value;
    if (!query) return;

    // Tampilkan pesan User
    displayArea.innerHTML += `<div class="msg user">${query}</div>`;
    promptInput.value = '';

    // Tampilkan Loading
    const loadingMsg = document.createElement('div');
    loadingMsg.className = 'msg bot';
    loadingMsg.innerText = 'Sedang memproses perintah...';
    displayArea.appendChild(loadingMsg);
    displayArea.scrollTop = displayArea.scrollHeight;

    // Ambil jawaban asli dari AI
    const jawaban = await panggilAI(query);
    loadingMsg.innerText = jawaban;
    displayArea.scrollTop = displayArea.scrollHeight;
});

// Logic Navigasi Mode
document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', () => {
        document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
        item.classList.add('active');
        currentMode = item.getAttribute('data-mode');
        displayArea.innerHTML += `<div class="msg bot">Mode beralih ke: ${currentMode}</div>`;
    });
});
