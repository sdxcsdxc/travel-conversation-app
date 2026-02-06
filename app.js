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

// Global Wallet State
let walletFilter = 'all'; // 'all' or 'today'
let selectedCategory = 'food'; // default cat

function renderWallet() {
    const viewCalc = document.getElementById('view-calc');
    if (!viewCalc) return;

    // Budget Data
    const totalBudget = parseInt(localStorage.getItem('travel_budget_total') || '0');
    let expenses = JSON.parse(localStorage.getItem('travel_expenses') || '[]');
    
    // Filter Logic
    const todayStr = new Date().toISOString().slice(0, 10);
    const todayExpenses = expenses.filter(e => e.date.slice(0, 10) === todayStr);
    
    // Display Logic based on filter
    const displayExpenses = walletFilter === 'today' ? todayExpenses : expenses;
    
    // Calculations
    const totalSpent = expenses.reduce((acc, cur) => acc + parseInt(cur.amount), 0);
    const todaySpent = todayExpenses.reduce((acc, cur) => acc + parseInt(cur.amount), 0);
    const remaining = totalBudget - totalSpent;
    const percent = totalBudget > 0 ? Math.round((totalSpent / totalBudget) * 100) : 0;
    const barColor = percent > 90 ? '#FF3B30' : (percent > 70 ? '#FF9500' : '#34C759');

    // UI HTML
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

        <!-- Section 2: Input Generator -->
        <h3>🔢 만능 숫자 말하기</h3>
        <p class="tool-desc">숫자만 입력하면 일본어로 말해줘요!</p>
        
        <div class="gen-tabs">
            <button class="gen-tab active" onclick="setGenMode('people', this)">3명 👨‍👩‍👧</button>
            <button class="gen-tab" onclick="setGenMode('time', this)">7시 ⏰</button>
            <button class="gen-tab" onclick="setGenMode('price', this)">얼마 💴</button>
            <button class="gen-tab" onclick="setGenMode('count', this)">2개 🍺</button>
        </div>

        <div class="input-group gen-input-box">
            <input type="number" id="num-gen-input" placeholder="인원 수 (숫자)" inputmode="decimal">
            <button class="btn-save-hotel" onclick="generateNumPhrase(currentGenMode)">변환</button>
        </div>
        <div id="num-gen-result"></div>

        <div class="section-divider"></div>

        <!-- Section 3: Budget V2 -->
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
            <div class="budget-row today-sum">
                <span>📅 오늘 쓴 돈:</span>
                <span>¥${todaySpent.toLocaleString()}</span>
            </div>
        </div>

        <div class="add-expense-form">
            <div class="cat-chips">
                <button class="cat-chip ${selectedCategory === 'food' ? 'active' : ''}" onclick="setExpCat('food')">🍽️ 식비</button>
                <button class="cat-chip ${selectedCategory === 'trans' ? 'active' : ''}" onclick="setExpCat('trans')">🚌 교통</button>
                <button class="cat-chip ${selectedCategory === 'shop' ? 'active' : ''}" onclick="setExpCat('shop')">🛍️ 쇼핑</button>
                <button class="cat-chip ${selectedCategory === 'stay' ? 'active' : ''}" onclick="setExpCat('stay')">🏠 숙소</button>
                <button class="cat-chip ${selectedCategory === 'etc' ? 'active' : ''}" onclick="setExpCat('etc')">🎸 기타</button>
            </div>
            <div class="input-group row">
                <input type="text" id="exp-item" placeholder="내용 (편의점 등)" style="width: 55%;">
                <input type="number" id="exp-amount" placeholder="금액 (¥)" inputmode="numeric" style="width: 43%;">
            </div>
            <button class="btn-save-hotel" onclick="addExpense()">+ 지출 등록</button>
        </div>

        <div class="expense-header">
            <h4>지출 내역</h4>
            <div class="toggle-group">
                <button class="btn-toggle ${walletFilter === 'all' ? 'active' : ''}" onclick="setWalletFilter('all')">전체</button>
                <button class="btn-toggle ${walletFilter === 'today' ? 'active' : ''}" onclick="setWalletFilter('today')">오늘</button>
            </div>
        </div>

        <div class="expense-list">
            ${displayExpenses.length === 0 ? '<div class="empty-schedule">내역이 없습니다.</div>' : ''}
            ${displayExpenses.map((ex, idx) => {
                // Find original index if filtered
                const originalIdx = expenses.indexOf(ex); 
                return `
                <div class="expense-item">
                    <div class="exp-icon">${getCatIcon(ex.category)}</div>
                    <div class="exp-info">
                        <div class="exp-name">${ex.item}</div>
                        <div class="exp-date">${ex.date.slice(5, 10)} ${ex.date.slice(11, 16)}</div>
                    </div>
                    <div class="exp-amount-box">
                        <div class="exp-yen">-¥${parseInt(ex.amount).toLocaleString()}</div>
                        <div class="exp-krw">약 ${Math.round(ex.amount * EXCHANGE_RATE).toLocaleString()}원</div>
                    </div>
                    <button class="btn-text-del" onclick="deleteExpense(${originalIdx})">×</button>
                </div>
                `;
            }).join('')}
        </div>
    </div>
    `;
}

window.setExpCat = (cat) => {
    selectedCategory = cat;
    renderWallet();
};

window.setWalletFilter = (filter) => {
    walletFilter = filter;
    renderWallet();
};

function getCatIcon(cat) {
    if(cat === 'food') return '🍽️';
    if(cat === 'trans') return '🚌';
    if(cat === 'shop') return '🛍️';
    if(cat === 'stay') return '🏠';
    return '🎸';
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
    // Add Category
    expenses.unshift({ 
        item, 
        amount, 
        category: selectedCategory, 
        date: new Date().toISOString() 
    }); 
    localStorage.setItem('travel_expenses', JSON.stringify(expenses));
    renderWallet();
};

window.deleteExpense = (index) => {
    const expenses = JSON.parse(localStorage.getItem('travel_expenses') || '[]');
    expenses.splice(index, 1);
    localStorage.setItem('travel_expenses', JSON.stringify(expenses));
    renderWallet();
};

// --- Japanese Number Logic ---
const JP_NUMS = {
    0: { k: '영', p: '제로' },
    1: { k: '일', p: '이치' },
    2: { k: '이', p: '니' },
    3: { k: '삼', p: '산' },
    4: { k: '사', p: '욘' },
    5: { k: '오', p: '고' },
    6: { k: '육', p: '로쿠' },
    7: { k: '칠', p: '나나' },
    8: { k: '팔', p: '하치' },
    9: { k: '구', p: '큐' },
    10: { k: '십', p: '쥬' },
    100: { k: '백', p: '햐쿠' },
    1000: { k: '천', p: '센' },
    10000: { k: '만', p: '만' }
};

function getJpNumber(num) {
    if (num <= 10) return JP_NUMS[num].p;
    if (num < 100) {
        const ten = Math.floor(num / 10);
        const one = num % 10;
        let str = (ten > 1 ? JP_NUMS[ten].p : '') + '쥬';
        if (one > 0) str += JP_NUMS[one].p;
        return str;
    }
    if (num < 1000) {
        const hun = Math.floor(num / 100);
        const rem = num % 100;
        let str = (hun > 1 ? JP_NUMS[hun].p : '') + '햐쿠';
        if (hun === 3) str = '산뱌쿠'; 
        if (hun === 6) str = '롯뱌쿠';
        if (hun === 8) str = '핫뱌쿠';
        if (rem > 0) str += getJpNumber(rem);
        return str;
    }
    if (num < 10000) {
        const thou = Math.floor(num / 1000);
        const rem = num % 1000;
        let str = (thou > 1 ? JP_NUMS[thou].p : '') + '센';
        if (thou === 3) str = '산젠';
        if (thou === 8) str = '핫센';
        if (rem > 0) str += getJpNumber(rem);
        return str;
    }
    if (num < 100000000) { // Up to 100 million
        const man = Math.floor(num / 10000);
        const rem = num % 10000;
        let str = getJpNumber(man) + '만';
        if (rem > 0) str += getJpNumber(rem);
        return str;
    }
    return num; // Too big fallback
}

window.generateNumPhrase = (type) => {
    const input = document.getElementById('num-gen-input').value;
    if (!input) return;
    
    let result = { ko: '', jp: '', pr: '' };
    const num = parseInt(input.replace(/[^0-9]/g, ''));

    if (type === 'people') {
        result.ko = `${num}명입니다.`;
        result.jp = `${num}名です。`;
        // Human counter exceptions
        if (num === 1) result.pr = '히토리 데스';
        else if (num === 2) result.pr = '후타리 데스';
        else result.pr = getJpNumber(num) + '닌 데스';
    } else if (type === 'time') {
        const [h, m] = input.split(':').map(Number);
        if (!h && h !== 0) return;
        
        result.ko = `${h}시${m?' '+m+'분':''}에 예약했습니다.`;
        result.jp = `${h}時${m?m+'分':''}に予約しました。`;
        
        // Hour exceptions
        let hourPr = getJpNumber(h);
        if (h === 4) hourPr = '요';
        if (h === 7) hourPr = '시치';
        if (h === 9) hourPr = '쿠';
        hourPr += '지';
        
        let minPr = '';
        if (m) {
             minPr = getJpNumber(m) + '훈';
             if ([1,3,4,6,8,10].includes(m%10)) minPr = minPr.replace('훈', '분'); // Simplification
             // Detailed minute handling is complex, defaulting simple for now
        }
        
        result.pr = `${hourPr} ${minPr}니 요야쿠 시마시타`;
    } else if (type === 'price') {
        result.ko = `${num.toLocaleString()}엔입니다.`;
        result.jp = `${num.toLocaleString()}円です。`;
        result.pr = getJpNumber(num) + '엔 데스';
    } else if (type === 'count') {
        result.ko = `${num}개 주세요.`;
        result.jp = `${num}つください。`;
        // Generic counter ~tsu exceptions
        const tsu = ['히토츠','후타츠','밋츠','욧츠','이츠츠','뭇츠','나나츠','얏츠','코코노츠','토오'];
        if (num <= 10) result.pr = tsu[num-1] + ' 쿠다사이';
        else result.pr = getJpNumber(num) + '코 쿠다사이'; // fallback to 'ko'
    }

    // Render Result
    const resBox = document.getElementById('num-gen-result');
    resBox.innerHTML = `
        <div class="phrase-card highlight">
            <div class="phrase-content">
                <div class="phrase-ko">${result.ko}</div>
                <div class="phrase-pronunciation">${result.pr}</div>
                <div class="phrase-target">${result.jp}</div>
            </div>
            <button class="speak-btn main-action" onclick="speak('${result.jp}', 'jp')">🔊 말하기</button>
        </div>
    `;
};
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
            <!-- Checklist Buttons -->
            <div class="checklist-btns">
                <button class="btn-check-guide" onclick="openChecklist('onsen')">♨️ 온천 매너</button>
                <button class="btn-check-guide" onclick="openChecklist('ryokan')">👘 료칸 체크</button>
                <button class="btn-check-guide" onclick="openChecklist('yatai')">🍜 야타이 팁</button>
            </div>
            
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

// --- Checklist Logic (New) ---
const CHECKLIST_DATA = {
    'onsen': {
        title: '♨️ 온천/목욕탕 매너',
        items: [
            '탕에 들어가기 전 샤워하셨나요?',
            '수건을 탕 안에 넣지 마세요 (머리 위에)',
            '머리카락이 탕에 닿지 않게 묶으셨나요?',
            '탈의실 가기 전 물기를 닦으셨나요?',
            '문신이 있다면 미리 확인하셨나요?'
        ]
    },
    'ryokan': {
        title: '👘 료칸/숙소 체크',
        items: [
            '체크인 시간(보통 15~18시) 지키셨나요?',
            '유카타 왼쪽 옷깃이 위로 가게 입으셨나요?',
            '저녁 식사(가이세키) 시간 늦지 않기',
            '현관에서 신발은 돌려서 정리하기',
            '송영 버스 예약 시간 확인하기'
        ]
    },
    'yatai': {
        title: '🍜 야타이(포장마차) 팁',
        items: [
            '화장실은 미리 다녀오셨나요? (근처 없음)',
            '현금(특히 1000엔권) 준비하셨나요?',
            '1인 1메뉴 주문은 필수입니다',
            '큰 짐은 호텔에 두고 오셨나요?',
            '너무 오래 자리 차지하지 않기 (회전율)'
        ]
    }
};

window.openChecklist = (type) => {
    const data = CHECKLIST_DATA[type];
    if (!data) return;

    const savedChecks = JSON.parse(localStorage.getItem('travel_checklist') || '{}');
    const checkedList = savedChecks[type] || [];

    const listHtml = data.items.map((item, idx) => {
        const isChecked = checkedList.includes(idx);
        return `
        <div class="check-item ${isChecked ? 'checked' : ''}" onclick="toggleCheck('${type}', ${idx}, this)">
            <span class="check-box">${isChecked ? '✅' : '⬜'}</span>
            <span class="check-text">${item}</span>
        </div>
        `;
    }).join('');

    const html = `
    <div class="checklist-modal">
        <div class="checklist-header">
            <h3>${data.title}</h3>
            <button class="btn-close-check" onclick="closeChecklist()">✕</button>
        </div>
        <div class="checklist-body">
            ${listHtml}
        </div>
    </div>
    <div class="checklist-overlay" onclick="closeChecklist()"></div>
    `;

    // Append to body
    const div = document.createElement('div');
    div.id = 'checklist-container';
    div.innerHTML = html;
    document.body.appendChild(div);
};

window.closeChecklist = () => {
    const el = document.getElementById('checklist-container');
    if (el) el.remove();
};

window.toggleCheck = (type, idx, el) => {
    const savedChecks = JSON.parse(localStorage.getItem('travel_checklist') || '{}');
    if (!savedChecks[type]) savedChecks[type] = [];

    const arr = savedChecks[type];
    const pos = arr.indexOf(idx);

    if (pos === -1) {
        arr.push(idx); // Add
        el.classList.add('checked');
        el.querySelector('.check-box').innerText = '✅';
    } else {
        arr.splice(pos, 1); // Remove
        el.classList.remove('checked');
        el.querySelector('.check-box').innerText = '⬜';
    }

    localStorage.setItem('travel_checklist', JSON.stringify(savedChecks));
};

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



// Schedule Logic (Logistics Enhanced)
function renderSchedule() {
    const schedule = JSON.parse(localStorage.getItem('travel_schedule') || '[]');
    
    // Sort by time
    schedule.sort((a, b) => a.time.localeCompare(b.time));

    // Input Form
    let html = `
    <div class="schedule-card saved">
        <div class="hotel-header">
            <h3>🗓️ 나의 일정 & 이동</h3>
        </div>
        <div class="input-group row" style="margin-bottom:8px;">
            <input type="time" id="sch-time" style="width: 30%;">
            <input type="text" id="sch-place" placeholder="장소 (예: 텐진역)" style="width: 68%;">
        </div>
        <div class="input-group row">
             <select id="sch-trans" style="width: 40%;">
                <option value="">이동수단</option>
                <option value="walk">🚶 도보</option>
                <option value="bus">🚌 버스</option>
                <option value="subway">🚇 지하철</option>
                <option value="taxi">🚕 택시</option>
            </select>
            <input type="number" id="sch-dur" placeholder="소요(분)" style="width: 25%;">
            <button class="btn-save-hotel" onclick="addSchedule()" style="width: 30%; margin-top:0;">추가</button>
        </div>
        
        <div class="schedule-list">
    `;

    if (schedule.length === 0) {
        html += `<div class="empty-schedule">여행 일정을 등록해보세요!</div>`;
    } else {
        html += schedule.map((item, idx) => {
            // Logic Check: Previous item
            let conflictMsg = '';
            if (idx > 0) {
                const prev = schedule[idx-1];
                const prevTime = new Date(`2000-01-01T${prev.time}`);
                const curTime = new Date(`2000-01-01T${item.time}`);
                
                // Simple check: If current time < prev time (sorted, so unlikely unless input error)
                // If prev item has duration, check arrival time
                if (prev.duration) {
                    const arrivalTime = new Date(prevTime.getTime() + prev.duration * 60000);
                    const diff = (curTime - arrivalTime) / 60000; // minutes
                    
                    if (diff < 0) {
                        conflictMsg = `<div class="sch-alert">⚠️ 시간 부족! (${Math.abs(diff)}분 겹침)</div>`;
                    } else if (diff < 15) {
                        conflictMsg = `<div class="sch-warn">⚡ 빠듯함 (${diff}분 여유)</div>`;
                    }
                }
            }

            return `
            <div class="schedule-item">
                <div class="sch-time-row">
                    <span class="sch-time-badge">${item.time}</span>
                    ${item.trans ? `<span class="sch-trans-badge">${getTransIcon(item.trans)} ${item.duration}분</span>` : ''}
                </div>
                <div class="sch-place-name">${item.place}</div>
                ${conflictMsg}
                
                <!-- Smart Actions -->
                <div class="quick-actions">
                    <button class="btn-action-chip" onclick="smartAction('taxi', '${item.place}')">🚕 택시</button>
                    <button class="btn-action-chip" onclick="smartAction('ask', '${item.place}')">🚌 길묻기</button>
                    <button class="btn-action-chip" onclick="smartAction('reserve', '${item.time}')">⏰ 예약확인</button>
                </div>

                <div class="sch-actions" style="margin-top:8px; border-top:1px dashed #eee; padding-top:4px;">
                    <a href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(item.place)}" 
                       target="_blank" class="btn-sch-map" style="font-size:0.8rem; text-decoration:none;">📍 지도 보기</a>
                    <button class="btn-text-del" onclick="deleteSchedule(${idx})">삭제</button>
                </div>
            </div>
        `;
        }).join('');
    }

    html += `
        </div>
    </div>
    <div class="section-divider"></div>
    `;
    
    return html;
}

window.smartAction = (type, val) => {
    let ko, jp, pr;
    if (type === 'taxi') {
        ko = '기사님, 여기로 가주세요.';
        jp = 'すみません、ここまで行ってください。';
        pr = '스미마센, 코코마데 잇테 쿠다사이';
        // Open Google Maps search for visual confirmation
        window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(val)}`, '_blank');
    } else if (type === 'ask') {
        ko = '죄송한데, 여기(사진/지도)는 어떻게 가나요?';
        jp = 'すみません、ここへはどう行けばいいですか？';
        pr = '스미마센, 코코에와 도- 이케바 이이데스카?';
    } else if (type === 'reserve') {
        ko = `${val}에 예약했습니다.`;
        jp = `${val}に予約しました。`;
        pr = `${val}니 요야쿠 시마시타`;
    }

    // Show Overlay
    if (document.getElementById('overlay-ko')) {
        document.getElementById('overlay-ko').innerText = ko;
        document.getElementById('overlay-pron').innerText = pr;
        document.getElementById('overlay-target').innerText = jp;
        document.getElementById('overlay').classList.add('active');
    }
    currentOverlayText = jp;
    
    // Auto speak
    speak(jp, 'jp');
};

