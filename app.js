// State
let currentLang = 'jp'; // 'en' or 'jp'
let currentCategory = 'basic';
let currentPhrases = [];
let favorites = []; // Array of phrase IDs or objects. Storing phrase objects for simplicity in this no-backend setup.

// DOM Elements
const categoryListEl = document.getElementById('category-list');
const contentAreaEl = document.getElementById('content-area');
const btnEn = document.getElementById('btn-en');
const btnJp = document.getElementById('btn-jp');
const searchInput = document.getElementById('search-input');

// Tab Logic
let currentTab = 'talk'; // 'talk', 'guide', 'calc', 'saved'

window.switchTab = (tab) => {
    currentTab = tab;
    
    // Update Nav UI
    document.querySelectorAll('.nav-item').forEach(btn => btn.classList.remove('active'));
    // Simple way to find index, or assume order
    const navIndex = { 'talk': 0, 'guide': 1, 'calc': 2, 'saved': 3 }[tab];
    document.querySelectorAll('.nav-item')[navIndex].classList.add('active');

    // View Management
    const contentArea = document.getElementById('content-area');
    const calcView = document.getElementById('view-calc');
    const catList = document.getElementById('category-list');
    
    // Reset View State
    document.body.classList.remove('hide-cat-nav');
    contentArea.style.display = 'block';
    calcView.style.display = 'none';

    if (tab === 'talk') {
        // Show Categories, Show Phrases
        // Restore category if it was hijacked by other tabs
        if (currentCategory === 'favorites' || currentCategory === 'guide') {
            currentCategory = 'basic'; // Reset to basic
            renderCategories();
        }
        updatePhrases();
    } else if (tab === 'guide') {
        // Hide Categories (optional, or show specific ones), Show Guide
        document.body.classList.add('hide-cat-nav');
        currentCategory = 'guide'; // Virtual category
        renderGuide();
    } else if (tab === 'calc') {
        // Hide Main Content, Show Calculator
        document.body.classList.add('hide-cat-nav');
        contentArea.style.display = 'none';
        calcView.style.display = 'block';
        renderWallet(); // Dynamic Render
    } else if (tab === 'saved') {
        // Hide Categories (or show Saved only), Show Favorites
        document.body.classList.add('hide-cat-nav');
        currentCategory = 'favorites'; 

        // Render Hotel Card Section First
        const hotelHtml = renderHotelCard();
        const scheduleHtml = renderSchedule();
        
        // Show Favorites
        let allPhrases = [];
        Object.values(appData.phrases).forEach(list => allPhrases.push(...list));
        currentPhrases = allPhrases.filter(p => favorites.includes(p.ko));
        currentPhrases = [...new Map(currentPhrases.map(item => [item['ko'], item])).values()];
        
        // Combine Hotel Card + Schedule + Favorites List
        renderPhrasesList(hotelHtml + scheduleHtml); 
    }
};

// Initial setup tweak
function init() {
    loadFavorites();
    renderCategories(); // Prepare basic cats
    
    // Default Tab
    switchTab('talk');
    
    registerServiceWorker();

    // Search Event
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const keyword = e.target.value.toLowerCase().trim();
            if (keyword) {
                 if(currentTab !== 'talk' && currentTab !== 'saved') switchTab('talk'); // Force switch to talk on search
                searchPhrases(keyword);
            } else {
                switchTab(currentTab);
            }
        });
    }
}

// Wallet (Calculator + Budget) Logic
const EXCHANGE_RATE = 9.2; 

