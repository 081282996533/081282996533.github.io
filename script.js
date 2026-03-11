// Ganti bagian listener tombol execute di script.js Master
document.getElementById('execute-btn').addEventListener('click', async () => {
    const promptInput = document.getElementById('prompt');
    const display = document.getElementById('display');
    const prompt = promptInput.value;

    if(!prompt) return;

    display.innerHTML += `<div class="msg user">${prompt}</div>`;
    promptInput.value = '';

    // EFEK LOADING KASTA SULTAN
    const loadingMsg = document.createElement('div');
    loadingMsg.className = 'msg bot';
    loadingMsg.innerText = 'Sedang Gedor Server...';
    display.appendChild(loadingMsg);

    try {
        // DI SINI NANTI KITA TEMBAK API GEMINI/FIREBASE MASTER!
        // Untuk sementara, kita kasih respon "Semi-Pinter" dulu:
        setTimeout(() => {
            if(prompt.includes("tanggal")) {
                loadingMsg.innerText = `Sekarang tanggal ${new Date().toLocaleDateString('id-ID')}, Master MHP!`;
            } else if(prompt.includes("dongeng")) {
                loadingMsg.innerText = "Dahulu kala di kerajaan Madu Hitam Perkasa...";
            } else {
                loadingMsg.innerText = `Mode ${currentMode} Siap! Perintah "${prompt}" diterima.`;
            }
            display.scrollTop = display.scrollHeight;
        }, 1500);
    } catch (err) {
        loadingMsg.innerText = "SERVER JEBOL, ASUUU! Cek API Key!";
    }
});
