// --- JANTUNG KASTA SULTAN MHP ---

// API Key & App ID yang udah disamar (Base64)
const _m1 = "QUl6YVN5QlR0UXp3c0hSZ0dXdDd6Y0RBQlhfRjhuRXJxdHNSV01V"; // API Key Portrait Lab
const _m2 = "MToxMDM2MjU5MzM5NTM6YW5kcm9pZDo0ZTkyOWE4ZTU3NGFiNzYzMDhiOTgw"; // App ID

export const MHP_CONFIG = {
    apiKey: atob(_m1),
    authDomain: "portrait-lab-428308.firebaseapp.com",
    projectId: "portrait-lab-428308",
    storageBucket: "portrait-lab-428308.appspot.com",
    messagingSenderId: "103625933953",
    appId: atob(_m2),
    databaseURL: "https://portrait-lab-428308.firebaseio.com"
};

console.log("MHP CONFIG LOADED: Sistem Siap Gedor, ASUUU!");