function renderWallet() {
    const viewCalc = document.getElementById('view-calc');
    if (!viewCalc) return;

    // Budget Data
    const totalBudget = parseInt(localStorage.getItem('travel_budget_total') || '0');
    const expenses = JSON.parse(localStorage.getItem('travel_expenses') || '[]');
    
    const totalSpent = expenses.reduce((acc, cur) => acc + parseInt(cur.amount), 0);
    const remaining = totalBudget - totalSpent;
    const percent = totalBudget > 0 ? Math.round((totalSpent / totalBudget) * 100) : 0;
    const barColor = percent > 90 ? '#FF3B30' : (percent > 70 ? '#FF9500' : '#34C759');

    viewCalc.innerHTML = `
    <div class="calc-container">
        <!-- Section 1: Tax Free Calculator -->
        <h3 style="margin-top:0;">🛍️ 면세 계산기</h3>
        <div class="input-group">
            <label>가격 (엔화 ¥)</label>
            <input type="number" id="calc-input" placeholder="0" inputmode="numeric" oninput="calculateTax(this)">
        </div>
        
        <div class="calc-result-box">
            <div class="result-row">
                <span>면세가 (10% OFF)</span>
                <span id="res-taxfree">0 ¥</span>
            </div>
            <div class="result-row highlight">
                <span>한국돈 (약)</span>
                <span id="res-krw">0 원</span>
            </div>
        </div>
        
        <div id="tax-alert" class="tax-alert">
            면세 한도(5,500엔)까지 <br><strong>5,500엔</strong> 남았습니다!
        </div>

        <div class="section-divider"></div>

        <!-- Section 2: Travel Budget -->
        <h3>💴 여행 가계부</h3>
        
        <div class="budget-summary-card">
            <div class="budget-row total">
                <span>총 예산 (¥)</span>
                <input type="number" id="budget-total-input" value="${totalBudget > 0 ? totalBudget : ''}" 
                       placeholder="예산 설정" onchange="saveBudget(this)">
            </div>
            <div class="budget-progress-bg">
                <div class="budget-progress-fill" style="width: ${Math.min(percent, 100)}%; background: ${barColor};"></div>
            </div>
            <div class="budget-row status">
                <span style="color: ${barColor}">지출: ¥${totalSpent.toLocaleString()}</span>
                <span>잔액: ¥${remaining.toLocaleString()}</span>
            </div>
        </div>

        <div class="add-expense-form">
            <div class="input-group row">
                <input type="text" id="exp-item" placeholder="내용 (예: 편의점)" style="width: 55%;">
                <input type="number" id="exp-amount" placeholder="금액 (¥)" inputmode="numeric" style="width: 43%;">
            </div>
            <button class="btn-save-hotel" onclick="addExpense()">지출 추가</button>
        </div>

        <div class="expense-list">
            ${expenses.length === 0 ? '<div class="empty-schedule">지출 내역이 없습니다.</div>' : ''}
            ${expenses.map((ex, idx) => `
                <div class="expense-item">
                    <span class="exp-name">${ex.item}</span>
                    <span class="exp-amount">-¥${parseInt(ex.amount).toLocaleString()}</span>
                    <button class="btn-text-del" onclick="deleteExpense(${idx})">×</button>
                </div>
            `).join('')}
        </div>
    </div>
    `;
}

// Calculator Logic
window.calculateTax = (el) => {
    const val = parseInt(el.value) || 0;
    const krw = Math.round(val * EXCHANGE_RATE);
    document.getElementById('res-krw').innerText = krw.toLocaleString() + ' 원';
    const taxFree = Math.round(val / 1.1);
    document.getElementById('res-taxfree').innerText = taxFree.toLocaleString() + ' ¥';
    
    const alertBox = document.getElementById('tax-alert');
    if (taxFree >= 5000) {
        alertBox.classList.add('success');
        alertBox.innerHTML = '면세 가능합니다! 🎉<br>여권 준비하세요.';
    } else {
        alertBox.classList.remove('success');
        const diff = 5500 - val;
        if (diff > 0) {
             alertBox.innerHTML = `면세 한도(5,500엔)까지 <br><strong>${diff.toLocaleString()}엔</strong> 남았습니다!`;
        } else {
             alertBox.classList.add('success');
             alertBox.innerHTML = '면세 가능합니다! 🎉<br>여권 준비하세요.';
        }
    }
};

// Budget Logic
window.saveBudget = (el) => {
    const val = parseInt(el.value) || 0;
    localStorage.setItem('travel_budget_total', val);
    renderWallet(); // Refresh UI
};

