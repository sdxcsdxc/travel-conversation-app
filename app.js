// State
let currentLang = 'en'; // 'en' or 'jp'
let currentCategory = 'basic';
let currentPhrases = [];
let favorites = []; // Array of phrase IDs or objects. Storing phrase objects for simplicity in this no-backend setup.

// DOM Elements
const categoryListEl = document.getElementById('category-list');
const contentAreaEl = document.getElementById('content-area');
const btnEn = document.getElementById('btn-en');
const btnJp = document.getElementById('btn-jp');
const searchInput = document.getElementById('search-input');

// Initial Setup
function init() {
    loadFavorites();
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

function loadFavorites() {
    const stored = localStorage.getItem('travel_favorites');
    if (stored) {
        try {
            favorites = JSON.parse(stored);
        } catch (e) {
            console.error('Failed to parse favorites', e);
            favorites = [];
        }
    }
}

function saveFavorites() {
    localStorage.setItem('travel_favorites', JSON.stringify(favorites));
}

function toggleFavorite(phraseKo) {
    // Using Korean text as ID since it's unique enough for this simple app
    const index = favorites.indexOf(phraseKo);
    if (index === -1) {
        favorites.push(phraseKo);
    } else {
        favorites.splice(index, 1);
        // If currently viewing favorites, refresh the list to remove the item immediately
        if (currentCategory === 'favorites') {
            updatePhrases();
        }
    }
    saveFavorites();
    
    // Update button visual state if visible
    // We might need to re-render or just toggle class. Re-rendering is safer for sync.
    if (currentCategory !== 'favorites') { // Optimization: don't full re-render if not in fav tab
        renderPhrasesList();
    }
}

function isFavorite(phraseKo) {
    return favorites.includes(phraseKo);
}

// Render Category Navigation
function renderCategories() {
    if (!categoryListEl) return;
    
    // Favorites Tab
    const favHtml = `
        <li>
            <button 
                class="cat-btn fav-cat ${currentCategory === 'favorites' ? 'active' : ''}" 
                onclick="setCategory('favorites')">
                ⭐ 저장됨
            </button>
        </li>
    `;

    const catsHtml = appData.categories.map(cat => `
        <li>
            <button 
                class="cat-btn ${cat.id === currentCategory ? 'active' : ''}" 
                onclick="setCategory('${cat.id}')">
                ${cat.icon} ${cat.name}
            </button>
        </li>
    `).join('');

    categoryListEl.innerHTML = favHtml + catsHtml;
}

function setCategory(categoryId) {
    currentCategory = categoryId;
    if (searchInput) searchInput.value = ''; // Clear search when category clicked
    renderCategories(); // Update visual state
    updatePhrases();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function updatePhrases() {
    if (currentCategory === 'favorites') {
        // Filter all phrases from data to find favorites
        // This is inefficient O(N^2) but fine for small dataset
        let allPhrases = [];
        Object.values(appData.phrases).forEach(list => allPhrases.push(...list));
        
        // Remove duplicates if any (though Object.values shouldn't have overlapping arrays usually)
        currentPhrases = allPhrases.filter(p => favorites.includes(p.ko));
        
        // Deduplicate based on KO text in case
        currentPhrases = [...new Map(currentPhrases.map(item => [item['ko'], item])).values()];
    } else {
        // Load current category into global state
        currentPhrases = appData.phrases[currentCategory] || [];
    }
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
        if (currentCategory === 'favorites') {
            contentAreaEl.innerHTML = '<div class="empty-state">아직 저장된 문장이 없습니다.<br>원하는 문장의 별(☆)을 눌러 담아보세요.</div>';
        } else {
            contentAreaEl.innerHTML = '<div class="empty-state">검색 결과가 없습니다.</div>';
        }
        return;
    }

    contentAreaEl.innerHTML = currentPhrases.map((phrase, index) => {
        const targetText = phrase[currentLang];
        const pronunciation = currentLang === 'en' ? phrase.pr_en : phrase.pr_jp;
        const isFav = isFavorite(phrase.ko);

        return `
        <div class="phrase-card" onclick="openOverlay(${index})">
            <div class="phrase-content">
                <div class="phrase-ko">${phrase.ko}</div>
                ${pronunciation ? `<div class="phrase-pronunciation">${pronunciation}</div>` : ''}
                <div class="phrase-target">${targetText}</div>
            </div>
            
            <div class="card-actions">
                <button class="fav-btn ${isFav ? 'active' : ''}" 
                        onclick="event.stopPropagation(); toggleFavorite('${phrase.ko}')">
                    ${isFav ? '★' : '☆'}
                </button>
                <button class="speak-btn" 
                        onclick="event.stopPropagation(); speak('${targetText.replace(/'/g, "\\'")}', '${currentLang}')" 
                        aria-label="Listen">
                    🔊
                </button>
            </div>
        </div>
        `;
    }).join('');
}

// Global actions exposed to window for inline onclicks
window.setCategory = setCategory;
window.toggleFavorite = toggleFavorite;

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
    if (!phrase) return; // Guard clause

    const targetText = phrase[currentLang];
    const pronunciation = currentLang === 'en' ? phrase.pr_en : phrase.pr_jp;

    // Set Content
    document.getElementById('overlay-ko').innerText = phrase.ko;
    document.getElementById('overlay-pron').innerText = pronunciation || '';
    document.getElementById('overlay-target').innerText = targetText;

    // Show
    document.getElementById('overlay').classList.add('active');
    
    currentOverlayText = targetText; 
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
