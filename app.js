// State
let currentLang = 'en'; // 'en' or 'jp'
let currentCategory = 'basic';
let currentPhrases = [];

// DOM Elements
const categoryListEl = document.getElementById('category-list');
const contentAreaEl = document.getElementById('content-area');
const btnEn = document.getElementById('btn-en');
const btnJp = document.getElementById('btn-jp');
const searchInput = document.getElementById('search-input');

// Initial Setup
function init() {
    renderCategories();
    updatePhrases(); // Initial Load
    registerServiceWorker();

    // Search Event Listener
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const keyword = e.target.value.toLowerCase().trim();
            if (keyword) {
                // Deactivate category buttons visually when searching
                document.querySelectorAll('.cat-btn').forEach(btn => btn.classList.remove('active'));
                searchPhrases(keyword);
            } else {
                setCategory(currentCategory);
            }
        });
    }
}

// Render Category Navigation
function renderCategories() {
    if (!categoryListEl) return;
    categoryListEl.innerHTML = appData.categories.map(cat => `
        <li>
            <button 
                class="cat-btn ${cat.id === currentCategory ? 'active' : ''}" 
                onclick="setCategory('${cat.id}')">
                ${cat.icon} ${cat.name}
            </button>
        </li>
    `).join('');
}

function setCategory(categoryId) {
    currentCategory = categoryId;
    if (searchInput) searchInput.value = ''; // Clear search when category clicked
    renderCategories(); // Update visual state
    updatePhrases();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function updatePhrases() {
    // Load current category into global state
    currentPhrases = appData.phrases[currentCategory];
    renderPhrasesList();
}

function searchPhrases(keyword) {
    // Search all categories
    let results = [];
    Object.keys(appData.phrases).forEach(key => {
        const matches = appData.phrases[key].filter(p => 
            p.ko.includes(keyword) || 
            p.en.toLowerCase().includes(keyword) || 
            (p.jp && p.jp.includes(keyword))
        );
        results = [...results, ...matches];
    });
    currentPhrases = results;
    renderPhrasesList();
}

function renderPhrasesList() {
    if (!contentAreaEl) return;

    if (!currentPhrases || currentPhrases.length === 0) {
        contentAreaEl.innerHTML = '<div class="empty-state">검색 결과가 없습니다.</div>';
        return;
    }

    contentAreaEl.innerHTML = currentPhrases.map((phrase, index) => {
        const targetText = phrase[currentLang];
        const pronunciation = currentLang === 'en' ? phrase.pr_en : phrase.pr_jp;

        return `
        <div class="phrase-card" onclick="openOverlay(${index})">
            <div class="phrase-content">
                <div class="phrase-ko">${phrase.ko}</div>
                <div class="phrase-target">
                    ${targetText}
                    ${pronunciation ? `<div class="pronunciation">${pronunciation}</div>` : ''}
                </div>
            </div>
            <button class="speak-btn" aria-label="Listen">
                🔊
            </button>
        </div>
        `;
    }).join('');
}

// Global actions exposed to window for inline onclicks
window.setCategory = setCategory;

window.setLanguage = (lang) => {
    currentLang = lang;
    if (lang === 'en') {
        btnEn.classList.add('active');
        btnJp.classList.remove('active');
    } else {
        btnEn.classList.remove('active');
        btnJp.classList.add('active');
    }
    renderPhrasesList();
};

// Overlay Logic
let currentOverlayText = '';

window.openOverlay = (index) => {
    const phrase = currentPhrases[index]; 
    const targetText = phrase[currentLang];
    const pronunciation = currentLang === 'en' ? phrase.pr_en : phrase.pr_jp;

    // Set Content
    document.getElementById('overlay-ko').innerText = phrase.ko;
    document.getElementById('overlay-target').innerText = targetText;
    document.getElementById('overlay-pron').innerText = pronunciation || '';

    // Show
    document.getElementById('overlay').classList.add('active');
    
    // Auto Speak once
    currentOverlayText = targetText; 
    speak(currentOverlayText, currentLang);
};

window.closeOverlay = () => {
    document.getElementById('overlay').classList.remove('active');
    window.speechSynthesis.cancel();
};

window.replayAudio = () => {
    if(currentOverlayText) speak(currentOverlayText, currentLang);
};

// TTS
window.speak = (text, lang) => {
    if (!window.speechSynthesis) {
        alert('이 브라우저는 음성 합성을 지원하지 않습니다.');
        return;
    }
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang === 'en' ? 'en-US' : 'ja-JP';
    utterance.rate = 0.9; 
    window.speechSynthesis.speak(utterance);
};

// Service Worker Registration
function registerServiceWorker() {
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('service-worker.js')
                .then(registration => {
                    console.log('ServiceWorker registration successful');
                })
                .catch(err => {
                    console.log('ServiceWorker registration failed: ', err);
                });
        });
    }
}

document.addEventListener('DOMContentLoaded', init);