window.addExpense = () => {
    const item = document.getElementById('exp-item').value;
    const amount = document.getElementById('exp-amount').value;
    
    if (!item || !amount) {
        alert('내용과 금액을 입력해주세요.');
        return;
    }

    const expenses = JSON.parse(localStorage.getItem('travel_expenses') || '[]');
    expenses.unshift({ item, amount, date: new Date().toISOString() }); // Newest first
    localStorage.setItem('travel_expenses', JSON.stringify(expenses));
    renderWallet();
};

window.deleteExpense = (index) => {
    const expenses = JSON.parse(localStorage.getItem('travel_expenses') || '[]');
    expenses.splice(index, 1);
    localStorage.setItem('travel_expenses', JSON.stringify(expenses));
    renderWallet();
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

function loadFavorites() {
    try {
        const stored = localStorage.getItem('travel_favorites');
        if (stored) {
            favorites = JSON.parse(stored);
        }
    } catch (e) {
        console.error('Failed to access localStorage or parse favorites', e);
        favorites = [];
    }
}

function saveFavorites() {
    try {
        localStorage.setItem('travel_favorites', JSON.stringify(favorites));
    } catch (e) {
        console.error('Failed to save favorites to localStorage', e);
    }
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
    
    // Filter out Guide/Yatai/Ryokan if we want them ONLY in Guide tab? 
    // Wait, User wanted specific phrases for Yatai/Ryokan. These are "Talk" categories.
    // So Yatai/Ryokan should stay in Talk tab categories.
    // 'Guide' (Map info) should be removed from here.
    
    // Remove 'guide' from category list for Talk tab
    const talkCats = appData.categories.filter(c => c.id !== 'guide');

    const catsHtml = talkCats.map(cat => `
        <li>
            <button 
                class="cat-btn ${cat.id === currentCategory ? 'active' : ''}" 
                onclick="setCategory('${cat.id}')">
                ${cat.icon} ${cat.name}
            </button>
        </li>
    `).join('');

    categoryListEl.innerHTML = catsHtml;
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
    } else if (currentCategory === 'guide') {
        // Handle Guide rendering separately
        renderGuide();
        return;
    } else {
        // Load current category into global state
        currentPhrases = appData.phrases[currentCategory] || [];
    }
    renderPhrasesList();
}

// Guide Filter State
let currentGuideFilter = 'all'; // 'all', 'shopping', 'food', 'cafe', 'sight'

function renderGuide() {
    if (!contentAreaEl) return;
    
    if (!appData.guides) {
        contentAreaEl.innerHTML = '<div class="empty-state">가이드 정보가 없습니다.</div>';
        return;
    }

    // Filter Buttons HTML
    const filters = [
        { id: 'all', label: '전체' },
        { id: 'shopping', label: '🛍️ 쇼핑' },
        { id: 'food', label: '🍽️ 식당' },
        { id: 'cafe', label: '☕ 카페' }, // Includes Dessert
        { id: 'sight', label: '📷 명소' },
        { id: 'transport', label: '🚍 교통' }
    ];

    const filterHtml = `
        <div class="guide-filters">
            ${filters.map(f => `
                <button class="filter-chip ${currentGuideFilter === f.id ? 'active' : ''}" 
                        onclick="setGuideFilter('${f.id}')">
                    ${f.label}
                </button>
            `).join('')}
        </div>
    `;

    // Render Logic
    const listHtml = appData.guides.map(area => {
        // Filter spots in this area
        const filteredSpots = area.spots.filter(spot => {
            if (currentGuideFilter === 'all') return true;
            return spot.type === currentGuideFilter;
        });

        if (filteredSpots.length === 0) return ''; // Hide empty areas

        return `
        <div class="guide-card">
            <div class="guide-area-title">${area.area}</div>
            <div class="spot-list">
                ${filteredSpots.map(spot => `
                    <div class="spot-item">
                        <div class="spot-info">
                            <h4>${spot.name} <span class="spot-type">${getSpotTypeEmoji(spot.type)}</span></h4>
                            <p>${spot.desc}</p>
                        </div>
                        <a href="${spot.map}" target="_blank" class="btn-map">
                            📍 구글맵
                        </a>
                    </div>
                `).join('')}
            </div>
        </div>
        `;
    }).join('');
    
    contentAreaEl.innerHTML = filterHtml + (listHtml || '<div class="empty-state">해당하는 장소가 없습니다.</div>');
}

