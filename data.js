const appData = {
    categories: [
        { id: 'basic', name: '👋 기본/인사', icon: '👋' },
        { id: 'airport', name: '✈️ 공항/기내', icon: '✈️' },
        { id: 'transport', name: '🚆 길찾기/교통', icon: '🚆' },
        { id: 'hotel', name: '🏨 숙소/호텔', icon: '🏨' },
        { id: 'dining', name: '🍽️ 식당/카페', icon: '🍽️' },
        { id: 'shopping', name: '🛍️ 쇼핑/편의점', icon: '🛍️' },
        { id: 'emergency', name: '🚨 비상/약국', icon: '🚨' }
    ],
    phrases: {
        basic: [
            { ko: '안녕하세요 (아침)', en: 'Good morning', pr_en: '굿 모닝', jp: 'おはようございます', pr_jp: '오하요- 고자이마스' },
            { ko: '안녕하세요 (점심)', en: 'Hello', pr_en: '헬로', jp: 'こんにちは', pr_jp: '곤니찌와' },
            { ko: '안녕하세요 (저녁)', en: 'Good evening', pr_en: '굿 이브닝', jp: 'こんばんは', pr_jp: '곤방와' },
            { ko: '감사합니다', en: 'Thank you', pr_en: '땡큐', jp: 'ありがとうございます', pr_jp: '아리가또- 고자이마스' },
            { ko: '천만에요 (아녜요)', en: 'You\'re welcome', pr_en: '유어 웰컴', jp: 'いいえ、いいえ', pr_jp: '이이에, 이이에' },
            { ko: '죄송합니다', en: 'I am sorry', pr_en: '아이 엠 쏘리', jp: 'すみません', pr_jp: '스미마센' },
            { ko: '저기요 / 실례합니다', en: 'Excuse me', pr_en: '익스큐즈 미', jp: 'すみません', pr_jp: '스미마센' },
            { ko: '잠시만요', en: 'Just a moment', pr_en: '저스트 어 모먼트', jp: 'ちょっと待ってください', pr_jp: '춋또 맛떼 쿠다사이' },
            { ko: '일본어 못해요', en: 'I cannot speak Japanese', pr_en: '아이 캔낫 스피크 재패니즈', jp: '日本語できません', pr_jp: '니혼고 데키마센' },
            { ko: '한국어 메뉴 있나요?', en: 'Korean menu?', pr_en: '코리안 메뉴?', jp: '韓国語のメニューありますか', pr_jp: '칸코쿠고노 메뉴- 아리마스까' },
            { ko: '네', en: 'Yes', pr_en: '예스', jp: 'はい', pr_jp: '하이' },
            { ko: '아니요', en: 'No', pr_en: '노', jp: 'いいえ', pr_jp: '이이에' },
            { ko: '괜찮아요 (거절)', en: 'No, thank you', pr_en: '노 땡큐', jp: '大丈夫です', pr_jp: '다이죠-부 데스' },
            { ko: '못 알아들었어요', en: 'I don\'t understand', pr_en: '아이 돈 언더스탠드', jp: 'わかりません', pr_jp: '와카리마센' },
            { ko: '다시 말해주세요', en: 'Once more?', pr_en: '원스 모어?', jp: 'もう一回お願いします', pr_jp: '모- 잇카이 오네가이시마스' },
            { ko: '천천히 말해주세요', en: 'Slowly, please', pr_en: '슬로우리 플리즈', jp: 'ゆっくりお願いします', pr_jp: '윳쿠리 오네가이시마스' },
            { ko: '써주세요', en: 'Write it down', pr_en: '라이트 잇 다운', jp: '書いてください', pr_jp: '카이떼 쿠다사이' },
            { ko: '사진 찍어주세요', en: 'Take a picture?', pr_en: '테이크 어 픽쳐?', jp: '写真撮ってもらえますか', pr_jp: '샤신 톳떼 모라에마스까' },
            { ko: '화장실 어디예요?', en: 'Where is the restroom?', pr_en: '웨어 이즈 더 레스트룸?', jp: 'トイレはどこですか', pr_jp: '토이레와 도코데스까' },
            { ko: '편의점 어디예요?', en: 'Convenience store?', pr_en: '컨비니언스 스토어?', jp: 'コンビニはどこですか', pr_jp: '콤비니와 도코데스까' }
        ],
        airport: [
            { ko: '제 자리 어디예요?', en: 'Where is my seat?', pr_en: '웨어 이즈 마이 시트?', jp: '座席はどこですか', pr_jp: '자세키와 도코데스까' },
            { ko: '물 주세요', en: 'Water, please', pr_en: '워터 플리즈', jp: 'お水ください', pr_jp: '오미즈 쿠다사이' },
            { ko: '입국 신고서 도와주세요', en: 'Help with card', pr_en: '헬프 위드 카드', jp: '書き方教えてください', pr_jp: '카키카타 오시에떼 쿠다사이' },
            { ko: '짐이 안 나왔어요', en: 'No baggage', pr_en: '노 배기지', jp: '荷物が出てきません', pr_jp: '니모츠가 데테키마센' },
            { ko: '환전 어디서 해요?', en: 'Exchange?', pr_en: '익스체인지?', jp: '両替はどこですか', pr_jp: '료-가에와 도코데스까' },
            { ko: '유심 어디서 사요?', en: 'SIM card?', pr_en: '심 카드?', jp: 'SIMカードどこで買えますか', pr_jp: '심카-도 도코데 카에마스까' },
            { ko: '시내 가는 버스 어디예요?', en: 'Bus to city?', pr_en: '버스 투 시티?', jp: '市内行きのバスどこですか', pr_jp: '시나이 이키노 바스 도코데스까' },
            { ko: '택시 어디서 타요?', en: 'Taxi stand?', pr_en: '택시 스탠드?', jp: 'タクシー乗り場どこですか', pr_jp: '타쿠시- 노리바 도코데스까' },
            { ko: '와이파이 되나요?', en: 'Wi-Fi?', pr_en: '와이파이?', jp: 'Wi-Fiありますか', pr_jp: '와이파이 아리마스까' }
        ],
        transport: [
            { ko: '표 파는 곳 어디예요?', en: 'Ticket office?', pr_en: '티켓 오피스?', jp: '切符売り場どこですか', pr_jp: '킷뿌 우리바 도코데스까' },
            { ko: '도쿄역 가나요?', en: 'To Tokyo station?', pr_en: '투 도쿄 스테이션?', jp: '東京駅に行きますか', pr_jp: '토-쿄-에키니 이키마스까' },
            { ko: '이거 타면 되나요?', en: 'Is this right?', pr_en: '이즈 디스 라이트?', jp: 'これに乗ればいいですか', pr_jp: '코레니 노레바 이이데스까' },
            { ko: '얼마예요?', en: 'How much?', pr_en: '하우 머치?', jp: 'いくらですか', pr_jp: '이쿠라데스까' },
            { ko: '노선도 있어요?', en: 'Map?', pr_en: '맵?', jp: '路線図ありますか', pr_jp: '로센즈 아리마스까' },
            { ko: '여기서 내려주세요', en: 'Stop here', pr_en: '스탑 히어', jp: 'ここで降ろしてください', pr_jp: '코코데 오로시떼 쿠다사이' },
            { ko: '충전 어디서 해요?', en: 'Charge?', pr_en: '차지?', jp: 'チャージどこですか', pr_jp: '챠-지 도코데스까' },
            { ko: '출구 어디예요?', en: 'Exit?', pr_en: '엑시트?', jp: '出口はどこですか', pr_jp: '데구치와 도코데스까' },
            { ko: '엘리베이터 어디예요?', en: 'Elevator?', pr_en: '엘리베이터?', jp: 'エレベーターどこですか', pr_jp: '에레베-타- 도코데스까' }
        ],
        hotel: [
            { ko: '체크인 할게요', en: 'Check-in, please', pr_en: '체크인 플리즈', jp: 'チェックインお願いします', pr_jp: '쳇쿠인 오네가이시마스' },
            { ko: '제 이름으로 예약했어요', en: 'Reservation name...', pr_en: '레저베이션 네임...', jp: '予約してます', pr_jp: '요야쿠 시테이마스' },
            { ko: '와이파이 비번이 뭐예요?', en: 'Wi-Fi password?', pr_en: '와이파이 패스워드?', jp: 'Wi-Fiのパスワードは？', pr_jp: '와이파이 파스와-도와?' },
            { ko: '짐 맡겨도 되나요?', en: 'Leave bags?', pr_en: '리브 백스?', jp: '荷物預けられますか', pr_jp: '니모츠 아즈케라레마스까' },
            { ko: '수건 더 주세요', en: 'More towels', pr_en: '모어 타월스', jp: 'タオルください', pr_jp: '타오루 쿠다사이' },
            { ko: '물 안 나와요', en: 'No water', pr_en: '노 워터', jp: 'お湯が出ません', pr_jp: '오유가 데마센' },
            { ko: '방 청소 해주세요', en: 'Clean room', pr_en: '클린 룸', jp: '掃除お願いします', pr_jp: '소-지 오네가이시마스' },
            { ko: '체크아웃 할게요', en: 'Check-out', pr_en: '체크아웃', jp: 'チェックアウトお願いします', pr_jp: '쳇쿠아우토 오네가이시마스' },
            { ko: '택시 불러주세요', en: 'Taxi, please', pr_en: '택시 플리즈', jp: 'タクシー呼んでください', pr_jp: '타쿠시- 욘데 쿠다사이' }
        ],
        dining: [
            { ko: '몇 명이에요 (손가락)', en: 'This many', pr_en: '디스 매니', jp: '〇人です', pr_jp: '...닌 데스 (숫자 손짓)' },
            { ko: '주문할게요', en: 'Order, please', pr_en: '오더 플리즈', jp: '注文お願いします', pr_jp: '츄-몬 오네가이시마스' },
            { ko: '추천해주세요', en: 'Recommendation?', pr_en: '레코멘데이션?', jp: 'おすすめは？', pr_jp: '오스스메와?' },
            { ko: '이거 주세요 (가리키며)', en: 'This one', pr_en: '디스 원', jp: 'これください', pr_jp: '코레 쿠다사이' },
            { ko: '물 주세요', en: 'Water, please', pr_en: '워터 플리즈', jp: 'お水ください', pr_jp: '오미즈 쿠다사이' },
            { ko: '고수 빼주세요', en: 'No cilantro', pr_en: '노 실란트로', jp: 'パクチーぬきで', pr_jp: '파쿠치- 누키데' },
            { ko: '덜 맵게 해주세요', en: 'Less spicy', pr_en: '레스 스파이시', jp: '辛くしないで', pr_jp: '카라쿠 시나이데' },
            { ko: '계산서 주세요', en: 'Check, please', pr_en: '체크 플리즈', jp: 'お会計お願いします', pr_jp: '오카이케이 오네가이시마스' },
            { ko: '카드 돼요?', en: 'Card OK?', pr_en: '카드 오케이?', jp: 'カード使えますか', pr_jp: '카-도 츠카에마스까' },
            { ko: '따로 계산할게요', en: 'Separate checks', pr_en: '세퍼레이트 체크스', jp: '別々でお願いします', pr_jp: '베츠베츠데 오네가이시마스' },
            { ko: '포장 돼요?', en: 'To go?', pr_en: '투 고?', jp: '持ち帰りできますか', pr_jp: '모치카에리 데키마스까' }
        ],
        shopping: [
            { ko: '구경만 할게요', en: 'Just looking', pr_en: '저스트 루킹', jp: '見てるだけです', pr_jp: '미테루 다케데스' },
            { ko: '입어봐도 돼요?', en: 'Try on?', pr_en: '트라이 온?', jp: '試着いいですか', pr_jp: '시챠쿠 이이데스까' },
            { ko: '새거 있어요?', en: 'New one?', pr_en: '뉴 원?', jp: '新しいのありますか', pr_jp: '아타라시이노 아리마스까' },
            { ko: '면세 돼요?', en: 'Tax free?', pr_en: '택스 프리?', jp: '免税できますか', pr_jp: '멘제이 데키마스까' },
            { ko: '할인 돼요?', en: 'Discount?', pr_en: '디스카운트?', jp: '安くなりますか', pr_jp: '야스쿠 나리마스까' },
            { ko: '봉투 주세요', en: 'Bag, please', pr_en: '백 플리즈', jp: '袋ください', pr_jp: '후쿠로 쿠다사이' },
            { ko: '이거 주세요', en: 'This one', pr_en: '디스 원', jp: 'これください', pr_jp: '코레 쿠다사이' },
            { ko: '영수증 주세요', en: 'Receipt', pr_en: '리시트', jp: 'レシートください', pr_jp: '레시-토 쿠다사이' }
        ],
        emergency: [
            { ko: '도와주세요!', en: 'Help!', pr_en: '헬프!', jp: '助けて！', pr_jp: '타스케떼!' },
            { ko: '경찰!', en: 'Police!', pr_en: '폴리스!', jp: '警察！', pr_jp: '케이사츠!' },
            { ko: '구급차!', en: 'Ambulance!', pr_en: '앰뷸런스!', jp: '救急車！', pr_jp: '큐-큐-샤!' },
            { ko: '병원 어디예요?', en: 'Hospital?', pr_en: '호스피탈?', jp: '病院はどこですか', pr_jp: '뵤-인와 도코데스까' },
            { ko: '약국 어디예요?', en: 'Pharmacy?', pr_en: '파머시?', jp: '薬局はどこですか', pr_jp: '약쿄쿠와 도코데스까' },
            { ko: '소화제 있어요?', en: 'Digestion medicine?', pr_en: '다이제스천 메디신?', jp: '胃薬ありますか', pr_jp: '이구스리 아리마스까' },
            { ko: '진통제 있어요?', en: 'Painkiller?', pr_en: '페인 킬러?', jp: '痛み止めありますか', pr_jp: '이타미도메 아리마스까' },
            { ko: '아파요', en: 'It hurts', pr_en: '잇 허츠', jp: '痛いです', pr_jp: '이타이데스' },
            { ko: '잃어버렸어요', en: 'Lost it', pr_en: '로스트 잇', jp: 'なくしました', pr_jp: '나쿠시마시따' },
            { ko: '한국 대사관', en: 'Korean Embassy', pr_en: '코리안 엠버시', jp: '韓国大使館', pr_jp: '칸코쿠 타이시칸' },
            { ko: '한국어 하는 사람?', en: 'Korean speaker?', pr_en: '코리안 스피커?', jp: '韓国語できる人？', pr_jp: '칸코쿠고 데키루 히토?' }
        ]
    }
};