function getTransIcon(t) {
    if(t === 'walk') return '🚶';
    if(t === 'bus') return '🚌';
    if(t === 'subway') return '🚇';
    if(t === 'taxi') return '🚕';
    return '🚀';
}

window.addSchedule = () => {
    const time = document.getElementById('sch-time').value;
    const place = document.getElementById('sch-place').value;
    const trans = document.getElementById('sch-trans').value;
    const duration = parseInt(document.getElementById('sch-dur').value) || 0;
    
    if (!time || !place) {
        alert('시간과 장소를 입력해주세요!');
        return;
    }

    const schedule = JSON.parse(localStorage.getItem('travel_schedule') || '[]');
    schedule.push({ time, place, trans, duration });
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

// Render Phrases List
function renderPhrasesList(prependHtml = '') {
    if (!contentAreaEl) return;

    if (currentCategory === 'guide') return; 

    let html = prependHtml; // Start with prepended HTML (Hotel Card)

    if (!currentPhrases || currentPhrases.length === 0) {
        if (currentCategory === 'favorites') {
            html += '<div class="empty-state">아직 저장된 문장이 없습니다.<br>원하는 문장의 별(☆)을 눌러 담아보세요.</div>';
        } else if (!prependHtml) {
             html += '<div class="empty-state">검색 결과가 없습니다.</div>';
        }
        contentAreaEl.innerHTML = html;
        return;
    }

    html += currentPhrases.map((phrase, index) => {
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

    contentAreaEl.innerHTML = html;
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
    
    // Refresh list, keeping Hotel Card if in Saved tab
    if (currentTab === 'saved') {
         // Re-run switchTab logic properly or just re-render list with hotel card?
         // Easiest is to call switchTab('saved') to fully re-render
         switchTab('saved');
    } else {
        renderPhrasesList();
    }
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