function setGuideFilter(filter) {
    currentGuideFilter = filter;
    renderGuide();
}

function getSpotTypeEmoji(type) {
    if (type === 'shopping') return '🛍️';
    if (type === 'food') return '🍽️';
    if (type === 'cafe') return '☕';
    if (type === 'sight') return '📷';
    if (type === 'transport') return '🚍';
    return '';
}

// Ensure global access
window.setGuideFilter = setGuideFilter;

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

// Hotel Card Logic
function renderHotelCard() {
    const hotel = JSON.parse(localStorage.getItem('travel_hotel') || 'null');
    
    if (!hotel) {
        return `
        <div class="hotel-card empty">
            <h3>🏠 우리 숙소 등록</h3>
            <p>숙소 정보를 등록해두면 택시나 길 찾기 때 편해요!</p>
            <div class="input-group">
                <input type="text" id="hotel-name" placeholder="숙소 이름 (예: 힐튼 후쿠오카)">
                <input type="text" id="hotel-addr" placeholder="일본어 주소 (구글맵 복사 붙여넣기)">
                <button class="btn-save-hotel" onclick="saveHotelInfo()">저장하기</button>
            </div>
        </div>
        `;
    }

    return `
    <div class="hotel-card saved">
        <div class="hotel-header">
            <h3>🏠 우리 숙소</h3>
            <button class="btn-edit" onclick="deleteHotelInfo()">수정</button>
        </div>
        <div class="hotel-content">
            <div class="hotel-name">${hotel.name}</div>
            <div class="hotel-addr-ko">기사님, 여기로 가주세요 👇</div>
            <div class="hotel-addr-jp">${hotel.addr}</div>
        </div>
        <a href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(hotel.addr)}" 
           target="_blank" class="btn-hotel-map">
            📍 구글지도 켜기
        </a>
    </div>
    <div class="section-divider"></div>
    `;
}

window.saveHotelInfo = () => {
    const name = document.getElementById('hotel-name').value;
    const addr = document.getElementById('hotel-addr').value;
    if (name && addr) {
        localStorage.setItem('travel_hotel', JSON.stringify({ name, addr }));
        switchTab('saved'); // Re-render
    } else {
        alert('이름과 주소를 모두 입력해주세요!');
    }
};

window.deleteHotelInfo = () => {
    if(confirm('숙소 정보를 수정(삭제)하시겠습니까?')) {
        localStorage.removeItem('travel_hotel');
        switchTab('saved');
    }
};


// Schedule Logic
function renderSchedule() {
    const schedule = JSON.parse(localStorage.getItem('travel_schedule') || '[]');
    
    // Add Form
    let html = `
    <div class="schedule-card saved">
        <div class="hotel-header">
            <h3>🗓️ 나의 일정</h3>
        </div>
        <div class="input-group row">
            <input type="text" id="sch-time" placeholder="시간 (10:00)" style="width: 35%;">
            <input type="text" id="sch-place" placeholder="장소 (하카타역)" style="width: 63%;">
        </div>
        <button class="btn-save-hotel" onclick="addSchedule()" style="margin-top: 8px;">일정 추가</button>
        
        <div class="schedule-list">
    `;

    if (schedule.length === 0) {
        html += `<div class="empty-schedule">아직 등록된 일정이 없습니다.</div>`;
    } else {
        html += schedule.map((item, idx) => `
            <div class="schedule-item">
                <div class="sch-info">
                    <span class="sch-time">${item.time}</span>
                    <span class="sch-place">${item.place}</span>
                </div>
                <div class="sch-actions">
                    <a href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(item.place)}" 
                       target="_blank" class="btn-sch-map">📍</a>
                    <button class="btn-sch-del" onclick="deleteSchedule(${idx})">🗑️</button>
                </div>
            </div>
        `).join('');
    }

    html += `
        </div>
    </div>
    <div class="section-divider"></div>
    `;
    
    return html;
}

window.addSchedule = () => {
    const time = document.getElementById('sch-time').value;
    const place = document.getElementById('sch-place').value;
    
    if (!place) {
        alert('장소를 입력해주세요!');
        return;
    }

    const schedule = JSON.parse(localStorage.getItem('travel_schedule') || '[]');
    schedule.push({ time, place });
    localStorage.setItem('travel_schedule', JSON.stringify(schedule));
    switchTab('saved');
};

window.deleteSchedule = (index) => {
    const schedule = JSON.parse(localStorage.getItem('travel_schedule') || '[]');
    schedule.splice(index, 1);
    localStorage.setItem('travel_schedule', JSON.stringify(schedule));
    switchTab('saved');
};

// Hotel Card Logic (Multi-Hotel Support)
function renderHotelCard() {
    let hotels = JSON.parse(localStorage.getItem('travel_hotel') || 'null');
    
    // Migration: Convert old single object to array
    if (hotels && !Array.isArray(hotels)) {
        hotels = [hotels];
        localStorage.setItem('travel_hotel', JSON.stringify(hotels));
    }
    
    if (!hotels) hotels = [];

    let html = `
    <div class="hotel-card saved-section">
        <div class="hotel-header">
            <h3>🏠 숙소 목록 (${hotels.length})</h3>
        </div>
        
        ${hotels.length === 0 ? '<p class="empty-msg">기사님께 보여줄 숙소를 등록하세요.</p>' : ''}

        <div class="hotel-list">
            ${hotels.map((h, idx) => `
            <div class="hotel-item">
                <div class="hotel-info-row">
                    <div class="hotel-name-badge">${h.name}</div>
                    <button class="btn-text-del" onclick="deleteHotelInfo(${idx})">삭제</button>
                </div>
                <div class="hotel-addr-box">
                    <div class="hotel-addr-ko">기사님, 여기로 가주세요 👇</div>
                    <div class="hotel-addr-jp">${h.addr}</div>
                </div>
                <a href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(h.addr)}" 
                   target="_blank" class="btn-hotel-map icon-btn">
                    📍 지도 보기
                </a>
            </div>
            `).join('')}
        </div>

        <div class="add-hotel-form">
            <input type="text" id="hotel-name" placeholder="숙소 이름 (예: 1일차 료칸)">
            <input type="text" id="hotel-addr" placeholder="일본어 주소 붙여넣기">
            <button class="btn-save-hotel" onclick="saveHotelInfo()">+ 숙소 추가하기</button>
        </div>
    </div>
    <div class="section-divider"></div>
    `;

    return html;
}

window.saveHotelInfo = () => {
    const name = document.getElementById('hotel-name').value;
    const addr = document.getElementById('hotel-addr').value;
    
    if (name && addr) {
        let hotels = JSON.parse(localStorage.getItem('travel_hotel') || '[]');
        if (!Array.isArray(hotels)) hotels = [hotels]; // Safety check
        
        hotels.push({ name, addr });
        localStorage.setItem('travel_hotel', JSON.stringify(hotels));
        switchTab('saved'); 
    } else {
        alert('이름과 주소를 모두 입력해주세요!');
    }
};

window.deleteHotelInfo = (index) => {
    if(confirm('이 숙소 정보를 삭제하시겠습니까?')) {
        let hotels = JSON.parse(localStorage.getItem('travel_hotel') || '[]');
        if (Array.isArray(hotels)) {
            hotels.splice(index, 1);
            localStorage.setItem('travel_hotel', JSON.stringify(hotels));
        }
        switchTab('saved');
    }
};
